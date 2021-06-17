import Head from 'next/head'
import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { IProduto } from '../../typing/Interfaces/IProduto'
import {Wrapper, InfoContainer, DescricaoContainer, ContainerPreco, Tag} from '../../styles/PageStyles/produto.style'
import Link from 'next/link'
import marked from 'marked'
import Router from 'next/router'
import {connect} from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions';
import Botao from '../../Components/BotaoComprar/BotaoComprar'
import { Carousel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetFactory } from '../../Factory/http/GetFactory'
import { ICategoria } from '../../typing/Interfaces/ICategoria'
import { useRouter } from 'next/router'
import * as GTM from '../../Util/GTM'


interface IProdutoPage{
  produto: IProduto 
  dispatch: any
  categorias: Array<ICategoria>
}

const ProdutoPage: React.FC<IProdutoPage> = ({ produto, dispatch, categorias }) => {
  const Navigator = useRouter()

  const addProduto = (produto: IProduto  ) => {
    dispatch(CartActions.AdicionarAoCarrinho(produto));
    toast.dark('Produto Adicionado!', {
      position: toast.POSITION.BOTTOM_CENTER 
    })
    GTM.event({
      'event': 'addToCart',
      'eventCategory':'enhanced-ecommerce',
      'eventAction': 'add',
      'productName': produto.Nome.toLowerCase()
    })
  }

  const handleComprar = (produto: IProduto) =>{
    dispatch(CartActions.AdicionarAoCarrinho(produto));
    Navigator.push('/carrinho')
  }


 return(
   <Layout categorias={categorias}>
     <ToastContainer
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
     />
      <Head>
       <title>Libido LoveShop- {produto && produto.Nome}</title>
       <meta name="description" content={`${produto && produto.descricao}`} />
       <meta name="keywords" content={`${produto && produto.Nome}`}></meta>
     </Head>

     {produto && <Wrapper className="Container">
        <p>
          <Link href='/' >
            <a>Home</a>
          </Link>
          {' / '}
          {produto.categorias && produto.categorias.map(categoria => {
            return (
              <>
                <Link href={`/categoria/${categoria._id}?categoria=${categoria.Nome}`} key={categoria._id}>
                  <a >{categoria.Nome} </a>
                </Link>
                {' / '}
              </>
            )
          })}
          <a style={{fontWeight: 'bold', cursor: 'default'}}>{produto.Nome}</a>
         </p>
         
          
        <InfoContainer  >
         <div className="imageContainer">
          <Carousel
            controls={true}
            touch={true}
            indicators={true}
            fade={false}
            slide={true}
          >
            {produto.imagens ? produto.imagens.map(imagem => {
              return <Carousel.Item key={imagem._id}>
                <img src={imagem.url} alt={produto.Nome}/>
              </Carousel.Item>
            }): null}
          </Carousel>
          
         </div>
         <div className="info">
          {produto.pronta && <Tag>Pronta Entrega</Tag>}  
           <div className="topInfo">
            <h1>{(produto.Nome)}</h1>
            <div className="descricao">
                <p>
                  {produto.descricao}
                </p>
            </div>
           </div>
          
           <ContainerPreco>
            <div className="preco">
              <b>Por:</b>
              <h2>{Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(produto.preco )}
              </h2>
            </div>
            <div className="BotoesContainer">
              <Botao Produto={produto} Click={addProduto} Style={{width: '100%'}}>Adicionar ao Carrinho</Botao>
              <Botao Produto={produto} Click={handleComprar} Style={{width: '100%'}}>Comprar</Botao>
            </div>
            
          </ContainerPreco>  
         </div> 
       </InfoContainer>
       {
         produto.especificacao && 
         <DescricaoContainer>
            <h2>Descrição</h2>
             <div dangerouslySetInnerHTML={{ __html: marked(produto.especificacao) }}>
             </div>
          </DescricaoContainer>
        }
     </Wrapper>}
    </Layout>
 )
}

export default connect()(ProdutoPage)

export async function getStaticPaths() {
  const api = GetFactory()

  const response = await api.handle({
    url: `${process.env.APIURL}/produtos`,
    body: null
  })

  const params: { params: { id: string } }[] = []
  response.body.forEach((element:IProduto) => {
    params.push({
      params: {
        id: element._id,
      },
    });
  });
  return {
    paths: params,
    fallback: true,
  };
}


export async function getStaticProps({ params }: any) {
  const api = GetFactory()
  const responseProdutos = await api.handle({
    url: `${process.env.APIURL}/produtos/${params.id}`,
    body: null
  })
  const responseCategorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })
  const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      produto: responseProdutos.body,
      categorias: responseCategorias.body
    },
  }
}
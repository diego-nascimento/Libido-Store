import Head from 'next/head'
import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { IProduto } from '../../Interfaces/IProduto'
import { api } from '../../service/api'
import {Wrapper, InfoContainer, DescricaoContainer} from '../../PageStyles/produto.style'
import Link from 'next/link'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { MdExpandMore, MdArrowBack } from 'react-icons/md'
import { styles } from '../../styles/styles'
import marked from 'marked'
import Router from 'next/router'
import {connect} from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions';
import Botao from '../../Components/BotaoComprar/BotaoComprar'
import { Carousel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProdutoCategoria from '../categoria/[id]'


interface IProdutoPage{
  produto: IProduto 
  dispatch: any
}

const ProdutoPage: React.FC<IProdutoPage> = ({ produto, dispatch }) => {

  const addProduto = (produto: IProduto  ) => {
    dispatch(CartActions.AdicionarAoCarrinho(produto));
    toast.dark('Produto Adicionado!', {
      position: toast.POSITION.BOTTOM_CENTER 
    })
  }

 return(
   <Layout>
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
       <meta name="description" content={produto.descricao} />
       <meta name="keywords" content={`${produto.Nome}, ${produto.categorias[0].Nome}`}></meta>
     </Head>
     {produto && <Wrapper className="Container">
       <div className="voltar" onClick={() => { Router.back() }}>
         <MdArrowBack />
         <p>Voltar</p>
       </div>
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
         
           <h1>{(produto.Nome).toLowerCase()}</h1>
           <p style={{fontSize: '.6rem'}}>
            {/*<span>(Cod Item: jasidjisaio) - </span> */}
            Outros Produtos: {produto.categorias && produto.categorias.map(categoria => {
             return (
               <Link href={`/categoria/${categoria._id}`} key={categoria._id}>
                <a style={{fontSize: '.6rem'}}>{categoria.Nome} </a>
               </Link>
             )
            })}
           </p>
           <div className="preco">
              <h2>Por {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(produto.preco)}</h2>
           </div>
            <div className="descricao">
              <p>
                {produto.descricao}
              </p>
           </div>
           {produto.pronta && <h2 style={{marginTop: '20px', fontSize: '1.1rem'}}>Pronta Entrega</h2>}
           <Botao Produto={produto} Click={addProduto} Style={{marginTop: '40px', fontSize: '1.1rem'}}>Comprar</Botao>
           
         </div> 
       </InfoContainer>
       {
         produto.especificacao && <DescricaoContainer>
         <Accordion
           style={{
             background: 'transparent',
             border: `1px solid ${styles.dest2Components}`,
           }} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary expandIcon={<MdExpandMore />} >
            <h2>Descrição</h2>
          </AccordionSummary>
           <AccordionDetails >
             <div dangerouslySetInnerHTML={{ __html: marked(produto.especificacao) }}>

             </div>
          </AccordionDetails>
      </Accordion> 
       </DescricaoContainer>
       }
     </Wrapper>}
    </Layout>
 )
}

export default connect()(ProdutoPage)

export async function getStaticPaths() {
  const response = await api.get('/produtos')

  const params: { params: { id: string } }[] = []
  response.data.forEach((element:IProduto) => {
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
  const responseProdutos = await api.get(`/produtos/${params.id}`)
  const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      produto: responseProdutos.data
    },
  }
}
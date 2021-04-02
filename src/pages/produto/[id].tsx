import Head from 'next/head'
import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { IProduto } from '../../Interfaces/IProduto'
import { api } from '../../service/api'
import {Wrapper, InfoContainer, DescricaoContainer} from '../../PageStyles/produto.style'
import Link from 'next/link'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md'
import { styles } from '../../styles/styles'
import marked from 'marked'


interface IProdutoPage{
  produto: IProduto 
}

const ProdutoPage: React.FC<IProdutoPage> = ({ produto }) => {

 return(
     <Layout>
      <Head>
        <title>Libido Store - {produto && produto.Nome}</title>
     </Head>
     {produto && <Wrapper className="Container">
        <InfoContainer  >
         <div className="imageContainer">
           <img src={produto.imagem.url} alt={produto.Nome}/>
         </div>
         <div className="info">
         {produto.pronta && <h2>Pronta Entrega</h2>}
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

export default ProdutoPage

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
    revalidate: revalidateTime ? parseInt(revalidateTime): 0
  }
}
import React from 'react'
import { IProduto } from '../../typing/Interfaces/IProduto'
import { Card, ImagemContainer, Tag, Precos } from './ProdutoItem.style'
import { Carousel } from 'react-bootstrap'
import VisibilitySensor from 'react-visibility-sensor'

interface IProdutoItem{
  produto: IProduto
  width?: string
}

const ProdutoItem: React.FC<IProdutoItem> = ({ produto, width }:IProdutoItem) => {
  const [visible, setVisible] = React.useState(false)
  const [Loaded, setLoaded] = React.useState(false)

  return (
    <>
      <VisibilitySensor
        onChange={(isVisible) => {
          setVisible(isVisible)
        }}
        partialVisibility={true}
        minTopValue={100}
      >
        <Card Visible={visible} Loaded={Loaded} width={width || ''}>
          <div className="TagContainer">
            {produto.pronta
              ? <Tag>
                Pronta Entrega
              </Tag>
              : null
            }
          </div>
          <ImagemContainer>
            <Carousel
              controls={false}
              touch={true}
              indicators={false}
              fade={true}
              slide={true}
            >
              {produto.imagens
                ? produto.imagens.map(imagem => {
                  return (
                    <Carousel.Item key={imagem._id}
                      interval={Math.floor(Math.random() * (2500 - 1800 + 1)) + 1800}
                    >
                      <img src={imagem.url} alt={produto.Nome} onLoad={() => setLoaded(true)}/>
                    </Carousel.Item>
                  )
                })
                : <Carousel.Item key={'1'} >
                  <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png"
                    alt="No Image"
                    onLoad={() => setLoaded(true)}
                  />
                </Carousel.Item>
              }
            </Carousel>
          </ImagemContainer>
          <div className="info">
            <h2>{(produto.Nome.toLowerCase())}</h2>
            <Precos>
              {produto.listPrice
                ? <b className={'listPrice'}>{Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(produto.listPrice)}
                </b>
                : null}
              <b className={'salePrice'}>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(produto.saleprice)}
              </b>
            </Precos>
          </div>
        </Card>
      </VisibilitySensor>

    </>
  )
}

export default ProdutoItem

import { Wrapper, ContainerHeader, Message, Container, ContainerNav, Lista, Navegacao, RedesSociais, Categorias, ListaCategorias, CategoriaItem } from './Nav.style'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { FaInstagram, FaWhatsapp, FaShoppingBag } from 'react-icons/fa'
import Link from 'next/link'
import { connect } from 'react-redux'
import { ICategoria } from '../../typing/Interfaces/ICategoria'
import MenuMobile from '../MenuMobile/MenuMobile'

interface INav{
  tamanhoCarrinho: number
  carrinho?: boolean,
  categorias?: Array<ICategoria>
}

const Nav: React.FC<INav> = ({ tamanhoCarrinho, carrinho, categorias }:INav) => {
  const [MenuState, setMenuState] = React.useState(false)
  const [MenuBackGround, setMenuBackground] = React.useState(false)

  React.useEffect(() => {
    const checkPageOffSet = () => {
      window.addEventListener('scroll', () => {
        window.pageYOffset < 1 ? setMenuBackground(false) : setMenuBackground(true)
      })
    }
    checkPageOffSet()
  }, [])

  return (
    <Wrapper>
      <ContainerHeader MenuBackground={MenuBackGround}>
        <Container className="Container">
          <Message>
            <span>Entrega Gratis para Piraúba</span>
          </Message>
          <RedesSociais >
            <li>
              <Link href="https://www.instagram.com/loveshopdaari/">
                <a target="blank"><FaInstagram /></a>
              </Link>
            </li>
            <li>
              <Link href="https://wa.me/message/IMPCTMLVS27FJ1">
                <a target="blank"><FaWhatsapp /></a>
              </Link>
            </li>
          </RedesSociais>
        </Container>
      </ContainerHeader>

      <Navegacao MenuBackground={MenuBackGround}>
        <ContainerNav className="Container">
          <FiMenu onClick={() => setMenuState(!MenuState)} className="BotaoMenu"/>
          <MenuMobile MenuState={MenuState} SetMenuState={setMenuState} categorias={categorias}/>
          <Lista MenuState={MenuState}>
            <li>
              <Link href="/">
                <a>Inicio</a>
              </Link>
            </li>
            <li>
              <Link href="/entrega">
                <a>Entrega</a>
              </Link>
            </li>
          </Lista>
          {!carrinho
            ? <Link href="/carrinho">
              <a className="CarrinhoButton">
                <FaShoppingBag className="Cart" />
                {tamanhoCarrinho > 0 ? <p>{tamanhoCarrinho} </p> : null
                }
              </a>
            </Link>
            : null}
        </ContainerNav>
        <Categorias >
          <ListaCategorias className='Container'>
            {categorias && categorias.map(categoria => {
              return (
                <Link href={`/categoria/${categoria._id}?categoria=${categoria.Nome}`} key={categoria._id}>
                  <a >
                    <CategoriaItem key={categoria._id}>
                      <p>{categoria.Nome}</p>
                    </CategoriaItem>
                  </a>
                </Link>
              )
            })}
          </ListaCategorias>
        </Categorias>
      </Navegacao>

    </Wrapper>
  )
}

const mapStateToProps = (state: any) => ({
  tamanhoCarrinho: state.cart.length
})

export default connect(mapStateToProps)(Nav)

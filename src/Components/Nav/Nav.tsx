import {Wrapper, ContainerHeader, Message, Container, ContainerNav, Lista, Navegacao, RedesSociais, UserCart } from './Nav.style'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { FaInstagram, FaWhatsapp, FaShoppingBag } from 'react-icons/fa'
import Link from 'next/link'
import {connect} from 'react-redux'
import {IUserInfo} from '../../Interfaces/IUserInfo'
import * as userActions from '../../store/modules/user/actions'

interface INav{
  tamanho_carrinho: number
  userInfo: IUserInfo
  dispatch: any
}

const Nav: React.FC<INav> = ({tamanho_carrinho, userInfo, dispatch}) => {
  const [MenuState, setMenuState] = React.useState(false)
  const [MenuBackGround, setMenuBackground] = React.useState(false)
  const [LogoutStateMenu, setLogoutStateMenu] = React.useState(false)

  React.useEffect(() => {
    const checkPageOffSet = () => {
      window.addEventListener('scroll', () => {
        window.pageYOffset < 30? setMenuBackground(false): setMenuBackground(true)
      })
    }
    checkPageOffSet();
  })

  const handleLogout = () => {
    dispatch(userActions.Logout())
  }

  return (
    <Wrapper>
      <ContainerHeader MenuBackground={MenuBackGround}>
        <Container className="Container">
          <Message>
            <span>Entrega Gratis para Piraúba</span>
          </Message>
          <RedesSociais >
            <li>
              <Link href="https://www.instagram.com/loveshoplibido/">
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
          <FiMenu  onClick={()=>setMenuState(!MenuState)} className="BotaoMenu"/>
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
          <li>
            <Link href="/produtos">
              <a>Produtos</a>
            </Link> 
          </li>
          </Lista>
          <UserCart LogoutStateMenu={LogoutStateMenu}>
            {userInfo ?
             <div>
                <b onClick={() => setLogoutStateMenu(!LogoutStateMenu)}>Olá, {userInfo.nome}</b>
                <b className="LogoutButton"  onClick={() => handleLogout()}>Logout</b>
             </div>
              
              :
              <Link href="/login">
              <a className="CarrinhoButton">
                <b>
                  Login
                </b>
              </a>
            </Link>}
            <Link href="/carrinho">
              <a className="CarrinhoButton">
                <FaShoppingBag className="Cart" />
                {tamanho_carrinho > 0 ? <p>{tamanho_carrinho} </p> : null
                }
              </a>
            </Link>
          </UserCart>
          
        </ContainerNav>
      </Navegacao>
    </Wrapper>
  )
}


const mapStateToProps = (state: any)  => ({
  tamanho_carrinho: state.cart.length,
  userInfo: state.user
});

export default connect(mapStateToProps)(Nav);
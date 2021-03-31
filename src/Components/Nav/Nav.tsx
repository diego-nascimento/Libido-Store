import { ContainerNav, Lista, Navegacao, RedesSociais } from './Nav.style'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const Nav: React.FC = () => {
  const [MenuState, setMenuState] = React.useState(false)
  const [MenuBackGround, setMenuBackground] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      window.pageYOffset < 30? setMenuBackground(false): setMenuBackground(true)
    })
  })

  return (
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
        <RedesSociais>
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
        </ContainerNav>
      </Navegacao>
  )
}

export default Nav;
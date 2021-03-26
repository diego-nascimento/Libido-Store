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
    window.pageYOffset < 200? setMenuBackground(false): setMenuBackground(true)
  })
  })

  return (
    <Navegacao MenuBackground={MenuBackGround}>
        <ContainerNav className="Container">
          <FiMenu  onClick={()=>setMenuState(!MenuState)} className="BotaoMenu"/>
        <Lista  MenuState={MenuState}> 
          <li>
            Sobre Nós
          </li>
          <li>
            
              <a>Produtos</a>
          </li>
        </Lista>
        <RedesSociais>
          <li>
            <FaInstagram />
          </li>
          <li><FaWhatsapp /></li>
        </RedesSociais>
        </ContainerNav>
      </Navegacao>
  )
}

export default Nav;
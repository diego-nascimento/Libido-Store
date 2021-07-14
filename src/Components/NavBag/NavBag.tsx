import React from 'react'
import { Navegacao, ContainerNav } from '../Nav/Nav.style'
import Link from 'next/link'

const NavBag: React.FC = () => {
  return (
    <Navegacao MenuBackground={false} >
      <ContainerNav className='Container'>
        <Link href='/'>
          <a>
            <h1>Libido</h1>
          </a>
        </Link>
      </ContainerNav>

    </Navegacao>
  )
}

export default NavBag

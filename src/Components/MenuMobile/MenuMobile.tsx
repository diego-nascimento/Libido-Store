import React from 'react'
import { ICategoria } from '../../typing/Interfaces/ICategoria';
import {Container, Lista, Item} from './MenuMobile.style'
import Link from 'next/link'

interface IMenuMobile{
  MenuState: boolean
  SetMenuState: any
  categorias: Array<ICategoria>
}

const MenuMobile: React.FC<IMenuMobile> = ({MenuState, SetMenuState, categorias}) =>{
  return(
    <Container MenuState={MenuState}>
       <div className="ContainerLabel" style={{borderBottom: '1px solid #111'}}>
            <p style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', }}>Menu</p>
          </div>
      <div className="ContainerFechar">
       <p onClick={() => {SetMenuState(false)}} className='BotaoFechar'>Fechar Menu</p>
      </div>
      <Lista>
        <Link href={`/`} >
              <a onClick={() => SetMenuState(!MenuState)}>
                <Item>
                <p>Inicio</p>
              </Item>
              </a>
        </Link>
        <Link href={`/entrega`}>
              <a onClick={() => SetMenuState(!MenuState)}>
                <Item>
                <p>Entrega</p>
              </Item>
              </a>
        </Link>
          <div className="ContainerLabel">
            <p style={{width: '100%', display: 'flex', alignItems: 'center', color: '#999'}}>Categorias:</p>
          </div>
        {categorias.map(categoria =>{
          return(
            <Link href={`/categoria/${categoria._id}`}>
              <a onClick={() => SetMenuState(!MenuState)}>
                <Item>
                <p>{categoria.Nome}</p>
              </Item>
              </a>
            </Link>

            
          )
        })}
      </Lista>
    </Container>
  )
};

export default MenuMobile
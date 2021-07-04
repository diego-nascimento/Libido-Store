import React from 'react'
import { ICategoria } from '../../typing/Interfaces/ICategoria'
import { Container, Lista, Item } from './MenuMobile.style'
import Link from 'next/link'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'

interface IMenuMobile{
  MenuState: boolean
  SetMenuState: any
  categorias: Array<ICategoria>
}

const MenuMobile: React.FC<IMenuMobile> = ({ MenuState, SetMenuState, categorias }) => {
  return (
    <Container MenuState={MenuState}>
       <div className="ContainerLabel" style={{ borderBottom: '1px solid #111' }}>
            <p style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>Menu</p>
          </div>
      <div>
       <p onClick={() => { SetMenuState(false) }} className='BotaoFechar'><AiOutlineClose style={{ width: '20px', height: '20px' }}/></p>
      </div>
      <Lista>
        <Link href={'/'} >
              <a onClick={() => SetMenuState(!MenuState)}>
                <Item>
                <p>Inicio</p>
              </Item>
              </a>
        </Link>
        <Link href={'/entrega'}>
              <a onClick={() => SetMenuState(!MenuState)}>
                <Item style={{ borderBottom: '1px solid #111' }}>
                <p>Entrega</p>
              </Item >
              </a>
        </Link>

        <Accordion style={{ background: 'transparent', border: 'none', margin: '0px', padding: '0px', height: '100%' }}>
              <AccordionSummary
                style={{ width: '100%', padding: '0px' }}
                expandIcon={
                  <MdExpandMore style={{ width: '20px', height: '20px' }}/>
                }
              >
                  <div
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: ' 0px 5px' }}
                    >
                    <p style={{ margin: '0px', padding: '0px' }}>Categorias</p>
                  </div>
              </AccordionSummary>
              <AccordionDetails style={{ width: '100%', padding: '0px' }}>
                <Lista>
                  {categorias.map(categoria => {
                    return (
                      <Link href={`/categoria/${categoria._id}?categoria=${categoria.Nome}`} key={categoria._id}>
                        <a onClick={() => SetMenuState(!MenuState)}>
                          <Item>
                            <p>{categoria.Nome}</p>
                          </Item>
                        </a>
                      </Link>
                    )
                  })}
                </Lista>

            </AccordionDetails>
          </Accordion>

      </Lista>
    </Container>
  )
}

export default MenuMobile

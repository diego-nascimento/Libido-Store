import { FooterContainer, Logo, Rights } from './Footer.style'
import { RedesSociais } from '../Nav/Nav.style'
import { FaInstagram, FaWhatsapp} from 'react-icons/fa'

const Footer: React.FC =() => {
  return (
    <FooterContainer>
        <div className="Container Footer-Container">
          <Logo></Logo>
           <div className="Grid-Container">
            <p>Onde Estamos?</p>
            <ul>
              <li>
                Rua Nilo Correa Condé, 108
              </li>
              <li>
                Piraúba - MG, Sossego
              </li>
            </ul>
          </div>
          <div className="Grid-Container">
            <p>Entre em Contato</p>
            <ul>
              <li><FaWhatsapp />: (32) 98728-9828</li>
              <li><FaInstagram />:</li>
            </ul>
          </div>
          <div>
            <p>Links Uteis</p>
            <ul>
              <li>Sobre nós</li>
              <li>Produtos</li>
            </ul>
          </div>
        </div>
        <Rights className="Container">
          <section className="Rights-Container">
            <span>© {new Date().getFullYear()} Libido, Todos os Direitos Reservados.</span>
            <RedesSociais className="Redes-Sociais-Footer">
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaWhatsapp />
              </li>
        </RedesSociais>
          </section>
        </Rights>
      </FooterContainer>
  )
}


export default Footer
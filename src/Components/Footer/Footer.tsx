import { FooterContainer, Rights } from './Footer.style'
import { RedesSociais } from '../Nav/Nav.style'
import { FaInstagram, FaWhatsapp} from 'react-icons/fa'
import Link from 'next/link'

const Footer: React.FC =() => {
  return (
    <FooterContainer>
        <div className="Container Footer-Container">
          {/*<Logo></Logo>*/}
          <div className="Grid-Container">
            <p>Entre em Contato</p>
            <ul>
              <li><FaWhatsapp />: (32) 9 9113-0257</li>
              <li><FaInstagram />: @loveshoplibido</li>
            </ul>
          </div>
          <div className="Grid-Container">
            <p>Links Uteis</p>
            <ul>
              <li>
                <Link href="/entrega">
                  <a>Entregas</a>
                </Link> 
              </li>
              <li>
                <Link href="/produtos">
                  <a>Produtos</a>
                </Link> 
              </li>
            </ul>
          </div>
        </div>
        <Rights className="Container">
          <div className="Rights-Container">
            <span>© {new Date().getFullYear()} Libido, Todos os Direitos Reservados.</span>
            <RedesSociais className="Redes-Sociais-Footer">
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
          </div>
        </Rights>
      </FooterContainer>
  )
}


export default Footer
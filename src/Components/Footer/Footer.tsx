import React from 'react'
import { FooterWrapper, FooterContainer, FooterAside, FooterMain, Content, Info, RedesSociais, SVGContainer, ContainerFooterMain, FooterRightSide, ContainerPagarme, FooterBottom, ContainerBandeiras, ContainerFooterBoottom } from './Footer.style'
import Link from 'next/link'
import { AiOutlineMail, AiOutlineInstagram, AiOutlineWhatsApp, AiOutlinePhone } from 'react-icons/ai'

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer className="Container">
        <FooterAside>
          <h2>Informações de Contato</h2>
          <Content>
            <AiOutlineInstagram />
            <Info>
              <h2>Instagram</h2>
              <p>@loveshopdaari</p>
            </Info>
          </Content>
          <Content>
            <AiOutlineMail />
            <Info>
              <h2>Email</h2>
              <p>libidopirauba@gmail.com</p>
            </Info>
          </Content>
          <Content>
            <AiOutlinePhone />
            <Info>
              <h2>Telefone</h2>
              <p>(32) 99974-5208</p>
            </Info>
          </Content>
          <RedesSociais>
            <Link href="https://www.instagram.com/loveshopdaari/">
              <a >
              <SVGContainer>
                <AiOutlineInstagram />
              </SVGContainer>
              </a>
            </Link>
            <Link href="https://wa.me/message/IMPCTMLVS27FJ1">
              <a >
                <SVGContainer>
                <AiOutlineWhatsApp />
                </SVGContainer>
              </a>
            </Link>
          </RedesSociais>
        </FooterAside>
        <FooterMain>
          <ContainerFooterMain>
            <h2>Links Rapidos</h2>
            <Link href="https://www.instagram.com/loveshopdaari/">
              <a>
                <p>Sobre nós</p>
              </a>
            </Link>
            <Link href="/entrega">
              <a>
                <p>Entrega</p>
              </a>
            </Link>
            <Link href="politicas-de-trocas">
              <a>
                <p>Politicas de trocas e devoluções</p>
              </a>
            </Link>
            <Link href="/produtos">
              <a>
                <p>Produtos</p>
              </a>
            </Link>
          </ContainerFooterMain>
        </FooterMain>
        <FooterRightSide>
        <ContainerPagarme>
            <img src="/ssl.svg" alt="ssl certified" />
          </ContainerPagarme>
         <ContainerPagarme>
            <p>POWERED BY</p>
            <img src="/pagarme-logo.png" alt="pagarme" />
          </ContainerPagarme>
          <ContainerBandeiras>
            <img src="/bandeiras.png" alt="bandeiras aceitas" />
          </ContainerBandeiras>
        </FooterRightSide>
      </FooterContainer>
      <FooterBottom>
        <ContainerFooterBoottom className="Container">
          <span>2021  Diego Nascimento - Todos os Direitos Reservados</span>
        </ContainerFooterBoottom>
      </FooterBottom>
    </FooterWrapper>
  )
}
export default Footer

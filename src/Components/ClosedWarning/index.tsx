import React from 'react'
import * as SC from './style'

export const ClosedWarning : React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    const localStorageData = localStorage.getItem('warningClosed')
    !localStorageData && setOpen(true)
  }, [])

  const handleClose = () => {
    localStorage.setItem('warningClosed', 'fechado')
    setOpen(false)
  }

  return (<SC.Container open={open}>
    <SC.Text>O site já não está mais em funcionamento e ficará no ar apenas como demonstração. Os pedidos não serão mais cobrados e nem contabilizados.  </SC.Text>
    <SC.Text>Muito obrigado de toda equipe Libido SexShop!!!!</SC.Text>
    <SC.Botao onClick={() => handleClose()}>Fechar</SC.Botao>
  </SC.Container>)
}

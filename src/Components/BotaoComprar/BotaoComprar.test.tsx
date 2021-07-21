import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IProduto } from '../../typing/Interfaces/IProduto'
import BotaoComprar from './BotaoComprar'
import React from 'react'

Enzyme.configure({ adapter: new Adapter() })

const productMocked: IProduto = {
  Nome: 'mockedName',
  _id: '12903-',
  categorias: [
    {
      Imagem: {
        _id: '123',
        url: 'any_url'
      },
      Nome: 'testename',
      _id: '12309-'
    }
  ],
  descricao: 'any_des',
  especificacao: 'teste',
  imagens: [
    {
      _id: '123',
      url: 'any_url'
    }
  ],
  listPrice: 123,
  pronta: true,
  saleprice: 321
}

describe('BotaoComprar component', () => {
  test('Should contain the children passed', () => {
    const onButtonClick = jest.fn(() => {})
    const wrapper = shallow(<BotaoComprar Click={onButtonClick} Style={{}}Produto={productMocked}>teste</BotaoComprar>)
    wrapper.simulate('click')
    expect(onButtonClick).toHaveBeenCalledWith(productMocked)
  })

  test('Should match snapshot', () => {
    const onButtonClick = jest.fn(() => {})
    const wrapper = shallow(<BotaoComprar Click={onButtonClick} Style={{}}Produto={productMocked}>teste</BotaoComprar>)
    expect(wrapper).toMatchSnapshot()
  })
})

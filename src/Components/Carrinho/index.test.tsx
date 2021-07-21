import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Carrinho from './index'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store'

Enzyme.configure({ adapter: new Adapter() })

describe('Carrinho Component', () => {
  test('Should render component with no errors', () => {
    const wrapper = shallow(<Provider store={store}><Carrinho /></Provider>)
    expect(wrapper).toBeTruthy()
  })
})

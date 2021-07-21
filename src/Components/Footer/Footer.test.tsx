import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import Footer from './Footer'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('FooterComponent', () => {
  test('Should render with no errors', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toBeTruthy()
  })

  test('Should match snapshot', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })
})

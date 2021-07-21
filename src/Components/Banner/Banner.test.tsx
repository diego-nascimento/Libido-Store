import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Banner from './Banner'
import React from 'react'
import { Container } from './Banner.style'

Enzyme.configure({ adapter: new Adapter() })

describe('BannerComponent', () => {
  test('BannerComponent should render with no errors', () => {
    const wrapper = shallow(<Banner />)
    expect(wrapper).toBeTruthy()
  })

  test('Should find a Container in Component', () => {
    const wrapper = shallow(<Banner />)
    expect(wrapper.find(<Container />)).toBeTruthy()
  })

  test('Should match snapshot', () => {
    const wrapper = shallow(<Banner />)
    expect(wrapper).toMatchSnapshot()
  })
})

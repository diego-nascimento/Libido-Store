import { keyframes } from 'styled-components';


interface IImageShowUp{
  opacity: number
}

export const ImageShowUp = ({opacity}:IImageShowUp)  => keyframes`
  from{
    opacity: 0
  }to{
    opacity: ${opacity};
  }
`;
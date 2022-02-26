import styled from 'styled-components'
import { color, space, fontSize, buttonStyle, variant } from 'styled-system'


const buttonSize = variant({
  prop: 'size',
  key: 'buttonSizes'
})

export const Button = styled.button`
   border: 0;
   outline: 0;
   font-size: 18px;
    padding: 9px 20px;
    border-radius: 5px;
   ${color}
   ${space}
   ${fontSize}
   ${buttonStyle}
   &:hover{
     cursor: pointer;
   }
   &:active{
     background-color: limegreen;
   }
 `
Button.defaultProps = {
  variant: 'primary',
  backgroundColor: 'blue',
  size: 'medium'
}
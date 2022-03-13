import styled from 'styled-components'
import { color, space, fontSize, buttonStyle, variant } from 'styled-system'


const buttonSize = variant({
  prop: 'size',
  scale: 'buttonSizes'
})

export const Button = styled.button`
  border: 0;
  outline: 0;
  border-radius: 5px;
  ${color}
  ${space}
  ${fontSize}
  ${buttonStyle}
  ${buttonSize}
  &:hover{
    cursor: pointer;
  }
`
Button.defaultProps = {
  variant: 'primary',
  backgroundColor: 'blue',
  size: 'medium'
}
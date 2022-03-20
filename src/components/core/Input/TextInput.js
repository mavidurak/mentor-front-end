import { forwardRef } from "react"
import styled from "styled-components"
import { InputWrapper, Label, ErrorMessage } from './common'

const TextInput = forwardRef(({ defaultValue, textarea, label, name, placeholder, type, onChange, onBlur, errorMessage }, ref) => {

  return (
    <InputWrapper>
      {label && <Label htmlFor="input-field">{label}</Label>}
      {
        textarea ?
          <Textarea
            ref={ref}
            type={type}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
          />
          :
          <Input
            ref={ref}
            type={type}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
          />
      }
      <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
    </InputWrapper>
  )
})

export default TextInput


const Input = styled.input`
  display: flex;
  padding: 12px;
  background-color: white;
  border: 4px;
  border-color: gray;
  border-radius: 5px;
  border: ${props => props.theme.borders};
  font-size: medium;
  width: 100%;
  box-sizing: border-box;
  &:focus {
        outline: none;
        box-shadow: 0px 0px 2px gray;
    }
`;

const Textarea = styled.textarea`
  resize: vertical;
  display: flex;
  padding: 12px;
  background-color: white;
  border: 4px;
  border-color: gray;
  border-radius: 5px;
  border: ${props => props.theme.borders};
  font-size: medium;
  width: 100%;
  box-sizing: border-box;
  &:focus {
        outline: none;
        box-shadow: 0px 0px 2px gray;
    }
`;
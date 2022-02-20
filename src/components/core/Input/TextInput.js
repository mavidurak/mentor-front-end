import { forwardRef } from "react"
import styled from "styled-components"

const TextInput = forwardRef(({ defaultValue, label, name, placeholder, type, onChange,onBlur, errorMessage },ref) => {
  
  return(
  <InputWrapper>
    {label && <Label htmlFor="input-field">{label}</Label>}
    <Input
      ref={ref}
      defaultValue={defaultValue}
      type={type}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
    <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
  </InputWrapper>
  )
})

export default TextInput

const InputWrapper = styled.div`
  padding: 1em;
  display: block;
`;

const Label = styled.label`
  padding: 5px;
  display: block;
`;

const ErrorMessage = styled.p`
  padding: 1px;
  display: block;
  color: red;
  margin: auto;
  font-size: small;
`;

const Input = styled.input`
  padding: 16px;
  background-color: whitesmoke;
  border: 4px;
  border-color: gray;
  border-radius: 5px;
  width: max-content;
  font-size: medium;
  width: 20em;
  &:focus {
        outline: none;
        box-shadow: 0px 0px 2px gray;
    }
`;
import { forwardRef, useEffect, useState,useRef } from "react"
import styled from "styled-components"
import { InputWrapper, Label, ErrorMessage } from './common'

const CheckboxInput = forwardRef(({label, name,value,defaultChecked, placeholder, onChange, errorMessage }, ref) => {

  return (
    <InputWrapper>
      {label && <Label htmlFor="input-field" checkbox="true">{label}</Label>}

      <Input
        ref={ref}
        name={name}
        className="form-control"
        placeholder={placeholder}
        type="checkbox"
        onChange={onChange}
      />

      <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
    </InputWrapper>
  )
})

export default CheckboxInput

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

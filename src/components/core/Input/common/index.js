import styled from "styled-components"

export const InputWrapper = styled.div`
  padding-block: 1em;
  display: block;
`;

export const Label = styled.label`
  padding: 5px;
  display: block;
  color: ${props => props.theme.colors.text600};
  text-align : ${props => props.checkbox ? "center":"start"};
`;

export const ErrorMessage = styled.p`
  padding: 1px;
  display: block;
  color: ${props => props.theme.colors.error};
  margin: auto;
  font-size: small;
`;
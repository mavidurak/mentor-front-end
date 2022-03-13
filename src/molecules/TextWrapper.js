import { Flex } from "../elements";
import styled from "styled-components";

export const TextWrapper = styled(Flex)`
  overflow: hidden;
`;
TextWrapper.defaultProps = {
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  height: "100%",
  background: "#fff",
  fontSize: 1
};
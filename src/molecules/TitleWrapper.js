import { Flex } from "../elements";
import styled from "styled-components";

export const TitleWrapper = styled(Flex)``;
TitleWrapper.defaultProps = {
  color: "text600",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "100%",
  p: [1, null, 2],
  fontSize: [4, null, 5]
};

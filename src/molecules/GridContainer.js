import styled from "styled-components";
import { Grid } from "../elements";

const GridContainer = styled(Grid)``;
GridContainer.defaultProps = {
  gridTemplateColumns: [
    "repeat(1, 1fr)",
    null,
    "repeat(2, 1fr)",
    "repeat(4, 1fr)"
  ],
  gridGap: [1, null, 2]
};
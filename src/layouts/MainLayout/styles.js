
import styled from "styled-components";

import { v } from "../../styles/variables";

export const SLayout = styled.div`
    display: flex;
    max-height: 100vh;
    overflow: hidden;
`;

export const SMain = styled.main`
    padding: calc(${v.smSpacing} * 2);
    width: 100%;
    overflow-y: auto;
    h1 {
        font-size: 14px;
    }
`;
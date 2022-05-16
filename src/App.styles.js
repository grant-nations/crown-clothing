import styled from "styled-components";

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  padding: 0 30px 70px;
`;

export const InnerWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
`;

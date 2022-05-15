import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  h2 {
    margin: 0;
    padding: 0 0 25px;
  }
`

export const TitleSpan = styled.span`
  font-size: 28px;
  cursor: pointer;
`

export const PreviewDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`

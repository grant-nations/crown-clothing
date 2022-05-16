import styled from "styled-components";

export const CheckoutContainer = styled.div`
  max-width: 960px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto 0;
  padding: 0 30px 70px;
`

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;


`

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  
  &:last-child {
    width: 8%;
  }
`

export const TotalSpan = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 30px;
`

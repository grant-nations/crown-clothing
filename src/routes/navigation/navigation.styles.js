import styled from "styled-components";
import {Link} from "react-router-dom";

export const NavigationContainer = styled.div`
  position: fixed;
  left: 30px;
  right: 30px;
  top: 0;
  height: 70px;
  width: calc(100vw - 60px);
  display: flex;
  justify-content: space-between;
  background-color: white;
  z-index: 100;
`

export const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70px;
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`

import styled from "styled-components";
import {Link} from "react-router-dom";

export const NavigationContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 70px;
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
  margin-left: 30px;
`

export const NavLinks = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`

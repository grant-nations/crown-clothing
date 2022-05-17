import {Fragment, useContext} from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLinks, NavLink} from "./navigation.styles";

const Navigation = () => {

    const {cartOpen, setCartOpen} = useContext(CartContext);
    const {currentUser} = useContext(UserContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className={"logo"}/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {currentUser ?
                        <NavLink as="span" className="nav-link" onClick={signOutUser}>SIGN OUT</NavLink> :
                        <NavLink to="/auth">
                            SIGN IN
                        </NavLink>
                    }
                    <CartIcon onClick={setCartOpen}/>
                </NavLinks>
                {cartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;

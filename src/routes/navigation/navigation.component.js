import {Fragment} from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector, useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {LogoContainer, NavigationContainer, NavLinks, NavLink} from "./navigation.styles";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {

    const dispatch = useDispatch();
    const cartOpen = useSelector(selectCartOpen);
    const currentUser = useSelector(selectCurrentUser);

    const signOutUser = () => {
        dispatch(signOutStart());
    }

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
                    <CartIcon/>
                </NavLinks>
                {cartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;

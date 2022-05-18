import {Routes, Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // returns a method that unsubscribes the listener to prevent memory leak
        // when the listener is initialized, the callback runs. It also runs on any
        // subsequent authentication changes
        const unsubscribe = onAuthStateChangedListener((user) => {
            // the user will be null if no user is logged in
            // if a user is signed in, the user object will be populated
            if (user)
                // if the user is new, create a new user document for them in firebase
                createUserDocumentFromAuth(user).catch((err) => console.error(err));
            dispatch(setCurrentUser(user));
        });

        return unsubscribe; // run unsubscribe whenever this component unmounts
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="auth" element={<Authentication/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>
        </Routes>
    );
}

export default App;

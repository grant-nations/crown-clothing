import {createContext, useState, useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

// the value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// the component of the context
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

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
            setCurrentUser(user);
        });

        return unsubscribe; // run unsubscribe whenever this component unmounts
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducer/reducer.utils";

// the value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// the component of the context
export const UserProvider = ({children}) => {

    // destructure current user off of the state object
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // the below is analogous to the setState "version" of setCurrentUser from useState, but instead
    // with useReducer
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    // const [currentUser, setCurrentUser] = useState(null);
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


import {useEffect} from "react";
import {getRedirectResult} from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
    auth,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    useEffect( () => {
        async function getResults(){
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getResults().catch(console.error);
    }, [])

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;

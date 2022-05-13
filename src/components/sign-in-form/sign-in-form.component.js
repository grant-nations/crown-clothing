import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import {
    auth,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import {useEffect, useState} from "react";
import {getRedirectResult} from "firebase/auth";

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {

    useEffect(() => {
        async function getResults() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }

        getResults().catch(console.error);
    }, [])

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);

    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    alert("Incorrect password.")
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email.");
                    break;
                default:
                    console.error("Error creating user: ", err);
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={email}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogleRedirect}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;

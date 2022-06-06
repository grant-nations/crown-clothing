import {ChangeEvent, FormEvent, useState} from "react";
import {AuthError, AuthErrorCodes} from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {SignUpContainer} from "./sign-up-form.styles";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (err) {
            if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
                alert("Cannot create user, email already in use.")
            else
                console.error("Error creating user: ", err);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    name="displayName"
                    type="text"
                    required
                    onChange={handleChange}
                    value={displayName}
                />

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
                    minLength={6}
                />

                <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                    minLength={6}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;

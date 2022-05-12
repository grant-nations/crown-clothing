import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use')
                alert("Cannot create user, email already in use.")
            else
                console.error("Error creating user: ", err);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name</label>
                <input name="displayName" type="text" required onChange={handleChange}
                       value={displayName}/>

                <label htmlFor="email">Email</label>
                <input name="email" type="email" required onChange={handleChange}
                       value={email}/>

                <label htmlFor="password">Password</label>
                <input name="password" type="password" required onChange={handleChange}
                       value={password} minLength="6"/>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" type="password" required onChange={handleChange}
                       value={confirmPassword} minLength="6"/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;

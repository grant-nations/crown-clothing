import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    google: "google",
    inverted: "inverted"
}

const getButton = (buttonType) => {
    switch (buttonType) {
        case BUTTON_TYPE_CLASSES.google:
            return GoogleSignInButton;
        case BUTTON_TYPE_CLASSES.inverted:
            return InvertedButton;
        default:
            return BaseButton;
    }
}

const Button = ({children, buttonType, ...otherProps}) => {

    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps}>{children}</CustomButton>
    )
}

export default Button;

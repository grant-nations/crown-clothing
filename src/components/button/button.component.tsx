
import {FunctionComponent as FC, ButtonHTMLAttributes} from "react";
import {BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner} from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
    google = "google",
    inverted = "inverted"
}

const getButton = (buttonType?: typeof BaseButton | BUTTON_TYPE_CLASSES): typeof BaseButton => {
    switch (buttonType) {
        case BUTTON_TYPE_CLASSES.google:
            return GoogleSignInButton;
        case BUTTON_TYPE_CLASSES.inverted:
            return InvertedButton;
        default:
            return BaseButton;
    }
}

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({children, buttonType, isLoading, ...otherProps}) => {

    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner/> : children}
        </CustomButton>
    )
}

export default Button;

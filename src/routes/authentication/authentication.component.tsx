import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {AuthenticationContainer} from "./authentication.styles";
import {OuterWrapper, InnerWrapper} from "../../App.styles";

const Authentication = () => {

    return (
        <OuterWrapper>
            <InnerWrapper>
                <AuthenticationContainer>
                    <SignInForm/>
                    <SignUpForm/>
                </AuthenticationContainer>
            </InnerWrapper>
        </OuterWrapper>

    )
}

export default Authentication;

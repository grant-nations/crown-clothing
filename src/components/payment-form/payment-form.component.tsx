import {useState, FormEvent} from "react";
import {useSelector} from "react-redux";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {PaymentFormContainer, FormContainer, PaymentButton, PaymentWarning} from "./payment-form.styles";

import {selectCartTotal} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {StripeCardElement} from "@stripe/stripe-js";

const ifValidCardElements = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements)
            return;

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret

        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElements(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded")
                alert("Payment Successful");
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <PaymentWarning>The following payment form is in test mode and will not accept real payments.
                    Please use the following to submit a test payment:</PaymentWarning>
                <PaymentWarning>Card Number: 4242 4242 4242 4242 | Exp Date: 4 24 | CVC: 242 | ZIP: 42424</PaymentWarning>
                <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay
                    now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;

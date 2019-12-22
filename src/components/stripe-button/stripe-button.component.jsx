import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_1vYWQiKmqchxnGN3M880Zz4Y00ajkfSqwV';
    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        /> 
    );
}

export default StripeCheckoutButton;

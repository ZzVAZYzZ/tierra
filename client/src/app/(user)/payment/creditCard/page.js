'use client'
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51SOtxjQta3QlNKNmwu69Pv2TxMWmnlbrwKZMDjjWm6INzkVDSAcZmhUfKPyhf98uLAFBTJMpRXKtXxQ6dKhOog6W00xYGOkau3");

export default function page() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

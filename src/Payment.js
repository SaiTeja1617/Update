import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./payment.css";
import gpay from "./gpay.png";
import phonepe from "./phonepe.png";
import paytm from "./paytm.png";
import debitcard from "./Debt card.png";

const Payment = () => {
    const navigate = useNavigate();
    
    const Paymentmethods = [
        { name: "GooglePay", img: gpay },
        { name: "PhonePe", img: phonepe },
        { name: "Paytm", img: paytm },
        { name: "Debit Card", img: debitcard }
    ];
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Next");
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [navigate]);
    
    return (
        <div className="container">
            <h3 className="title"><b><i>Payment Gateway</i></b></h3>
            <div className="payment-grid">
                {Paymentmethods.map((method, index) => (
                    <div key={index} className="box">
                        <img src={method.img} alt={method.name} />
                        <p>{method.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payment;




import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./payment.css";
import gpay from "./gpay.png";
import phonepe from "./phonepe.png";
import paytm from "./paytm.png";
import debitcard from "./Debt card.png";

const Payment1 = () => {
    const navigate = useNavigate();
    
    const Paymentmethods = [
        { name: "GooglePay", img: gpay },
        { name: "PhonePe", img: phonepe },
        { name: "Paytm", img: paytm },
        { name: "Debit Card", img: debitcard }
    ];
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/instructions1");
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [navigate]);
    
    return (
        <div className="container"
        style={{
            backgroundImage: `url('https://seeklogo.com/images/D/delhi-metro-rail-corporation-logo-7F2259B20E-seeklogo.com.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw"
          }}>
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

export default Payment1;




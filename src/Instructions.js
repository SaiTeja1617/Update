import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Instructions=()=>{
  const navigate=useNavigate()
  useEffect(() => {
          const timer = setTimeout(() => {
              navigate("/");
          }, 5000);
          return () => {
              clearTimeout(timer);
          };
      }, [navigate]);
    return(<div >
        <h1>Instructions</h1>
        <p ><strong><b><i>Thankyou for booking the ticket.</i></b></strong></p>
        <p><strong><b><i>This ticket is valid for tonight till 10pm after which the ticket will be cancelled</i></b></strong></p>
        <p><strong><b><i>Do not share the ticket with anyone</i></b></strong></p>
        <p><strong><b><i>Wish you a Happy Journey</i></b></strong></p>

    </div>)
}
export default Instructions;
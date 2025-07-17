import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Instructions1=()=>{
  const navigate=useNavigate()
  useEffect(() => {
          const timer = setTimeout(() => {
              navigate("/");
          }, 5000);
          return () => {
              clearTimeout(timer);
          };
      }, [navigate]);
    return(<div style={{
        backgroundImage: `url('https://seeklogo.com/images/D/delhi-metro-rail-corporation-logo-7F2259B20E-seeklogo.com.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw"
      }}>
        <h1>Instructions</h1>
        
        <p><strong><i>Please ensure that to use the amount with in the date of expiry </i></strong></p>
        <p><strong><i>Please ask the staff at the metro station to change the metrocard before prior to 10 days of expiry date</i></strong></p>
        
        

    </div>)
}
export default Instructions1;
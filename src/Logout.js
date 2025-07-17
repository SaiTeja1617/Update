import { myContext } from "./App"
import {useContext} from 'react';
import { useNavigate } from "react-router-dom";
const Logout=()=>{
    let [isloggedin,setIsLoggedin]=useContext(myContext);
    let navigate=useNavigate();
    
    return (<div style={{
        backgroundImage: `url('https://seeklogo.com/images/D/delhi-metro-rail-corporation-logo-7F2259B20E-seeklogo.com.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw"
      }}>
        <button >Logout</button>
    </div>)
}
export default Logout;
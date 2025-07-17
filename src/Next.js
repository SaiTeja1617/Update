import { useNavigate } from "react-router-dom";
import './Next.css';


const Nextinfo = () => {
    const navigate=useNavigate();
    const handleyesclick=(event)=>{
        event.preventDefault();
        navigate('/stations');
    }
    const handlenoclick=(event)=>{
        event.preventDefault();
        navigate('/instructions')
    }
    return (<div style={{
        backgroundImage: `url('https://seeklogo.com/images/D/delhi-metro-rail-corporation-logo-7F2259B20E-seeklogo.com.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw"
      }}>
        <form >
            <p>Do you want to book other tickets</p>
            <button onClick={handleyesclick}>Yes</button>
            <button onClick={handlenoclick}>No</button>

        </form>
    </div>)
    }

export default Nextinfo;
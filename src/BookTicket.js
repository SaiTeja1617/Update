import './Bookticket.css';
import { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

const Bookticket =()=>{
    let location=useLocation();
    let navigate=useNavigate();
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));

    useEffect(() => {
        if (!location.state) {
            alert("Please select stations first!");
            
        }
    }, [location, navigate]);
    const [error,setError]=useState(null);
    const fromstation = location.state?.fromstation || "Not Selected";
    const tostation = location.state?.tostation || "Not Selected";



    let enameRef=useRef(null);
    let eageRef=useRef(null);
    let [ticketinfo,setTicketinfo]=useState({
        name:'',
        age:'',
        from_station:'',
        to_station:'',
        fare:'',
        tktno:'',

    });
    console.log(ticketinfo)
    let post_url='http://127.0.0.1:8000/metroticketbooking/ticket/';
    let readdata=(event)=>{
        event.preventDefault();
        let data={
            name:enameRef.current.value,
            age:parseInt(eageRef.current.value),
            from_station:fromstation,
            to_station:tostation,
        };
    
        axios.post(post_url,data,{headers: {
            "Authorization": `Token ${token}`,  
            "Content-Type": "application/json"
        }})
        .then((resp)=>{

            console.log("Response Data:", resp.data);

            setTicketinfo(resp.data);
            navigate("/previewticket", { state: { ticketinfo: resp.data } }) 
        }
        
            ).catch((error) => {
                console.error('Ticket booking failed:',error);
                console.error('Error response:', error.response);
                setError(error.respone?.data?.message||"Something went wrong");

            });

    }

    return(
                
        <div className='bookticket'>   
        <p><b><h1>Interesting Facts about Delhi Metro</h1></b></p>
        <p><b>India's first modern metro system 
        First metro in the world to get "carbon credits" for reducing greenhouse gas emissions 
        One of the fastest metro networks in India, with trains running at speeds up to 80 km/h 
        Women-only coach in every train for safety 
        Driverless trains operate on some routes, like the Magenta & Pink Lines </b>  </p>
        <h1><i>Passenger Details</i></h1>
        <div className='ticket'>
        <p><b>From Station:</b> {fromstation || "Not Selected"}</p>
        <p><b>To Station:</b> {tostation || "Not Selected"}</p>  
        
        <form onSubmit={readdata}>
        <div className='details'>
        <p><i>Name:</i></p>
        <input ref={enameRef} type='text' />
        <p><i>Age:</i></p>
        <input ref={eageRef} type='text' />   </div>
        {error && (
            <div style={{ color: 'red' }}>
                <h3><strong>{error}</strong></h3>
            </div>
            )}

        <button type='submit'> Generate</button>
        </form>
        </div>
        
    </div>);
}
export default Bookticket;
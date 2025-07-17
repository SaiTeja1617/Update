import { useLocation,useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './Previewticket.css';
const Previewticket =({})=>{
    let location=useLocation();
    let navigate=useNavigate();
    const token = localStorage.getItem("token");
    let ticketinfo =location.state?.ticketinfo ;
    console.log("Received Ticket Info:", ticketinfo);
    if (!ticketinfo) {
         navigate("/");
         return null;
    }
    let url='http://127.0.0.1:8000/metroticketbooking/ticket/';
    const Generateticket=(event)=>{
        event.preventDefault();
        axios.post(url,ticketinfo,{headers: {
            "Authorization": `Token ${token}`,  
            "Content-Type": "application/json"
        }}).then((resp)=>{console.log(resp);
            navigate("/payment");
        }).catch((resp)=>{console.log(resp)});
    }
return (
<div className='Previewticket'>
    <h1><b><i>Ticket Preview</i></b></h1>
    <form onSubmit={Generateticket}>
    <p><i>Passenger Name:</i>{ticketinfo.name}</p>
    <p><i>Passenger Age:</i>{ticketinfo.age}</p>
    <p style={{ color: "black", fontSize: "18px" }}><i>From_station:</i>{ticketinfo.from_station}</p>
    <p style={{ color: "black", fontSize: "18px" }}><i>To_station:</i>{ticketinfo.to_station}</p>
    <p ><i>Fare:</i>{ticketinfo.fare}</p>
    <p><i>Tktno:</i>{ticketinfo.tktno}</p>
    {ticketinfo.qr_code && (
    <img src={`data:image/png;base64,${ticketinfo.qr_code}`} alt="QR Code" />)}
    <button type='submit'>Confirm</button>
    </form>

</div>);
}

export default Previewticket;
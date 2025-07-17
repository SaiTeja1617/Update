import './StationDropdown.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const StationsDropdown = () => {
  let [stations, setStations] = useState([]);
  const [fromstation,setFromstation]=useState('');
  const [tostation,setTostation]=useState('');
  let navigate=useNavigate();
let FromStation=(event)=>{
    setFromstation(event.target.value);  
    console.log(fromstation);
}
let ToStation=(event)=>{
    setTostation(event.target.value);
    console.log(tostation);
}
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/metroticketbooking/getstations/")
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  }, []);
  
  let HandleStations=(event)=>{
    event.preventDefault();
    if (!fromstation || !tostation)
    { alert ('Please select from station and tostation')}
    
    
    if (fromstation === tostation)
    { alert ('Both from and to stations cannot be same')}
    
        

    else
        {navigate('/ticket',{state:{fromstation,tostation}})}
}
const userlogout= ()=>{
  localStorage.removeItem('token');
  navigate('/')
}
const userhistory=()=>{
  navigate('/history')
}


  return (
    
    <div className="Stationslist"
    >
      <div className='BUTTONS'>
        
        <button  onClick={userhistory}>History</button>
        <button onClick={userlogout} >Logout</button>
      </div>
      <div className='Matter'>
        <h1>key Features</h1>
        <p><b>Total Network Length: Over 390 km (as of 2024)<br/>
Number of Stations: More than 285 stations<br/>


Average Daily Ridership: Over 5 million passengers<br/>
Metro Route Map:-
Route1:Electronic-City,Sector-62,Sector-59,Sector-61,Sector-52,Sector-34,City-Centre,Golf-Course,Botanical-Garden,Sector-18<br/>
Route2:Sector-16,Sector-15,New-Ashok Nagar,Mayur-Vihar Extn,Sector-52,Mayur-Vihar Phase1,Akshardham,Yamuna Bank,Indraprastha,Pragathi-Maidan.<br/></b></p>
<h3>Note:-If you are travelling from Route1 to Route2 change at intermediate Station(Sector-52).</h3>

      </div>
       <h2 >Select Your Metro Route</h2>
      
      <form onSubmit={HandleStations}>
      <label>Station:</label>
      <select id='From' onChange={(event)=>{setFromstation(event.target.value)}} value={fromstation}>
      <option  onClick={FromStation}>Choose From Station</option>
         <option value="Electronic City" onClick={FromStation}>Electronic City</option>
        <option value="Sector-62" onClick={FromStation}>Sector-62</option>
        <option value="Sector-59" onClick={FromStation}>Sector-59</option>
        <option value="Sector-61" onClick={FromStation}>Sector-61</option>
        <option value="Sector-52" onClick={FromStation}>Sector-52</option>
        <option value="Sector-34" onClick={FromStation}>Sector-34</option>
        <option value="City-Centre" onClick={FromStation}>City-Centre</option>
        <option value="Golf-Course" onClick={FromStation}>Golf-Course</option>
        <option value="Botanical-Garden" onClick={FromStation}>Botanical-Garden</option>
        <option value="Sector-18" onClick={FromStation}>Sector-18</option> 
        <option value="Sector-16" onClick={FromStation}>Sector-16</option> 
        <option value="Sector-15" onClick={FromStation}>Sector-15</option> 
        <option value="New-Ashok Nagar" onClick={FromStation}>New-Ashok Nagar</option> 
        <option value="Mayur_Vihar Extn" onClick={FromStation}>Mayur_Vihar Extn</option> 
        <option value="Mayur-Vihar Phase-1" onClick={FromStation}>Mayur-Vihar Phase-1</option> 
        <option value="Akshardham" onClick={FromStation}>Akshardham</option> 
        <option value="Yamuna-Bank" onClick={FromStation}>Yamuna-Bank</option>
        <option value="Indraprastha" onClick={FromStation}>Indraprastha</option>   
        <option value="Pragathi-Maidan" onClick={FromStation}>Pragathi-Maidan</option> 
        

         {/* {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}  */}
        </select>
        
      
      <label> Station:</label>
      <select id='To' onChange={(event)=>setTostation(event.target.value)} value={tostation}>
     <option  onClick={FromStation}>Choose To Station</option>
      <option value="Electronic City" onClick={FromStation}>Electronic City</option>
        <option value="Sector-62" onClick={FromStation}>Sector-62</option>
        <option value="Sector-59" onClick={FromStation}>Sector-59</option>
        <option value="Sector-61" onClick={FromStation}>Sector-61</option>
        <option value="Sector-52" onClick={FromStation}>Sector-52</option>
        <option value="Sector-34" onClick={FromStation}>Sector-34</option>
        <option value="City-Centre" onClick={FromStation}>City-Centre</option>
        <option value="Golf-Course" onClick={FromStation}>Golf-Course</option>
        <option value="Botanical-Garden" onClick={FromStation}>Botanical-Garden</option>
        <option value="Sector-18" onClick={FromStation}>Sector-18</option> 
        <option value="Sector-16" onClick={FromStation}>Sector-16</option> 
        <option value="Sector-15" onClick={FromStation}>Sector-15</option> 
        <option value="New-Ashok Nagar" onClick={FromStation}>New-Ashok Nagar</option> 
        <option value="Mayur_Vihar Extn" onClick={FromStation}>Mayur_Vihar Extn</option> 
        <option value="Mayur-Vihar Pase-1" onClick={FromStation}>Mayur-Vihar Pase-1</option> 
        <option value="Akshardham" onClick={FromStation}>Akshardham</option> 
        <option value="Yamuna-Bank" onClick={FromStation}>Yamuna-Bank</option>
        <option value="Indraprastha" onClick={FromStation}>Indraprastha</option>   
        <option value="Pragathi-Maidan" onClick={FromStation}>Pragathi-Maidan</option> 
        
         {/* <option value="">-- To Station --</option>
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>         ))} */}
      
        </select>
        <button type='submit'>Search </button>
        
      </form>

 
    </div>
  );
};

export default StationsDropdown;

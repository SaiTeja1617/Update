import {useState} from 'react';
import axios from 'axios';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import StationsDropdown from './StationDropdown';
function Login(){
    let navigate=useNavigate();
    const [error,setError]=useState(null);
    let [formdata,setFormData]=useState({
        username:"",
        password:""});
    let [isloggedin,setIsLoggedin]=useState(false);
    
    let handlechange=(event)=>{
        setFormData({...formdata,[event.target.name]:event.target.value});
    }

    let handleform=(event)=>{
        event.preventDefault();
        console.log("username:",formdata.username);
        console.log("Password:",formdata.password);
    let url='http://127.0.0.1:8000/metroticketbooking/login/';
    axios.post(url,JSON.stringify(formdata),{
        headers: { "Content-Type": "application/json" }
    })
    .then((resp)=>{console.log(resp);
        if (resp.status === 200 && resp.data['token'])
            
            console.log(resp);
            localStorage.setItem('token',resp.data['token']);
            
            setIsLoggedin(true);
            navigate('/Stations');
        return isloggedin?<StationsDropdown/>:<Login/>    
    })
    .catch((error)=>{console.error('Login failed:',error);
        setError(error.respone?.data?.message||"provide valid credetials to login.");
    });
}

    

    return(
        
    <div className='form-container' >
    <div className="imageslider">
           <h1>About Delhi Metro</h1>
           <p><b>The Delhi Metro is one of India's largest and most advanced rapid transit systems, <br/>serving Delhi and its surrounding areas, including Noida, Ghaziabad, Gurugram, Faridabad, and Bahadurgarh.<br/> It is operated by the Delhi Metro Rail Corporation (DMRC) and is known for its punctuality, cleanliness, and efficiency.</b></p> 
    </div>
    
            <form onSubmit={handleform}>
            <label><b>Username:-</b></label>
            <input onChange={handlechange} 
            name="username"
             value={formdata.username}
              Type='text' />
            <br/>
            <label><b>Password:-</b></label>
            <input onChange={handlechange} 
            name="password"
             value={formdata.password}
              Type="password" />
            <br/>
            {error && <p style={{ color: 'red' }}><strong><h3>{error}</h3></strong></p>}
            <button  type='submit'>Login</button>
            
            </form>
            
            </div>
        
        
        );
}
export default Login;
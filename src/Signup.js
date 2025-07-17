import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
function Signup(){
    let [formdata,SetFormData]=useState({
        username:'',
        email:'',
        password:'',

    });
    const navigate=useNavigate()
    let [error,setError]=useState('');
    let handlechange=(event)=>{SetFormData({...formdata,[event.target.name]:event.target.value});}
    let handleform=(event)=>{event.preventDefault();
        if (!formdata.username || !formdata.email || !formdata.password)
            {setError('All fields are required');
                return;}
            setError('');
        console.log("userData:",formdata);
            alert('Signup successfull');
            let post_url='http://127.0.0.1:8000/metroticketbooking/register/'
            axios.post(post_url,formdata).then((resp)=>{console.log(resp);
                navigate('/login')
            }).catch((resp)=>{console.log(resp)});
            };
        



    return(
  
    <div className='Signup'>
        
        <form onSubmit={handleform}>
        <h1>Signup</h1>
        {error && <p style={{ color: 'red', textDecoration: 'underline' }}>{error}</p>} 

        <label>Username:<input name='username' value={formdata.username} onChange={handlechange} type='text'/><br/>

        </label>
        <label>Email:<input name='email' value={formdata.email} onChange={handlechange} type='text'/><br/>

        </label>
        <label>Password:<input name='password' value={formdata.password} onChange={handlechange} type='Password'/><br/>

        </label>
        
        <button>Signup</button>
        </form>
    </div>
    );
    
}
export default Signup;
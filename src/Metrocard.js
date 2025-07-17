import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import './Metrocard.css';
import axios from "axios";

const Metrocard =()=>{
    const [error,setError]=useState(null); 
    const navigate = useNavigate()
    let [carddata,setCardata]=useState({
        card_number:'',
        amount:''
})
    const handlechange =(event)=>{
        setCardata({...carddata,[event.target.name]:event.target.value});
        
    }
    let url="http://127.0.0.1:8000/metroticketbooking/metrocard/";
    const datasent =(event)=>{
        event.preventDefault();
        axios.post(url,carddata,{headers: { "Content-Type": "application/json" }}).then((resp)=>{console.log(resp.data)
        navigate('/payment1');})
        .catch((error)=>{console.error('Recharge failed:',error);
            setError(error.respone?.data?.message||"provide valid Metrocardnumber and amount should greater than zero");
        })
    }
    return (
        <div >
            <form onSubmit={datasent}>
                <label>Metrocard_number</label>
                    <input  onChange={handlechange} name='card_number' value={carddata.card_number} type='text'/>
                <label>Amount</label>
                <input onChange={handlechange} name='amount' Value={carddata.amount} type='text'/>
                {error && <p style={{ color: 'red' }}><strong><h3>{error}</h3></strong></p>}
                <button type='submit'>Proceed</button>
            </form>
        </div>
    );
}
export default Metrocard;
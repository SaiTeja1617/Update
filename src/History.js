import { useState,useEffect } from "react";
import './History.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const History =()=>{
    const [history,setHistory]=useState([])
    let navigate=useNavigate()
    const url ='http://127.0.0.1:8000/metroticketbooking/history/'
    
    
    
    useEffect(() => {
      const timer = setTimeout(() => {
          navigate("/stations");
      }, 10000);
      return () => {
          clearTimeout(timer);
      };
  }, [navigate]);

    
    useEffect (()=>{
        axios.get(url,{headers:{Authorization:`Token ${localStorage.getItem("token")}`,}})
        .then((resp)=>{setHistory(resp.data);
            console.log(resp.data);
            console.log(localStorage.getItem("token"));

        })
        .catch((error)=>{console.log(error)})
    },[])
    return(
      
    <div className="history">
      <div className='title'><h1>Showing the history of the user</h1>
        </div>  
        {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <table border="1" cellSpacing={0}>
          <thead>
            <tr>
              <th>From Station</th>
              <th>To Station</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.f_station}</td>
                <td>{item.t_station}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>)
}

export default History;
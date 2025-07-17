import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import BookTicket from './BookTicket';
import Previewticket from './Previewticket';
import Payment from './Payment';
import Nextinfo from './Next';
import Instructions from './Instructions';
import History from './History';
import Payment1 from './Payment1';
import Instructions1 from './Instructions1';
import { createContext,useState} from 'react';
import StationsDropdown  from './StationDropdown';
import {Route,Routes} from 'react-router-dom';
import Metrocard from './Metrocard';
import BackgroundSlideshow from './Backgroundslider';
import { useEffect } from 'react';

export const myContext = createContext();
function App() {
  let [isloggedin,SetIsLoggedin]=useState(false);
  useEffect(()=>{console.log("App is rendering");},[]);

  
  return (
  <div className="App">
      <BackgroundSlideshow/>
      <div className='Logout'>
          {isloggedin?<Logout/>:''}
      </div>


      <Routes>
    
    <Route path='' element={<Home />}/>
      
      <Route path='/Signup' element={<Signup /> }/> 
      <Route path='/login' element={<Login />} />

      <Route path='/Stations' element={<StationsDropdown/> }/>
      <Route path='/ticket' element={<BookTicket/>} />
      <Route path='/previewticket' element={<Previewticket/> }/>
      <Route path='/payment' element={<Payment/>} /> 
      <Route path='/Next' element={<Nextinfo/>} />
      <Route path='/instructions' element={<Instructions/>}/>
      <Route path='/Metrocard'  element={<Metrocard/>}/>
      <Route path='/Logout' element={<Logout/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/payment1' element={<Payment1/>}/>
      <Route path='/instructions1' element={<Instructions1/>}/>

</Routes>             
            

    </div>
  );
}
export default App;

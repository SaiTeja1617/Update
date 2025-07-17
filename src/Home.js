import './Home.css';
import {Link} from 'react-router-dom';


function Home(){
    return (<div className='home'>
        
        <p><b><i>Note:If you are a new user please register first (OR) if you are a existing user please login first to book the tickets to recharge metrocard press on metrocard</i></b></p>

        <button className='login'><Link to='/login'>Login</Link></button>
        <button className='Register'><Link to='/Signup'>Register</Link></button>
        <button className='Metrocard'><Link to='/Metrocard'>Metrocard</Link></button>

    </div>);
}

export default Home;


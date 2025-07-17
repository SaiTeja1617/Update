import { useEffect,useState } from "react";
import {motion}  from 'framer-motion';
import "./Backslideshow1.css";
import "tailwindcss/tailwind.css";
import projectimage1 from './projectimage1.png';
import projectimage2 from './projectimage2.png';
import projectimage3 from './projectimage3.png';
import projectimage4 from './projectimage4.png';
import projectimage5 from './projectimage5.png';
import projectimage6 from './projectimage6.png';
const images=[
    projectimage1,
    projectimage2,
    projectimage3,
    projectimage4,
    projectimage5,
    projectimage6,
];
const BackgroundSlideshow=()=>{
    const [index,setIndex]=useState(0);
    useEffect(()=>{
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 5000);
          return ()=>clearInterval(interval);
    },[]);
    return(<div
        className="background-container">
        <motion.img
          key={index}
          src={images[index]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          
        />

    </div>)
}

export default BackgroundSlideshow;

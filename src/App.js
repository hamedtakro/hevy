import '../src/App.css';
import Navbar from './component/layout/navbar';
import Home from './component/layout/home';
import React from 'react';


import { Link } from "react-router-dom";


function App() {
  return (
    <div >
      <Navbar />
      <Home />
    </div>
  );
}



export default App;






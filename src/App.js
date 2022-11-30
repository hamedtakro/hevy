import '../src/App.css';
import Navbar from './component/layout/navbar';
import Footer from './component/layout/footer';
import Home from './component/layout/home';
import React from 'react';
import LabelBottomNavigation from './component/layout/buttomNavigation'

import { Link } from "react-router-dom";


function App() {
  return (
    <div >
      <Navbar />
      <Home />
      <LabelBottomNavigation />
    </div>
  );
}



export default App;






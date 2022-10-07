import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from "./App";

import Routines from "./component/routines/routines";
import Newroutin from "./component/routines/newroutine";

import Exercise from "./component/exerciseShow/exercise";
import Login from "./component/authentication/login";
import Settings from "./component/layout/settings";
import Check from "./component/authentication/checkNumber";
// import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'

import { store } from './store'
import { Provider } from 'react-redux'
import CardSelect from "./component/routines/cardSelect";
import RoutinesDay from "./component/routines/routinesDay";
import EditeRoutines from "./component/routines/updateRoutines/editeRoutines"
import PrivateRoute from "./component/authentication/privetRoute";
// 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider  store={store}>
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<App />} />
         <Route path="routines" element={<Routines />} />
         <Route path="exercise" element={<Exercise />} />
         <Route path="login" element={<Login />} />
         <Route path="check" element={<Check />} />
         <Route path="settings" element={<Settings />} />
         <Route path="newroutin" element={<Newroutin />} />
         <Route path="routinesDay" element={<RoutinesDay />} />
         <Route path="editeRoutin" element={<EditeRoutines />} />
       </Routes>
     </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


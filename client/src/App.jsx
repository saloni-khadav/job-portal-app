import React, { useContext, useState } from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Applyjob from "./pages/Applyjob";
import Applications from "./pages/Applications";
import RecruiterLogin from "./componenets/Recruiterlogin";
import { AppContext } from "./context/Appcontext";
import Dashboard from "./pages/Dashboard";
import Addjobs from "./pages/Addjobs";
import Managejobs from "./pages/Managejobs";
import Viewapplications from "./pages/Viewapplications";
import 'quill/dist/quill.snow.css'

const App=()=>{
 const {showRecruiterLogin}=useContext(AppContext)

  return(
    <div>
       {showRecruiterLogin && <RecruiterLogin/> }
      
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/applyjob/:id' element={<Applyjob/>} />
      <Route path='/applications' element={<Applications/>} />
      <Route path='/dashboard' element={<Dashboard/>} >
      {/* <Route path='addjob' element={<Addjobs/>} /> */}
      <Route path='managejobs' element={<Managejobs/>} />
      <Route path='addjob' element={<Addjobs/>} />
      <Route path='Viewapplications' element={<Viewapplications/>}/>
            
            </Route>
     </Routes>

    </div>
  )
}

export default App

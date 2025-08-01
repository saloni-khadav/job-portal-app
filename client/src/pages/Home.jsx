import React from "react";
import Navbar from "../componenets/Navbar";
import Hero from "../componenets/Hero";
import JobListing from "../componenets/JobListing";
import AppDownload from "../componenets/AppDownload";
import Footer from "../componenets/Footer";
const Home=()=>{
    return(
        <div>
            <Navbar/>
            <Hero/>
            <JobListing/>
            <AppDownload/>
            <Footer/>
        </div>
    )
}

export default Home
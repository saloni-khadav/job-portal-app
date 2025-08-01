import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCards from "./JobCards";
const JobListing=()=>{

      const {isSearched,searchFilter,setSearchFilter,jobs}=useContext(AppContext)
      const[showFilter,setshowfilter]=useState(false)
      const [currentpage,setcurrentpage]=useState(1)
      const[selectedCategories,setSelectedCategories]=useState([])
      const[selectedLocations,setSelectedLocations]=useState([])
      const[fiteredJobs,setFilteredJobs]=useState(jobs)

      const handleCategoryChange=(category)=>{
         setSelectedCategories(
            prev=>prev.includes(category)? prev.filter(c=> c!==category):[...prev,category]
         )
      }
      const handleLocationChange=(location)=>{
         setSelectedLocations(
            prev=>prev.includes(location)? prev.filter(c=> c!==location):[...prev,location]
         )
      }
      useEffect(()=>{
        const matchecategory=job=>selectedCategories.length===0 || selectedCategories.includes(job.category)
        const matcheslocation=job=>selectedLocations.length===0 || selectedLocations.includes(job.location)
        const matchestitle=job=>searchFilter.title==="" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation=job=>job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
        const newFilteredJobs=jobs.slice().reverse().filter(
            job=> matchecategory(job)&& matcheslocation(job)&& matchestitle(job)&& matchesSearchLocation(job)
        )
        setFilteredJobs(newFilteredJobs)
        setcurrentpage(1)
      },[jobs,selectedCategories,selectedLocations,searchFilter])

    return(
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            <div className="w-full lg:w-1/4 bg-white px-4">
                {
                    isSearched && (searchFilter.title !==""|| searchFilter.location !=="")&& (
                        <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600">
                            {
                                searchFilter.title && (
                                    <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded ">
                                      {searchFilter.title}
                                      <img onClick={e=> setSearchFilter(prev=>({...prev,title:""}))} className="cursor-pointer" src={assets.cross_icon}/>
                                    </span>
                                )
                            }
                              {
                                searchFilter.location && (
                                    <span className=" ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded ">
                                          {searchFilter.location }
                                            <img onClick={e=>setSearchFilter(prev=>({...prev,location:""}))} className="cursor-pointer" src={assets.cross_icon}/>
                                    </span>
                                )
                            }
                        </div>
                        </>
                    )
                }
                 
                 <button onClick={e=>setshowfilter(prev=>!prev)} className="px-6 py-1.5 border border-gra-400 lg:hidden">
                  {showFilter?"close":"Filters"}
                 </button>


                  <div className={showFilter?"":"max-lg:hidden"}>
                    <h4 className="font-medium text-lg  py-4 ">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        {
                            JobCategories.map((category,index)=>(
                                <li className="flex gap-3 items-center" key={index}>
                                 <input className="scale-125" type="checkbox" onChange={()=>handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                                 {category}
                                </li>
                            ))
                        }
                    </ul>
                  </div>


                   <div className={showFilter?"":"max-lg:hidden"}>
                    <h4 className="font-medium text-lg py-4 mt-14">Search by Location</h4>
                    <ul className="space-y-4 text-gray-600">
                        {
                            JobLocations.map((location,index)=>(
                                <li className="flex gap-3 items-center" key={index}>
                                 <input className="scale-125" type="checkbox" onChange={()=>handleLocationChange(location)} checked={selectedLocations.includes(location)} />
                                 {location}
                                </li>
                            ))
                        }
                    </ul>
                  </div>

            </div>

            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2" id='job-list'>Latest Jobs</h3>
                <p className="mb-8">Get your desired job from top companies</p>
                <div className="grid grid-cols-1 sm:grid-cols2 xl:grid-cols-3 gap-4">
                      {fiteredJobs.slice((currentpage-1)*6,currentpage*6).map((job,index)=>{
                       return <JobCards key={index} job={job}/>
                      })}
                </div>
                 
                 {fiteredJobs.length > 0 &&(
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <a href="#job-list">
                        <img onClick={()=>setcurrentpage(Math.max(currentpage-1),1)} src={assets.left_arrow_icon} alt=""/>
                        </a>
                        {Array.from({length:Math.ceil(fiteredJobs.length/6)}).map((_,index)=>(
                            <a href="#job-list" key={index}>
                                <button onClick={()=>setcurrentpage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentpage===index+1? 'bg-blue-100 text-blue-500':'text-gray-500'}`}>{index+1}</button>

                            </a>
                        ))}

                       

                         <a href="#job-list">
                        <img onClick={()=>setcurrentpage(Math.min(currentpage+1,Math.ceil(fiteredJobs.length/6)))} src={assets.right_arrow_icon} alt=""/>
                        </a>
                    </div>
                 )}

            </section>

        </div>

        
        
    )
}

export default JobListing
import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Capsules = () => {
    // https://api.spacexdata.com/v4/capsules?limit=1&offset=5

    const [capsules, setCapsules] = useState("")
    const [page, setPage] = useState(1)
    const fetchCapsules = async()=>{
            await fetch("https://api.spacexdata.com/v3/capsules?limit=10&offset=5").then((response)=> {
                console.log("response", response)
                return response.json()
            }).then((result)=> {
                setCapsules(result)
                console.log("result", result)
            }
                ).catch((error)=> console.log("Error Occurred while fetching Capsules API data", error))
    }


useEffect(()=>{
    fetchCapsules()
},[])
  return (
    <>
    {!capsules ? <LoadingSpinner />: 
      <section>
        <h1 className='heading text-center mb-5'>Capsules</h1>
        <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {capsules && capsules.map(({original_launch,capsule_serial,details,landings,missions,reuse_count,status,type},index)=>(
            <article key={index} className='articles'>
                <h2>{type}<span>{capsule_serial}</span></h2>
                <ul>
                    <li>Mission: {missions.length}</li>
                    <li>Landing:{landings}</li>
                    <li>Resued:{reuse_count}</li>
                    <li>Active: {status}</li>
                    <li>Original Launch:{original_launch.slice(0,10)}</li>
                </ul>
                <p> {details}</p>
            </article>
             ))}
        </div>
      </section>      
    } 
          

    </>
  )
}

export default Capsules

import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Rockets = () => {
    const [rockets, setRockets] = useState("")

    //Fetching Rockets data
    const fetchRockets = async()=>{
            await fetch("https://api.spacexdata.com/v3/rockets").then((response)=> {
                console.log("response", response)
                return response.json()
            }).then((result)=> {
                setRockets(result)
                console.log("result", result)
            }
                ).catch((error)=> console.log("Error Occurred while fetching Rockets API data", error))
    }

    useEffect(()=>{
        fetchRockets()
    },[])
  return (
    <>
    {!rockets ? <LoadingSpinner />: 
      <section>
        <h1 className='heading text-center mb-5'>Rockets</h1>
        <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {rockets && rockets.map(({rocket_name,description,first_flight,success_rate_pct,flickr_images,mass,height},index)=>(
            <article key={index} className='articles'>
                <img className='rocketImg' src={flickr_images[0]} alt='rocket-image'/> 
                <h2 className='px-1'>{rocket_name}</h2>
                <ul>
                    <li>First flight: {first_flight}</li>
                    <li>Height: {height.feet} ft</li>
                    <li>Weight: {mass.lb} lb</li>
                    <li>Success Rate: {success_rate_pct}%</li>
                </ul>
                <p> {description.slice(0,100)}...</p>
            </article>
             ))}
        </div>

      </section>      
        } 
       
    </>
  )
}

export default Rockets
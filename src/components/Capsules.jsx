import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Capsules = () => {

    const [capsules, setCapsules] = useState("")
    const [initialCapsules, setInitialCapsules]= useState('')
    const [page, setPage] = useState(1)

    //Fetching capsules data
    const fetchCapsules = async()=>{
            await fetch("https://api.spacexdata.com/v3/capsules").then((response)=> {
                return response.json()
            }).then((result)=> {
                setCapsules(result)
                setInitialCapsules(result)
                console.log("result", result)
            }
                ).catch((error)=> console.log("Error Occurred while fetching Capsules API data", error))
    }

    // handling pagination
    const handlePaginatin =(selectedPage)=>{
        if(selectedPage >= 1 && selectedPage <= capsules.length/6 && selectedPage !== page){
            setPage(selectedPage)
        }
    }

    // handling user selection sort
    const handleSelection = (val)=>{
        console.log("val", val)
        if(val=="All"){
            setCapsules(initialCapsules)
        }
        else{
            let filterStatus= initialCapsules.filter((elem)=> elem.status == val || elem.reuse_count==val)
            console.log("filter Status", filterStatus)
            setCapsules(filterStatus)
        }

    }
    useEffect(()=>{
        fetchCapsules()
    },[])
  return (
    <>
    {!capsules ? <LoadingSpinner />: 
      <section>
        <h1 className='heading text-center mb-5'>Capsules</h1>
        <div className='sortcapsules'>
        <div className='status '>Status: </div>
        <div className="sort-selection">
            <form action="#">
            <label htmlFor="sort"></label>
            <select name="sort" id="sort" onClick={(e)=>handleSelection(e.target.value)}>
                <option value="All">All</option>
                <option value="#" disabled></option>
                <option value="active">Active</option>
                <option value="#" disabled></option>
                <option value="retired">Retired</option>
                <option value="#" disabled></option>
                <option value="destroyed">Destroyed</option>
                <option value="#" disabled></option>
                <option value="unknown">Unknown</option>
            </select>
            </form>
        </div>
        <div className='original'>Reuse:</div>
        <div className="sort-selection">
            <form action="#">
            <label htmlFor="sort"></label>
            <select name="sort" id="sort" onClick={(e)=>handleSelection(e.target.value)}>
                <option value="All">All</option>
                <option value="#" disabled></option>
                <option value="0">Reuse 0</option>
                <option value="#" disabled></option>
                <option value="1">Reuse 1</option>
                <option value="#" disabled></option>
                <option value="2">Reuse 2</option>
            </select>
            </form>
        </div>
        </div>
        <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {capsules && capsules.slice(page * 6 - 6, page * 6).map(({original_launch,capsule_serial,details,landings,missions,reuse_count,status,type},index)=>(
            <article key={index} className='articles'>
                <h2>{type} <span>{capsule_serial}</span></h2>
                <ul>
                    <li>Mission: {missions.length}</li>
                    <li>Landing:{landings}</li>
                    <li>Reused:{reuse_count}</li>
                    <li>Active: {status}</li>
                    <li>Original Launch:{original_launch? original_launch.slice(0,10): " not mentioned"}</li>
                </ul>
                <p> {details}</p>
            </article>
             ))}
        </div>
        <div className="pagination">
        <span onClick={() => handlePaginatin(page - 1)} >◀</span>
        <span onClick={() => handlePaginatin(page + 1)} >▶</span>
      </div>

      </section>      
        } 
       
    </>
  )
}

export default Capsules

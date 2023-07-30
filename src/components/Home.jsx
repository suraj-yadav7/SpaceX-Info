import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompnayDetails } from "../store/slices/mainSlices";

const Home = () => {
  // accessing company details from mainSlices
  const company = useSelector((state)=> state.itemInfo.companyData)

  //dispatching function to fetch API data of company
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCompnayDetails());
  }, []);
  return (
    <>
    {!company ? <LoadingSpinner /> :
      <section className="showcase">
        <div className="overlay">
          <article>
            <h1 className="heading text-center capitalize">{company.name}</h1>
            <h3 className="text-center my-8 mx-40">{company.summary}</h3>
            <div className="companyDetails">
              <article>
                <h3>About Company</h3>
                <ul>
                  <li>Name: {company.name}</li>
                  <li>Founded on : {company.founded}</li>
                  <li>Headquarters: {company.headquarters.city}</li>
                  <li>Founded/CEO :{company.founder}</li>
                  <li>COO: {company.coo}</li>
                  <li>CTO:{company.cto}</li>
                  <li>Employees:{company.employees}</li>
                </ul>
              </article>
              <article>
                <h3>Company Details</h3>
                <ul>
                  <li>
                    Address: {company.headquarters.address}{", "}
                    {company.headquarters.city}
                  </li>
                  <li>State:{company.headquarters.state}</li>
                  <li>Launch Sites:{company.launch_sites}</li>
                  <li>Vehicles: {company.vehicles}</li>
                  <li>Website:<a href={company.links.website}>Link</a></li>
                  <li>Social media:<a href={company.links.twitter}>Twitter</a></li>
                  <li>Twitter:<a href={company.links.elon_twitter}>Elon handle</a></li>
                </ul>
              </article>
            </div>
          </article>
        </div>
      </section>
}
    </>
  );
};

export default Home;

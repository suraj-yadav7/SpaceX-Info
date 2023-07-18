import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [company, setCompany] = useState("");
  const fetchCompnayDetails = async () => {
    await fetch("https://api.spacexdata.com/v4/company")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("result", result);
        setCompany(result);
      })
      .catch((error) =>
        console.log("Error Occurred while fetching API Data", error)
      );
  };
  useEffect(() => {
    fetchCompnayDetails();
  }, []);
  return (
    <>
    {!company ? <LoadingSpinner /> :
      <section className="showcase">
        <div className="overlay">
          <article>
            <h1 className="heading text-center capitalize">{company.name}</h1>
            <h3 className="text-center my-5">{company.summary}</h3>
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

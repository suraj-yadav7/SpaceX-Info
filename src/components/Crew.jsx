import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Crew = () => {
  const [crewData, setCrewData] = useState("");
  const [page, setPage] = useState(1);

  const crewDetails = () => {
    fetch("https://api.spacexdata.com/v4/crew")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCrewData(result);
      })
      .catch((err) =>
        console.log("error occured while fetching crew details", err)
      );
  };

  const handlePaginatin = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= crewData.length / 8 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    crewDetails();
  }, []);

  return (
    <>
    { !crewData ? <LoadingSpinner/>: 
      <div className="card-container-wrapper">
        {crewData &&
          crewData.slice(page * 8 - 8, page * 8).map((elem) => (
            <div className="card-container">
              <div className="card-image">
                <img src={elem.image} alt="astro" />
              </div>
              <div className="card-content">
                <h3>{elem.name}</h3>
                <h4>Agency: {elem.agency}</h4>
                <h4>Status: {elem.status}</h4>
                <h4>
                  Link:{" "}
                  <a
                    style={{ outline: "2px dashed blue" }}
                    href={elem.wikipedia}
                    target="no_blank"
                  >
                    wikipedia
                  </a>
                </h4>
              </div>
            </div>
          ))}
      </div>
      }
      <div className="pagination">
        <span onClick={() => handlePaginatin(page - 1)}>◀</span>
        <span onClick={() => handlePaginatin(page + 1)}>▶</span>
      </div>
    </>
  );
};

export default Crew;

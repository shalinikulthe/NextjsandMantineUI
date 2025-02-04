
'use client'
import React, { useState, useEffect } from "react";

const ViewDetails = ({params}) => {
// console.log(params.id,"dsadkjsdkjsa")

const id= React.use(params).id
const [details, setDetails] = useState(null);

useEffect(() => {
  const fetchDetails = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const result = await response.json();
    setDetails(result); 
  };

  fetchDetails();
}, [id]);

return (
  <div className="details-container">
    {details ? (
      <>
      <h3 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>Details</h3>



        <p><strong>Name:</strong> {details.name}<br/>
        <strong>Username:</strong> {details.username}<br/>
        <strong>Email:</strong> {details.email}<br/>
        </p>
        <p>
  <strong>Address:</strong> {details.address.street}, {details.address.suite}, {details.address.city}, 
  {details.address.zipcode}, <strong>Lat:</strong> {details.address.geo.lat}, <strong>Lng:</strong> {details.address.geo.lng}
</p>



      
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
};

export default ViewDetails;

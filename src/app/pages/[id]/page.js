'use client';
import React, { useState, useEffect } from "react";

const ViewDetails = ({ params }) => {
const id = React.use(params).id;
const [details, setDetails] = useState(null);

useEffect(() => {
  const fetchDetails = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const result = await response.json();
    setDetails(result); 
  };

  fetchDetails();
}, [id]);

const cardStyle = {

  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "50px",
  width: "80%",
  maxWidth: "600px",
  margin: "20px auto",
  fontFamily: "Arial, sans-serif",
};

const headingStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "24px",
  marginBottom: "20px",
  color: "#2c3e50", 
};

const paragraphStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  
};

const boldTextStyle = {
  fontWeight: "bold",
  
};

const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", 
  margin: 0, 
  backgroundColor: '#d0d0f8'
};

return (
  <div style={wrapperStyle}>
    <div className="details-container" style={cardStyle}>
      {details ? (
        <>
          <h3 style={headingStyle}>Details</h3>
          <p style={paragraphStyle}>
            <span style={boldTextStyle}>Name:</span> {details.name}<br/>
            <span style={boldTextStyle}>Username:</span> {details.username}<br/>
            <span style={boldTextStyle}>Email:</span> {details.email}<br/>
          </p>
          <p style={paragraphStyle}>
            <span style={boldTextStyle}>Address:</span> {details.address.street}, {details.address.suite}, {details.address.city}, 
            {details.address.zipcode}, <br/><span style={boldTextStyle}>Lat:</span> {details.address.geo.lat}, 
            <span style={boldTextStyle}>Lng:</span> {details.address.geo.lng}
          </p>
        </>
      ) : (
        <p style={{ color: "#95a5a6" }}>Loading...</p> 
      )}
    </div>
  </div>
);
};

export default ViewDetails;

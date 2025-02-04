"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const LoginForm = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const HARD_CODED_USERNAME = "shalini";
const HARD_CODED_PASSWORD = "sha@1234";

const router = useRouter(); 

const handleLogin = (e) => {
  e.preventDefault();

  if (username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD) {
    alert("Login successful!");
    setErrorMessage("");
    router.push("/fetching-data"); 
  } else {
    setErrorMessage("Invalid username or password. Please try again.");
  }
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
  backgroundColor: "#f4f4f4",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "300px",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
};

const formGroupStyle = {
  marginBottom: "15px",
  textAlign: "left",
};

const labelStyle = {
  fontSize: "14px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginTop: "5px",
};

const errorMessageStyle = {
  color: "red",
  fontSize: "14px",
  marginBottom: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};

return (
  <div style={containerStyle}>
    <form style={formStyle} onSubmit={handleLogin}>
      <h2 style={titleStyle}>Login</h2>

      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="username">
          Username
        </label>
        <input
          style={inputStyle}
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="password">
          Password
        </label>
        <input
          style={inputStyle}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}

      <button style={buttonStyle} type="submit">
        Login
      </button>
    </form>
  </div>
);
};

export default LoginForm;

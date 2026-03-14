import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

return (

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 40px",
background:"#0f172a",
color:"white"
}}>

<h2>Finance Calculator</h2>

<div style={{display:"flex",gap:"25px"}}>

<Link to="/" style={{color:"white",textDecoration:"none"}}>Home</Link>

<Link to="/emi" style={{color:"white",textDecoration:"none"}}>EMI</Link>

<Link to="/sip" style={{color:"white",textDecoration:"none"}}>SIP</Link>

<Link to="/emivssip" style={{color:"white",textDecoration:"none"}}>EMI vs SIP</Link>

<Link to="/dashboard" style={{color:"white",textDecoration:"none"}}>Dashboard</Link>

</div>

</div>

);

}

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {

return(

<div style={{display:"flex",height:"100vh"}}>

{/* Sidebar */}

<div style={{
width:"220px",
background:"#111827",
color:"white",
padding:"20px"
}}>

<h2>Finance App</h2>

<br/>

<Link to="/" style={linkStyle}>Dashboard</Link>
<Link to="/emi" style={linkStyle}>EMI Calculator</Link>
<Link to="/sip" style={linkStyle}>SIP Calculator</Link>
<Link to="/emivssip" style={linkStyle}>EMI vs SIP</Link>

</div>


{/* Main Content */}

<div style={{flex:1}}>

{/* Navbar */}

<div style={{
height:"60px",
background:"#f3f4f6",
display:"flex",
alignItems:"center",
paddingLeft:"20px",
fontWeight:"bold"
}}>

Financial Planning Dashboard

</div>

{/* Page Content */}

<div style={{padding:"30px"}}>

{children}

</div>

</div>

</div>

);

}

const linkStyle={
display:"block",
color:"white",
textDecoration:"none",
marginBottom:"15px",
fontSize:"16px"
};

export default Layout;
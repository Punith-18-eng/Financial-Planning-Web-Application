import React from "react";
import { Link } from "react-router-dom";

function Home(){

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h1>Financial Calculator Dashboard</h1>
<p>Plan your investments and loans easily</p>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px",
width:"70%",
margin:"auto",
marginTop:"40px"
}}>

<div style={{
padding:"30px",
borderRadius:"12px",
boxShadow:"0 0 10px gray"
}}>
<h2>EMI Calculator</h2>
<p>Calculate loan EMI and repayment schedule</p>

<Link to="/emi">
<button>Open EMI Calculator</button>
</Link>

</div>

<div style={{
padding:"30px",
borderRadius:"12px",
boxShadow:"0 0 10px gray"
}}>
<h2>SIP Calculator</h2>
<p>Calculate SIP future value and investment growth</p>

<Link to="/sip">
<button>Open SIP Calculator</button>
</Link>

</div>

<div style={{
padding:"30px",
borderRadius:"12px",
boxShadow:"0 0 10px gray"
}}>
<h2>EMI vs SIP</h2>
<p>Compare loan EMI vs SIP investment</p>

<Link to="/emivssip">
<button>View Comparison</button>
</Link>

</div>

</div>

<br/><br/>

<Link to="/dashboard">
<button style={{
padding:"10px 20px",
fontSize:"16px"
}}>
Open Financial Dashboard
</button>
</Link>

</div>

);

}

export default Home;
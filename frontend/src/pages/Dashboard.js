import React, { useEffect, useState } from "react";

function Dashboard() {

const [sipAmount,setSipAmount] = useState(null);
const [sipYears,setSipYears] = useState(null);
const [sipFuture,setSipFuture] = useState(null);
const [emi,setEmi] = useState(null);

useEffect(()=>{

let sipA = localStorage.getItem("sipAmount");
let sipY = localStorage.getItem("sipYears");
let sipF = localStorage.getItem("sipFutureValue");
let emiV = localStorage.getItem("emiValue");

if(sipA) setSipAmount(parseFloat(sipA));
if(sipY) setSipYears(parseFloat(sipY));
if(sipF) setSipFuture(parseFloat(sipF));
if(emiV) setEmi(parseFloat(emiV));

},[]);

let totalInvestment = 0;
let returns = 0;

if(sipAmount && sipYears && sipFuture){

totalInvestment = sipAmount * sipYears * 12;
returns = sipFuture - totalInvestment;

}

const resetDashboard = () => {

localStorage.clear();

setSipAmount(null);
setSipYears(null);
setSipFuture(null);
setEmi(null);

};

return(

<div style={{textAlign:"center",marginTop:"40px"}}>

<h1>Financial Dashboard</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
width:"80%",
margin:"auto",
marginTop:"40px"
}}>

<div style={{
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>
<h3>Total SIP Investment</h3>
<h2>
{sipFuture ? "₹ "+totalInvestment.toFixed(0) : "No Data"}
</h2>
</div>

<div style={{
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>
<h3>Total Returns</h3>
<h2>
{sipFuture ? "₹ "+returns.toFixed(0) : "No Data"}
</h2>
</div>

<div style={{
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>
<h3>Future SIP Value</h3>
<h2>
{sipFuture ? "₹ "+sipFuture.toFixed(0) : "No Data"}
</h2>
</div>

<div style={{
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>
<h3>Monthly EMI</h3>
<h2>
{emi ? "₹ "+emi.toFixed(0) : "No Data"}
</h2>
</div>

</div>

<br/><br/>

<button
onClick={resetDashboard}
style={{
padding:"10px 20px",
fontSize:"16px",
borderRadius:"8px",
backgroundColor:"#ff4d4d",
color:"white",
border:"none",
cursor:"pointer"
}}
>
Reset Dashboard
</button>

</div>

);

}

export default Dashboard;
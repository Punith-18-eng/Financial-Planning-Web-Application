import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend
);

function EmiVsSip(){

const [emi,setEmi]=useState(0);
const [sipFuture,setSipFuture]=useState(0);
const [sipAmount,setSipAmount]=useState(0);

const [barChart,setBarChart]=useState(null);
const [growthChart,setGrowthChart]=useState(null);

useEffect(()=>{

const emiValue=parseFloat(localStorage.getItem("emiValue"))||0;
const sipValue=parseFloat(localStorage.getItem("sipFutureValue"))||0;
const sipMonthly=parseFloat(localStorage.getItem("sipAmount"))||0;

setEmi(emiValue);
setSipFuture(sipValue);
setSipAmount(sipMonthly);

setBarChart({
labels:["Monthly EMI","Monthly SIP","SIP Future Value"],
datasets:[
{
label:"Financial Comparison",
data:[emiValue,sipMonthly,sipValue],
backgroundColor:["#ef4444","#3b82f6","#22c55e"]
}
]
});

/* Growth Simulation */

let months=60;
let sipValues=[];
let emiValues=[];
let labels=[];

let totalSip=0;
let totalEmi=0;

for(let i=1;i<=months;i++){

totalSip+=sipMonthly;
totalEmi+=emiValue;

labels.push("Month "+i);
sipValues.push(totalSip);
emiValues.push(totalEmi);

}

setGrowthChart({
labels:labels,
datasets:[
{
label:"SIP Investment Growth",
data:sipValues,
borderColor:"green",
fill:false
},
{
label:"EMI Payment Outflow",
data:emiValues,
borderColor:"red",
fill:false
}
]
});

},[]);


let recommendation="";

if(emi && sipFuture){

if(sipFuture > emi*12){

recommendation="SIP investment may generate higher long-term wealth.";

}else{

recommendation="EMI is necessary if you are purchasing an asset such as house or vehicle.";

}

}

return(

<div style={{textAlign:"center",marginTop:"40px"}}>

<h1>EMI vs SIP Comparison</h1>

{/* Cards */}

<div style={{
display:"flex",
justifyContent:"center",
gap:"40px",
marginTop:"40px",
flexWrap:"wrap"
}}>

<div style={{
width:"320px",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>

<h2>Monthly EMI</h2>
<h1>{emi ? "₹ "+emi.toLocaleString() : "No Data"}</h1>

</div>

<div style={{
width:"320px",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>

<h2>SIP Future Value</h2>
<h1>{sipFuture ? "₹ "+sipFuture.toLocaleString() : "No Data"}</h1>

</div>

</div>

{/* Bar Chart */}

{barChart &&(

<div style={{width:"600px",margin:"auto",marginTop:"50px"}}>

<h2>Financial Comparison</h2>

<Bar data={barChart}/>

</div>

)}

{/* Growth Simulation */}

{growthChart &&(

<div style={{width:"700px",margin:"auto",marginTop:"50px"}}>

<h2>Investment Growth Simulation</h2>

<Line data={growthChart}/>

</div>

)}

{/* Insight */}

<div style={{
marginTop:"50px",
width:"60%",
margin:"auto",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>

<h2>Investment Insight</h2>

{emi && sipFuture ? (

<p style={{fontSize:"18px"}}>

If you invest <b>₹ {sipAmount}</b> monthly instead of paying EMI,
your investment could grow to  

<b> ₹ {sipFuture.toLocaleString()}</b>.

</p>

):(

<p>Please calculate EMI and SIP first.</p>

)}

</div>

{/* Recommendation */}

<div style={{
marginTop:"30px",
width:"60%",
margin:"auto",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray",
backgroundColor:"#f0fdf4"
}}>

<h2>Financial Recommendation</h2>

{recommendation ? (

<p style={{fontSize:"18px"}}>{recommendation}</p>

):(

<p>Please calculate EMI and SIP first.</p>

)}

</div>

</div>

);

}

export default EmiVsSip;
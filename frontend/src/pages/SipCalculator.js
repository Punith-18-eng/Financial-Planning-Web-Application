import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function SipCalculator(){

const [sip,setSip]=useState(5000);
const [rate,setRate]=useState(12);
const [time,setTime]=useState(10);

const [amount,setAmount]=useState(null);
const [chartData,setChartData]=useState(null);

const calculateSIP=()=>{

let monthly=parseFloat(sip);
let r=parseFloat(rate)/12/100;
let months=parseFloat(time)*12;

let futureValue =
monthly * ((Math.pow(1+r,months)-1)/r) * (1+r);

setAmount(futureValue.toFixed(2));
localStorage.setItem("sipAmount", monthly);
localStorage.setItem("sipRate", rate);
localStorage.setItem("sipYears", time);
localStorage.setItem("sipFutureValue", futureValue);

let labels=[];
let investmentValues=[];
let totalValues=[];

let totalInvestment=0;
let total=0;

for(let i=1;i<=months;i++){

total = total*(1+r)+monthly;
totalInvestment += monthly;

labels.push(i);

investmentValues.push(totalInvestment.toFixed(2));
totalValues.push(total.toFixed(2));

}

setChartData({
labels:labels,
datasets:[
{
label:"Total Investment",
data:investmentValues,
borderColor:"green",
fill:false
},
{
label:"Total Value (Investment + Returns)",
data:totalValues,
borderColor:"blue",
fill:false
}
]
});

};

return(

<div style={{textAlign:"center",marginTop:"40px"}}>

<div style={{
width:"400px",
margin:"auto",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>

<h2>SIP Calculator</h2>

<p>Monthly SIP Amount: ₹ {sip}</p>

<input
type="range"
min="500"
max="50000"
step="500"
value={sip}
onChange={(e)=>setSip(e.target.value)}
/>

<br/><br/>

<p>Expected Return (%): {rate}%</p>

<input
type="range"
min="1"
max="20"
step="0.5"
value={rate}
onChange={(e)=>setRate(e.target.value)}
/>

<br/><br/>

<p>Investment Years: {time}</p>

<input
type="range"
min="1"
max="30"
value={time}
onChange={(e)=>setTime(e.target.value)}
/>

<br/><br/>

<button onClick={calculateSIP}>
Calculate SIP
</button>

<br/><br/>

{amount && <h3>Future Value: ₹ {amount}</h3>}

{chartData && (
<div style={{width:"350px",margin:"auto"}}>
<Line data={chartData}/>
</div>
)}

</div>

</div>

);

}

export default SipCalculator;
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmiCalculator() {

const [loan, setLoan] = useState(500000);
const [rate, setRate] = useState(8);
const [time, setTime] = useState(5);

const [emi, setEmi] = useState(null);
const [chartData, setChartData] = useState(null);
const [schedule, setSchedule] = useState([]);

const calculateEMI = () => {

let principal = parseFloat(loan);
let interestRate = parseFloat(rate) / 12 / 100;
let months = parseFloat(time) * 12;

if (!principal || !interestRate || !months) {
alert("Please enter all values");
return;
}

let emiValue =
(principal * interestRate * Math.pow(1 + interestRate, months)) /
(Math.pow(1 + interestRate, months) - 1);

let balance = principal;
let table = [];

for (let i = 1; i <= months; i++) {

let interest = balance * interestRate;
let principalPaid = emiValue - interest;

balance = balance - principalPaid;

table.push({
month: i,
emi: emiValue.toFixed(2),
principal: principalPaid.toFixed(2),
interest: interest.toFixed(2),
balance: balance.toFixed(2)
});

}

setSchedule(table);
setEmi(emiValue.toFixed(2));

let totalPayment = emiValue * months;
let totalInterest = totalPayment - principal;

localStorage.setItem("loanAmount", principal);
localStorage.setItem("loanYears", time);
localStorage.setItem("emiValue", emiValue);
localStorage.setItem("totalPayment", totalPayment);
localStorage.setItem("totalInterest", totalInterest);



setChartData({
labels: ["Principal Amount", "Total Interest"],
datasets: [
{
data: [principal, totalInterest],
backgroundColor: ["#36A2EB", "#FF6384"]
}
]
});

};

const downloadExcel = () => {

const worksheet = XLSX.utils.json_to_sheet(schedule);
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Loan Schedule");

const excelBuffer = XLSX.write(workbook, {
bookType: "xlsx",
type: "array"
});

const data = new Blob([excelBuffer], {
type: "application/octet-stream"
});

saveAs(data, "EMI_Schedule.xlsx");

};

return (

<div style={{ textAlign: "center", marginTop: "40px" }}>

<div style={{
width:"450px",
margin:"auto",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 0 10px gray"
}}>

<h1>EMI Calculator</h1>

{/* Loan Amount Slider */}

<p>Loan Amount: ₹ {loan}</p>

<input
type="range"
min="10000"
max="5000000"
step="10000"
value={loan}
onChange={(e)=>setLoan(e.target.value)}
/>

<br/><br/>

{/* Interest Rate Slider */}

<p>Interest Rate: {rate}%</p>

<input
type="range"
min="1"
max="20"
step="0.1"
value={rate}
onChange={(e)=>setRate(e.target.value)}
/>

<br/><br/>

{/* Tenure Slider */}

<p>Loan Tenure: {time} Years</p>

<input
type="range"
min="1"
max="30"
value={time}
onChange={(e)=>setTime(e.target.value)}
/>

<br/><br/>

<button onClick={calculateEMI}>
Calculate EMI
</button>

<br /><br />

{emi && <h2>Monthly EMI: ₹ {emi}</h2>}

<br />

{chartData && (
<div style={{ width: "350px", margin: "auto" }}>
<Pie data={chartData} />
</div>
)}

<br /><br />

{schedule.length > 0 && (

<div>

<h2>Loan Amortization Table</h2>

<table border="1" style={{ margin: "auto", width: "100%" }}>

<thead>
<tr>
<th>Month</th>
<th>EMI</th>
<th>Principal</th>
<th>Interest</th>
<th>Balance</th>
</tr>
</thead>

<tbody>

{schedule.slice(0, 24).map((row, index) => (
<tr key={index}>
<td>{row.month}</td>
<td>{row.emi}</td>
<td>{row.principal}</td>
<td>{row.interest}</td>
<td>{row.balance}</td>
</tr>
))}

</tbody>

</table>

<br/>

<button onClick={downloadExcel}>
Download EMI Schedule (Excel)
</button>

</div>

)}

</div>

</div>

);

}

export default EmiCalculator;
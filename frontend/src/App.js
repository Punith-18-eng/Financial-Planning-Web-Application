import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EmiCalculator from "./pages/EmiCalculator";
import SipCalculator from "./pages/SipCalculator";
import EmiVsSip from "./pages/EmiVsSip";
import Dashboard from "./pages/Dashboard";

import Layout from "./layout/Layout";

function App(){

return(

<Router>

<Layout>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/emi" element={<EmiCalculator/>} />
<Route path="/sip" element={<SipCalculator/>} />
<Route path="/emivssip" element={<EmiVsSip/>} />

</Routes>

</Layout>

</Router>

);

}

export default App;
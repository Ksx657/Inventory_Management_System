import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";

import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes//monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";

import Home from "./scenes/home/home";
import HomeLayout from "../../client/src/scenes/homelayout";
import Login from "./scenes/user/login";
import Register from "./scenes/user/register";
import AddProduct from "./scenes/products/addproduct";
import AddCustomer from "./scenes/customers/addcustomer";
import AddTransaction from "./scenes/transactions/addtransaction";
import UpdateProduct from "./scenes/products/updateproduct";
import UpdateCustomer from "./scenes/customers/updatecustomers";
import TaskList from "./scenes/task/TaskList"



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route element={<HomeLayout/>}>
              <Route path="/"element= {<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
              <Route path="/addcustomer" element={<AddCustomer />} />
              <Route path="/updatecustomer/:customerId" element={<UpdateCustomer/>}/>
              <Route path="/addtransaction" element={<AddTransaction />} />
              <Route path="/task" element={<TaskList/>}/>
           
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
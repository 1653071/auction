import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navigation from "./components/Bars/NavigationBar/Navigation";

import HomePage from "./container/HomePage/HomePage";
import Listing from "./container/Listing/Listing";
import SinglePage from "./container/SinglePage/SinglePage";
import { Layout } from "antd";
import Invidual from "./container/Invidual/Invidual";
import SearchPage from "./container/SearchPage/SearchPage";
import JoinSeller from "./container/JoinSeller.js/JoinSeller";
import SuccessJoinSeller from "./container/SuccessJoinSeller/SuccessJoinSeller";
import SellerPage from "./container/SellerPage/SellerPage";
import AllProduct from "./container/SellerPage/AllProduct/AllProduct"
import AuctionWinner from "./container/SellerPage/AuctionWinner/AuctionWinner";
import AppContext from './context/ProductContext'
import Login from "./container/Login/Login";
const { Header, Footer, Sider, Content } = Layout;
function PrivateRoute({ children, ...rest }) {
  return <Route {...rest} element={children}></Route>;
}
function App() {
  return (
    
      <Router>
      <Navigation />
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/listing" element={<Listing />} />
            <Route exact path="/listing/:id" element={<SinglePage />} />
            <Route exact path="/invidual" element={<Invidual />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/joinseller" element={<JoinSeller />} />
            <Route
              exact
              path="/successjoinseller"
              element={<SuccessJoinSeller />}
            />

            <Route exact path="/seller/*"  element={<SellerPage />} />
               
          
         
          </Routes>
        </div>
      </div>
      <Footer style={{ minHeight: "50px" }}>Footer</Footer>
    </Router>

  );
}

export default App;

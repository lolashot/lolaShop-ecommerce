import React, { Fragment } from 'react';
import "../../App.css"
// import {  Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Search from './Search'
const Header = ()=> {
    return (
        <div>
<Fragment>
<nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={'/'}>
          <img src="images/shopit_logo.png" alt=''/>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      {/* <Routes>
        <Route path={`search/:id`} element={ <Search />} />
      </Routes> */}
      
    
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
 
</Fragment>
        </div>
    )
}
export default Header


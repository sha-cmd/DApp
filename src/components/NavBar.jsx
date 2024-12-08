import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './NavBar.css'
import bank from '../bank.png'

function NavBar(props) {
    let loadData =  props.account // JSON.parse(localStorage.getItem('sharedData'))
    //const tetherBalance =  JSON.parse(localStorage.getItem('tetherBalance'))
    //const tetherBalance = store.getData("tetherBalance")
    return (
        <>
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor: 'black', height:'50px'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color:'white'}}>
                    <img className='d-inline-bloack align-top' alt="bank image"  src={bank} width='50'/>
                    &nbsp; DAPP Yield Staking (Decentralized Banking) </a>

                <ul className="navbar-nav px-3">
                     <li className="text-nowrap d-none nav-item d-sm-block">
                         <small style={{color:'white'}}>
                             Account Number: {loadData}
                         </small>
                     </li>
                </ul>
            </nav>
            <p>Hello</p>
        </>
    );
}


export default NavBar;
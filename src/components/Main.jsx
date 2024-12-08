import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Main.css'
import bank from '../bank.png'
import tether from '../tether.png'
import Web3 from 'web3';

function Main(props) {
    const [input, setInput] = useState('');
    const handleChange = (e) => {
        setInput(e.target.value);
    };
    return (
        <div className='mt-3' id='content'>
            <table className="table text-center">
                <thead>
                <tr>
                    <th scope='col'>Staking Balance</th>
                    <th scope='col'>Reward Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{Web3.utils.fromWei(props.stakingBalance, "ether")} USDT</td>
                    <td>{Web3.utils.fromWei(props.rwdBalance, "ether")} RWD
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='card mb-2'>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    let amount
                    console.log("amount form :", input)
                    console.log("amount form :", typeof input)
                    amount = input
                    amount = Web3.utils.toWei(amount, "ether")
                    props.stakeTokens(amount)
                }} className="mb-3">
                    <div style={{borderSpacing: '0 1em'}}>
                        <label className='float-start' style={{marginLeft: '15px'}}>
                            <b>Stake Tokens</b>
                        </label>
                        <span className='float-end' style={{marginRight: '8px'}}>
                              Balance:{Web3.utils.fromWei(props.tetherBalance, "ether")}
                          </span>
                        <div className='input-group mb-4'>
                            <input value={input}
                                   onChange={handleChange} type='text' placeholder='0' required/>
                            <div className='input-group-open'>
                                <div className='input-group-text'>
                                    <img src={tether} height='32px' alt='tether'/>
                                    &nbsp; &nbsp;&nbsp;USDT
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary btn-lg'>DEPOSIT</button>
                </form>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    props.unstakeTokens()
                }} className="mb-3">
                    <button type='submit' id="withdraw" className='btn btn-primary btn-lg'>WITHDRAW
                    </button>


                </form>

                {/*
                <div className='btn btn-primary btn-lg'>AIRDROP <Airdrop
                    stakingBalance={props.stakingBalance}
                    unstakeTokens={props.unstakeTokens}
                />
                </div>*/}
            </div>
        </div>
    );
}

export default Main;

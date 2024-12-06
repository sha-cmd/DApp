import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Web3 from 'web3';

// Utilisation

function App() {

    const [data, setData] = useState({
        account: '0x0', tether: {}, rwd: {}, decentralBank: {},
        tetherBalance: '0', rwdBalance: '0', stakingBalance: '0',
        loading: true
    })

    const [isLoading, setIsLoading] = useState(false);
    const [web3, setWeb3] = useState(null)
    const [tether, setTether] = useState(null)
    const [rwd, setRWD] = useState(null)
    const [decentralBank, setDecentralBank] = useState(null)
    useEffect(() => {
//        const initializeApp = async () => {
        const loadWeb3 = async () => {
            // Vérifier si MetaMask est installé
            if (window.ethereum) {
                try {
                    // Demander la connexion du wallet
                    await window.ethereum.request({method: 'eth_requestAccounts'})

                    // Initialiser Web3
                    const web3Instance = new Web3(window.ethereum)
                    setWeb3(web3Instance)

                    // Récupérer le compte connecté
                    const accounts = await web3Instance.eth.getAccounts()
                    //console.log("Accounts : ",accounts)//
                    //store.setData("account", accounts[0])
                    await setData(data => ({
                        ...data, // Spread the previous car state
                        account: accounts[0]  // Update the year to 2025
                    }));
                    //console.log(accounts);

                    const networkId = await web3Instance.eth.net.getId()
                    //Load Tether Contract
                    const tetherData = Tether.networks[networkId]
                    if (tetherData) {
                        const tether = new web3Instance.eth.Contract(Tether.abi, tetherData.address)
                        let tetherBalance = tether.methods.balanceOf(accounts[0]).call()
                        const balance = (await tetherBalance).toString()
                        setData(data => ({
                            ...data, // Spread the previous car state
                            tetherBalance: balance  // Update the year to 2025
                        }));
                        setData(data => ({
                            ...data, // Spread the previous car state
                            tether: tether  // Update the year to 2025
                        }));
                    } else {
                        window.alert("Tether token not deployed to the network.")
                    }
                    const rwdData = RWD.networks[networkId]
                    if (rwdData) {
                        const rwd = new web3Instance.eth.Contract(RWD.abi, rwdData.address)
                        let rwdBalance = rwd.methods.balanceOf(accounts[0]).call()
                        const balance = (await rwdBalance).toString()
                        setData(data => ({
                            ...data, // Spread the previous car state
                            rwdBalance: balance  // Update the year to 2025
                        }));
                        setData(data => ({
                            ...data, // Spread the previous car state
                            rwd: rwd  // Update the year to 2025
                        }));
                    } else {
                        window.alert("RWD token not deployed to the network.")
                    }
                    // Load DecentralBanck
                    const decentralBankData = DecentralBank.networks[networkId]
                    if (decentralBankData) {
                        const decentralBank = new web3Instance.eth.Contract(DecentralBank.abi, decentralBankData.address)
                        let decentralBankBalance = decentralBank.methods.stakingBalance(accounts[0]).call()
                        const balance = (await decentralBankBalance).toString()
                        setData(data => ({
                            ...data, // Spread the previous car state
                            stakingBalance: balance  // Update the year to 2025
                        }));
                        setData(data => ({
                            ...data, // Spread the previous car state
                            decentralBank: decentralBank  // Update the year to 2025
                        }));
                    } else {
                        window.alert("DecentralBank token not deployed to the network.")
                    }
                } catch (error) {
                    console.error("Erreur de connexion au wallet:", error)
                    window.alert("Erreur de connexion au wallet");
                } finally {
                    setIsLoading(true)
                }
            } else {
                console.log("Veuillez installer MetaMask!")
                window.alert("Veuillez installer MetaMask!");
            }

        }
        loadWeb3()
    },     []);


    //localStorage.setItem('sharedData', JSON.stringify(data));
    console.log("Accounts data 3 : ", data.account)
    console.log("Accounts data tether : ", data.tetherBalance)
    console.log("Accounts data rwd : ", data.rwdBalance)
    console.log("Accounts data decentralBank : ", data.stakingBalance)
    console.log("Load", isLoading)
    let stakeTokens
    stakeTokens = (amount) => {
        setIsLoading(false)
        console.log("amount stak : ", amount)
        console.log("address stak : ", data.decentralBank._address)
        data.tether.methods.approve(data.decentralBank._address, amount).send({from: data.account}).on('transactionHash', (hash) =>{

            data.decentralBank.methods.depositTokens(amount).send({from: data.account}).on('transactionHash', (hash) => {
                setIsLoading(true)
            })

        })

    }
    let unstakeTokens
    unstakeTokens = (amount) => {
        setIsLoading(false)
            data.decentralBank.methods.unstakeTokens(amount).send({from: data.account}).on('transactionHash', (hash) => {
                setIsLoading(true)
            })
    }

    let content
    // Our React Code Goes in Here!
    isLoading ? content =<Main
        tetherBalance={data.tetherBalance}
        rwdBalance={data.rwdBalance}
        stakingBalance={data.stakingBalance}
        account={data.account}
        stakeTokens = {stakeTokens}
        unstakeTokens = {unstakeTokens}
    /> : content = <p id='loader' className='text-center' style={{margin:'30px'}}>LOADING PLEASE...</p>
    return (
        <div>

            <div>
            <NavBar account={data.account}/>
            </div>
            <div className='container-fluid mt-5' id='root'>
                <div className='row'>
                        <div>{content}</div>
                </div>
            </div>
            </div>
    );
}


export default App;
import React, {Component, useEffect, useState} from "react";

function Airdrop (props) {
    let [value, setValue] = useState({
                                     time: {}, seconds: 20
                                 })
    let [seconds, setSeconds]= useState();
    let [time, setTime]= useState(null);
    let [timer, setTimer]= useState(0);
    setTimer = 0
    const handleChange = (e) => {
        setInput(e.target.value);
    };
    let item = 1
    let startTimer
    startTimer = () => {
        console.log("Timer", value.time);
        if (timer === 0 && value.seconds > 0) {
            console.log("Entered", value.time);
            timer = setInterval(() => {countDown()}, 1000);
        }else{
            console.log("submit");
            if( props.stakingBalance > 0 && value.seconds === 0 && item === 1) {
                props.unstakeTokens()
                console.log("unstakeTokens")
                item = item + 1
            }
        }
    };
    const countDown = () => {
        let seconds_ = value.seconds - 1;
        console.log("seconds_", seconds_);
        setValue(value => ({
            ...value,
            seconds: seconds_
        }));
        let time_ = secondsToTime(seconds_);
        console.log("time_",time_);
        setValue(value => ({
            ...value,
            time: time_ 
        }));
        if(seconds === 0){
            clearInterval(timer);
        }
    };
    //constructor(props) {
      //  super(props);
    //    this.state = {time: {}, seconds: 5};
      //  this.timer = 0;
    //    this.startTime = this.startTime.bind(this);
      //  this.countDown = this.startTime.bind(this);


  //  }
    let secondsToTime
     secondsToTime = (secs) => {
        let hours, minutes, seconds;
        hours = Math.floor(secs / (60 * 60));

        let devisor_for_minutes = secs % (60*60)
        minutes = Math.floor(devisor_for_minutes / 60);

        let devisor_for_seconds = secs % 60
        seconds = Math.floor(devisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        }
        return obj;
    };

    let componentDidMount
    componentDidMount = () => {
        console.log("Comp seconds", value.seconds)
        let timeLeftVar = secondsToTime(seconds)
        setValue(value => ({
            ...value,
            time: timeLeftVar
        }));
    }
    let airdropReleaseTokens = () => {
        let stakingB = props.stakingBalance
        if(stakingB >= "10000000000000000000"){
            startTimer()
            console.log("OK")
        }

    }

    return (
        <>
            {airdropReleaseTokens()}
            <div  style={{color:'black'}}>{value.time.m}:{value.time.s}
                {startTimer()}</div>
        </>
);
}
export default Airdrop;

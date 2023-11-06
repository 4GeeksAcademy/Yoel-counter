import React, { useState, useEffect } from "react";

export const Counter = () => {
    const [secondUnit, setSecondUnit] = useState(0);
    const [secondTens, setSecondTens] = useState(0);
    const [minuteUnit, setMinuteUnit] = useState(0);
    const [minuteTens, setMinuteTens] = useState(0);
    const [hourUnit, setHourUnit] = useState(0);
    const [hourTens, setHourTens] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [timer, setTimer] = useState(false);
    const [inputHour, setInputHour] = useState(0);
    const [inputMinute, setInputMinute] = useState(0);
    const [inputSecond, setInputSecond] = useState(0);

    
    useEffect(() => {
        if(isOn && !timer){
            const interval = setInterval(() => {
                setSecondUnit((prevSecondUnit) => prevSecondUnit + 1);
            }, 1000);
           return () => {
            clearInterval(interval); 
            }
        }    
    },[isOn]);

    useEffect(() => {
        if(secondUnit === 10 && !timer){
            setSecondUnit(0);
            setSecondTens((prevSecondTens) => prevSecondTens + 1);
        }

        if (secondTens === 6 && !timer) {
            setSecondTens(0);
            setMinuteUnit((prevMinuteUnit) => prevMinuteUnit + 1);
        }
    
        if (minuteUnit === 10 && !timer) {
            setMinuteUnit(0);
            setMinuteTens((prevMinuteTens) => prevMinuteTens + 1);
        }
    
        if (minuteTens === 6 && !timer) {
            setMinuteTens(0);
            setHourUnit((prevHourUnit) => prevHourUnit + 1);
        }
    
        if (hourUnit === 10 && !timer) {
            setHourUnit(0);
            setHourTens((prevHourTens) => (prevHourTens + 1) % 10);
        }
    }, [secondUnit, secondTens, minuteUnit, minuteTens, hourUnit]);

    useEffect(() => {
        if(isOn && timer){
            const interval = setInterval(() => {
                setSecondUnit((prevSecondUnit) => prevSecondUnit - 1);
            }, 1000);
           return () => {
            clearInterval(interval); 
            }
        }    
    },[isOn]);

    useEffect(() => {
        if(secondUnit === -1 && timer){
            setSecondUnit(9);
            setSecondTens((prevSecondTens) => prevSecondTens - 1);
        }

        if (secondTens === -1 && timer) {
            setSecondTens(5);
            setMinuteUnit((prevMinuteUnit) => prevMinuteUnit - 1);
        }
    
        if (minuteUnit === -1 && timer) {
            setMinuteUnit(9);
            setMinuteTens((prevMinuteTens) => prevMinuteTens - 1);
        }
    
        if (minuteTens === -1 && timer) {
            setMinuteTens(5);
            setHourUnit((prevHourUnit) => prevHourUnit - 1);
        }
    
        if (hourUnit === -1 && timer) {
            setHourUnit(9);
            setHourTens((prevHourTens) => (prevHourTens - 1));
        }
    }, [secondUnit, secondTens, minuteUnit, minuteTens, hourUnit]);

    useEffect(() =>{
        if(timer && isOn && secondUnit === 0 && secondTens === 0 && minuteUnit === 0 && minuteTens === 0 && hourUnit === 0 && hourTens === 0){
            toggleTemp()
            setTimeout(() => {  
                const audio = document.getElementById("alarm");
                audio.play();
                alert("Time!") 
              }, 1);
            
            ;
        }
    });

    function toggleTemp(){
        setIsOn(!isOn)
    };

    function reset(){
        setSecondUnit(0);
        setSecondTens(0);
        setMinuteUnit(0);
        setMinuteTens(0);
        setHourUnit(0);
        setHourTens(0);
    };

    function toggleTimer(){
        setTimer(!timer)
    }

    function handleInputHourChange(event) {
        const newHour = Number(event.target.value);
        setInputHour(newHour);
        setHourTens(Math.floor(newHour / 10));
        setHourUnit(newHour % 10);
    }
    
    function handleInputMinuteChange(event) {
        const newMinute = Number(event.target.value);
        setInputMinute(newMinute);
        setMinuteTens(Math.floor(newMinute / 10));
        setMinuteUnit(newMinute % 10);
    }
    
    function handleInputSecondChange(event) {
        const newSecond = Number(event.target.value);
        setInputSecond(newSecond);
        setSecondTens(Math.floor(newSecond / 10));
        setSecondUnit(newSecond % 10);
    }



   return (
    <div>
        <div className="clock-container">
            <div className="black-square icon"><i className={!timer ? "fa-regular fa-clock" : "fa-solid fa-clock-rotate-left"} style={isOn ? {color: "green"} : {color: "red"}}></i></div>
            <div className="black-square hour-tens"><p>{hourTens}</p></div>
            <div className="black-square hour-unit"><p>{hourUnit}</p></div>
            <div className="black-square dots"><p>:</p></div>
            <div className="black-square minute-tens"><p>{minuteTens}</p></div>
            <div className="black-square minute-unit"><p>{minuteUnit}</p></div>
            <div className="black-square dots">:</div>
            <div className="black-square second-tens"><p>{secondTens}</p></div>
            <div className="black-square second-unit"><p>{secondUnit}</p></div>
        </div>
        <div className="buttons-container">
            <button id="toggleOn" onClick={toggleTemp} style={isOn ? {background: "red"} : {background: "green"}}>{isOn ? "Stop" : "Start"}</button>
            <button id="reset" onClick={reset}>Reset</button>

        </div>    
        <div className="timer-setter-container">
            <button id="toggleTimer" onClick={toggleTimer} style={timer ? {background: "green"} : {background: "black"}}>{!timer ? "Timer off" : "Timer on"}</button>
            <form>
                    <label for="hour-setter">Hours</label>
                    <input type="number" min={0} max={99} className="timer-setter" name="hour-setter" value={inputHour} onChange={handleInputHourChange} disabled = {!timer}></input>
                    <label for="minute-setter">Minutes</label>
                    <input type="number" min={0} max={59} className="timer-setter" name="minute-stter" value={inputMinute} onChange={handleInputMinuteChange} disabled = {!timer}></input>
                    <label for="second-setter">Seconds</label>
                    <input type="number" min={0} max={59} className="timer-setter" name="second-setter" value={inputSecond} onChange={handleInputSecondChange} disabled = {!timer}></input>
            </form>
                
        </div>
        <audio id="alarm">
            <source src="/alarm.mp3" type="audio/mpeg"/>
        </audio>
    </div>
   )
}
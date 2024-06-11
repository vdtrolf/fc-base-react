import React, {useState,useEffect} from "react";

import Button from "./Button.jsx";
import logo from "./images/TTP-logo2.png";

import speedo_1 from "./images/speedo-1.png";
import speedo_2 from "./images/speedo-2.png";
import speedo_3 from "./images/speedo-3.png";
import speedo_4 from "./images/speedo-4.png";
import speedo_5 from "./images/speedo-5.png";

import * as constants from "./Constants.jsx";


export default function Navbar(props) {

  const { runningState, environment, admin, onStartButton, onOnceButton, onStopButton, onPlusButton, onCloneButton, onAdminButton } = props;

    const [speedoImg,setSpeedoImg] = useState(speedo_1);  
    const [month,setMonth] = useState("Spring");  

    const speedo = [speedo_1,speedo_1,speedo_2,speedo_3,speedo_4,speedo_5]
    const monthes = ["Spring","Summer","Autumn","Winter"]
     
    useEffect(() => {
      setSpeedoImg(speedo[environment.evolutionSpeed])
      setMonth(monthes[Math.floor(environment.year * 4) % 4])
    },[environment.evolutionSpeed,environment.year])    

  return (
    <div className="Navbar">
      <img src={logo} alt="logo" width="180px" height ="48px" />
      <div className="NavbarInfo" >
         {environment.name && <div className="NameArea" key="div7" style={{zIndex:'50', pointerEvents:'none'}}>
            <div id="environmentName">{environment.name}</div>
            <div id="score">{month}.{Math.round(environment.year)}</div>
          </div>}
      </div>
      {runningState !== constants.NOT_STARTED && <div className="NavbarTemp" >
        <img key="99999998" src={speedoImg} width="50px" height ="42px" alt="" transition= "0.5s" />
      </div>}
      {runningState === constants.NOT_STARTED && <div>{environment.evolutionSpeed}</div> }

      { runningState !== constants.NOT_STARTED && <div className="ButtonArea">
        {runningState === constants.ENDED &&<div>&nbsp;</div>}
        {runningState === constants.RUNNING &&<div>&nbsp;</div>}
        {runningState === constants.RUNNING && <Button className="ButtonStop" onClickHandler={onStopButton}>&nbsp;</Button>}
        {runningState === constants.PAUSED && <Button className="ButtonOnce" onClickHandler={onOnceButton}>&nbsp;</Button>}
        {runningState === constants.PAUSED && <Button className="ButtonStart" onClickHandler={onStartButton}>&nbsp;</Button>}
        <Button className="ButtonPlus" onClickHandler={onPlusButton}>&nbsp;</Button>
        <Button className="ButtonClone" onClickHandler={onCloneButton}>&nbsp;</Button>
        <Button className={admin?"ButtonAdminOn":"ButtonAdmin"} onClickHandler={onAdminButton}>&nbsp;</Button>
      </div> }
    </div>
  );
}

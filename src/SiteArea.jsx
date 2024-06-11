import React from "react";
import WeatherArea from "./WeatherArea.jsx";
import StateArea from "./StateArea.jsx";
import Device from "./Device.jsx";
import Service from "./Service.jsx";
import Penguin from "./Penguin.jsx";
import Fish from "./Fish.jsx";
import Garbage from "./Garbage.jsx";
import neutral from "./images/TapTapBackNeutral.png";

import * as constants from "./Constants.jsx";


export default function EnvironmentArea(props) {

  const {runningState, environment, onTileClick, showBalloons, illuminatedKey, dempedPenguins, tileSize, gridClass, moveSpeed } = props;
  const weather = environment.weather;

  const debug = false;
  
  if (debug) {
    console.log("=== Environmentarea " + tileSize  + "==========================");
    console.dir(environment);
    console.log("=============================================");
  }

  if (runningState !== constants.NOT_STARTED) {
    return (
      <>
        <div>
          <div className="WaveArea" key="div1" ><img src={neutral} alt="" /></div> 
          <div className={gridClass} key="div2" style={{zIndex:'20'}} >
            {environment.Devices && environment.Devices.map(Device =><Device key={Device.key} DeviceType={Device.type} DeviceAngle={Device.angle} DeviceVpos={Device.vpos} DeviceHpos={Device.hpos} onTileClick={onTileClick} tileSize={tileSize}/>)} 
          </div>
          <div className="FreeArea" key="div4" style={{zIndex:'40', pointerEvents:'none'}} >
            {environment.penguins && environment.penguins.map(penguin =><Penguin key={penguin.key} showBalloons={showBalloons} penguin={penguin}  
          illuminatedKey={illuminatedKey} dempedPenguins={dempedPenguins} tileSize={tileSize} moveSpeed={moveSpeed}/>)} 
          </div>
          <div className="ServiceArea" key="div7" style={{zIndex:'32', pointerEvents:'none'}} >
            {environment.Services && environment.Services.map(Service =><Service key={Service.key} ServiceVpos={Service.vpos} ServiceHpos={Service.hpos} ServiceAge={Service.age} ServiceHasShowel={Service.hasShowel} tileSize={tileSize} />)} 
          </div>
          <div className="FishArea" key="div5" style={{zIndex:'33', pointerEvents:'none'}} >
            {environment.fishes && environment.fishes.map(fish =><Fish key={fish.key} fishVpos={fish.vpos} fishHpos={fish.hpos} fishDirection={fish.direction} fishLastDirection={fish.lastDirection} fishOnHook={fish.onHook} tileSize={tileSize} moveSpeed={moveSpeed}/>)} 
          </div>
          <div className="GarbageArea" key="div6" style={{zIndex:'45', pointerEvents:'none'}} >
            {environment.garbages && environment.garbages.map(garbage =><Garbage key={garbage.key} garbageVpos={garbage.vpos} garbageHpos={garbage.hpos} garbageKind={garbage.kind} tileSize={tileSize} />)} 
          </div>
          
          <WeatherArea weather={weather} runningState={runningState}/>
          {(runningState===constants.ENDED) && <StateArea runningState={runningState} />}
        </div>
      </>
    )
  } else {
    return <div className="EnvironmentArea">{props.children}</div>;
  }
}

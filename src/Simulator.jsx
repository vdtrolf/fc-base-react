import React, {useState,useEffect}  from "react";

import "./App.css";
import Startup from "./Startup.jsx"
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Details from "./Details.jsx";
import Adminbar from "./Adminbar.jsx";
import EnvironmentArea from "./EnvironmentArea.jsx";
import Footer from "./Footer.jsx";
import convert from "./Fetchserver.js"

import Environment from "./data/environment"
import Device from "./data/device"
import Service from "./data/service"

import * as constants from "./Constants.jsx";
import {  COMMAND_EATING,  DIRECTION_NONE } from "./utils/constants.js";

export default function App() {

  const urls= [{name:"aws",url:"https://ayv5bav97c.execute-api.us-east-1.amazonaws.com/Prod/"},
  {name:"pytap", url:"http://85.215.204.50/pytap"},
  {name:"local", url:"http://127.0.0.1:5000/"},
  {name:"typtap", url:"http://localhost:8081/typtap/"}]

  const [showBalloons,setShowBalloons] = useState(false);
  const [environment,setEnvironment] = useState({});
  const [baseURL,setBaseURL] = useState({name:"typtap", url:"http://localhost:8081/typtap/"});
  const [illuminatedKey,setIlluminatedKey] = useState(0);
  const [selectedKey,setSelectedKey] = useState(0);
  const [boardSize,setBoardSize] = useState(9)
  const [tileSize,setTileSize] = useState(64);
  const [gridClass,setGridClass] = useState('GridClass64');
  const [environmentsList,setEnvironmentsList] = useState([]);
  
  useEffect(() => {
      var intervalId = 0;
      if (runningState === constants.RUNNING && environment && environment.id > 0 ) {
        intervalId = setInterval( () => {

          let slicedEnvironment = environment.becomeOlder()
          
          setMovedPenguins([]);
            
          slicedEnvironment.penguins.forEach(penguin => {
            if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
          });

          if ( ! slicedEnvironment.running) {
            setRunningState(constants.ENDED)
          } 

          if (slicedEnvironment.environments) {
            setEnvironmentsList(slicedEnvironment.environments);
          }
          setEnvironment(slicedEnvironment)
        
        },renewSpeed)
      }  else {
        clearInterval(intervalId);
      } 
      
      return () => {
        clearInterval(intervalId);
      }

  },[runningState,environment,baseURL,renewSpeed,selectedKey]);

  const handleCreateButton = (size,difficulty) => {

    console.log("received values " + size + " " + difficulty) 

    setRunningState(constants.RUNNING)   
    setBoardSize(size);
    setBoardDificulty(difficulty);
    setSelectedKey(0)
    getNewEnvironment(baseURL.url,size,difficulty)
    .then((newEnvironment ) => {

      console.dir(newEnvironment)



      if (newEnvironment.size === 6) {
        setTileSize(96);
        setGridClass('GridArea96');
      } else if (newEnvironment.size === 9) {
        setTileSize(64);
        setGridClass('GridArea64');
      } else {
        setTileSize(48);
        setGridClass('GridArea48');
      }  
      setEnvironment(newEnvironment)
    }); 
  }

  const handlePlusButton = () => {
    setRunningState(constants.NOT_STARTED);
  } 

  const handleTileClick = (vpos,hpos) => {

    const aPenguin = environment.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
    console.log("TILE CLICKED AT " + vpos + "/" + hpos + " " + selectedKey + " " + aPenguin);

    if (selectedKey > 0) {
      if (aPenguin) { 
        if (aPenguin.key === selectedKey) {
          setSelectedKey(0);
          setIlluminatedKey(0);
        } else {
          setSelectedKey(aPenguin.key);
          setIlluminatedKey(aPenguin.key);
        }
      } else  {
        const selectedPenguin = environment.penguins.find(penguin => penguin.key === selectedKey );
        if (selectedPenguin && ((Math.abs(vpos - selectedPenguin.vpos) === 1 && hpos === selectedPenguin.hpos) 
               || (Math.abs(hpos - selectedPenguin.hpos) === 1 && vpos === selectedPenguin.vpos))) {
          setEnvironment(environment.transmitCommands(selectedPenguin,vpos,hpos))
         setMovedPenguins([])
        }
      }
    } else if (aPenguin) {
      setSelectedKey(aPenguin.key);
      setIlluminatedKey(aPenguin.key);      
    }
  } 

  const handlUserInput = (user,pwd) => {
    setAdmin(user === "admin" && pwd==="admin")
    setSidebar(false);
    setAdminbar(false);
  }

  const handleSetBalloons = (checkBalloons) => {
    console.log("BALLOOMS " + checkBalloons);
    setShowBalloons(checkBalloons);
  }

  return (
    <div className="App">
      <Sidebar admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onEnvironmentSelect={handleEnvironmentSelect} onEnvironmentDelete={handleEnvironmentDelete} environmentId={environment.id} environmentsList={environmentsList} sidebar={sidebar}/>
      <Adminbar showBalloons={showBalloons} admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onLogoutButton={handleLogoutButton} onSetBalloons={handleSetBalloons} adminbar={adminbar} urls={urls} onURLSelect={handleURLSelect} onUserInput={handlUserInput}/>
      <Navbar runningState={runningState} environment={environment} admin={admin} onStartButton={handleStartButton} onOnceButton={handleOnceButton} onStopButton={handleStopButton} onPlusButton={handlePlusButton} onCloneButton={handleCloneButton} onAdminButton={handleAdminButton} />
      <div className="WorkArea">
        {runningState === constants.NOT_STARTED && <Startup originalSize={boardSize} originalDifficulty={boardDifficulty} onCreateButton={handleCreateButton}/>}
        {runningState !== constants.NOT_STARTED && <EnvironmentArea showBalloons={showBalloons} runningState={runningState} environment={environment} onTileClick={handleTileClick} illuminatedKey={illuminatedKey} dempedPenguins={dempedPenguins} tileSize={tileSize} gridClass={gridClass} moveSpeed={moveSpeed}/>}
        {runningState !== constants.NOT_STARTED && selectedKey === 0 && (<Footer penguins={environment.penguins} onPenguinEnter={handlePenguinEnter} onPenguinLeave={handlePenguinLeave} onPenguinClick={handlePenguinClick} illuminatedKey={illuminatedKey}/>)}
        {runningState !== constants.NOT_STARTED && selectedKey > 0 && (<Details penguinObj={environment.penguins.find(penguin => penguin.key === selectedKey)} onDetailsCloseButton={handleDetailsCloseButton} onEatButton={handleEatButton}/> )}
        {runningState === constants.NOT_STARTED && <div className="Footer">&nbsp;</div>}
      </div>
    </div>
  );
}

const getNewEnvironment = async (baseURL,boardSize,boardDifficulty) => {
  const environmentData = await convert(baseURL + "create?size=" + boardSize + "&difficulty=" + boardDifficulty)
  return extractEnvironmentData(environmentData);
}

const refreshEnvironmentsList = async (baseURL,environmentToDelete=0)  => {
  if (environmentToDelete > 0) {
    const environmentsListData = await convert(baseURL + "deleteEnvironment?environmentId=" + environmentToDelete );
    return environmentsListData;
  } else {
    const environmentsListData = await convert(baseURL + "environments" );
    
    return environmentsListData;
  }
}

const extractEnvironmentData = (environmentData) => {


  console.log("================= ISLANDDATA =============")
  console.dir(environmentData)
  console.log("================= ISLANDDATA =============")


  const Devices = [];
  const Services = [];
  const environments = [];

  if (environmentData) {

    environmentData.Devices.forEach(Devicesline => {
      Devicesline.forEach(Device => {   
        Devices.push( new Device( Device.id,
          Device.key,
          Device.vpos,
          Device.hpos,
          Device.type,
          Device.beingBuilt,
        )); 
      });
      // Devices.push(aline)
    });

    // console.dir(fishes)

    if (environmentData.Services) { 
      environmentData.Services.forEach(Service => {
        Services.push( new Service ( Service.id,
          Service.key,
          Service.vpos,
          Service.hpos,
          Service.hasShowel,
          Service.age,
          Service.isTaken))
          
      }); 
    }

    if (environmentData.environments) { 
      for (const thisEnvironment in environmentData.environments) {
        let anEnvironment = environmentData.environments[thisEnvironment]
        environments.push({key: anEnvironment.key,
                      id: anEnvironment.id, 
                      name: anEnvironment.name,
                      year: anEnvironment.year,
                      size: anEnvironment.size})
                
      }; 
    } 

    return new Environment(environmentData.id,
                      environmentData.key,
                      environmentData.size,
                      environmentData.difficulty,
                      environmentData.name,
                      environmentData.counter,
                      environmentData.weather,
                      environmentData.weatherAge,
                      environmentData.year,
                      environmentData.points,
                      environmentData.plasticControl,
                      environmentData.running,
                      environmentData.evolutionSpeed,
                      environmentData.onGoing,
                      penguins,
                      fishes,
                      Services,
                      garbages,
                      Devices,)
          

  } else {
    return {}
  }
}

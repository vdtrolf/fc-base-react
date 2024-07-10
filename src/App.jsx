
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

import story from "./data/story"
import news from "./data/newsItem.js"

import * as constants from "./Constants.jsx";

export default function App() {

  const urls= [{name:"faircolibri",url:"http://82.165.235.146/faircolibri"},
  {name:"fcTest", url:"http://85.215.204.50/faircolibri"},
  {name:"local", url:"http://localhost:8081/faircolibri"}]

  const [sidebar,setSidebar] = useState(false);
  const [adminbar,setAdminbar] = useState(false);
  const [admin,setAdmin] = useState(false);
  const [simulator,setSimulator = useState({});
  const [baseURL,setBaseURL] = useState({name:"local", url:"http://localhost:8081/faircolibri"});
  const [language,setLanguage] = useState(9)
  const [simulatorsList,setSimulatorsList] = useState([]);
  
  useEffect(() => {
    document.title = 'FAIR Colibri (' + baseURL.name + ")";
  },[baseURL]);

  useEffect(() => {
    refreshEnvironmentsList(baseURL.url)
    .then((updatedEnvironmentsList) => setEnvironmentsList(updatedEnvironmentsList));
  },[baseURL]);

  const handleCreateButton = (size,difficulty) => {

    console.log("received values " + size + " " + difficulty) 

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

  const handleAdminButton = () => {
    if (sidebar) {
      setSidebar(false);
    } 
    setAdminbar(!adminbar);
    // console.log("BUTTON ADMIN PRESSED");
  } 

  const handleCloseButton = () => {
    setSidebar(false);
    setAdminbar(false);
    // console.log("BUTTON CLOSE PRESSED");
  } 

  const handleLogoutButton = () => {
    setSidebar(false);
    setAdminbar(false);
    setAdmin(false);
    // console.log("LOGOUT CLOSE PRESSED");
  } 

  const handleDetailsCloseButton = () => {
    setSelectedKey(0);
    setIlluminatedKey(0);
  }


  const handleSimulatorSelect = (id,size) => {
    setSidebar(false);
    setAdminbar(false);

    if (size === 6) {
      setTileSize(96);
      setGridClass('GridArea96');
    } else if (size === 9) {
      setTileSize(64);
      setGridClass('GridArea64');
    } else {
      setTileSize(48);
      setGridClass('GridArea48');
    }  

    setRunningState(constants.RUNNING);
    setEnvironment(environment.becomeOlder())
    
  }

  const handleSimulatorDelete = (idList) => {
    idList.forEach(environmentId => {
      console.log("doing delete " + environmentId)
      refreshEnvironmentsList(baseURL.url,environmentId)
      .then((updatedEnvironmentsList) => setEnvironmentsList(updatedEnvironmentsList));

      if (environmentId === environment.id) {
        setRunningState(constants.NOT_STARTED);
        setEnvironment({});
      }

    })
  }

  const handleURLSelect = (url) => {
    console.log("URL SELECTED " + url)
    setBaseURL(url);
    setSimulator({});
    setRunningState(constants.NOT_STARTED);
    setSidebar(false);
    setAdminbar(false);
  }

  const handlUserInput = (user,pwd) => {
    setAdmin(user === "admin" && pwd==="admin")
    setSidebar(false);
    setAdminbar(false);
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

const getSite = async (baseURL,language) => {
  const siteData = await convert(baseURL + "create?lang=" + language)
  return extractSiteData(siteData);
}

const refreshSimulatorsList = async (baseURL,environmentToDelete=0)  => {
  if (simulationsToDelete > 0) {
    const simultationsListData = await convert(baseURL + "deleteSimulations?simulationId=" + simulationToDelete );
    return simultationsListData;
  } else {
    const simultationsListData = await convert(baseURL + "simulations" );
    
    return simultationsListData;
  }
}

const extractSiteData = (environmentData) => {


  console.log("================= SITE DATA =============")
  console.dir(siteData)
  console.log("================= SITE DATA =============")


  const news = [];
  const stories = [];
  
  if (siteData) {


    if (siteData.newsItems) { 
      siteData.newsItems.forEach(newsItem => {
        newsItems.push(new newsItem ( newsItem.id,
          newsItem.key,
          newsItem.vpos,
          newsItem.hpos,
          newsItem.alive,
          newsItem.onHook,
          newsItem.staying,
          newsItem.direction,
          newsItem.lastDirection)
        )
      });
    }

    // console.dir(newsItems)

    if (siteData.stories) { 
      siteData.stories.forEach(story => {
        stories.push( new story(story.id,
          story.key,
          story.vpos,
          story.hpos,
          story.kind,
          story.isTaken))
 
      }); 
    }

    if (siteData.Simulations) { 
      for (const thisSimulations in siteData.simulations) {
        let simulation = siteData.simulations[thisSimulations]
        simulations.push({key: simulation.key,
                      id: simulation.id, 
                      name: simulation.name,
                      year: simulation.year,
                      size: simulation.size})
                
      }; 
    } 

    return new Environment(siteData.id,
                      siteData.key,
                      siteData.size,
                      siteData.language,
                      siteData.name,
                      newsItems,
                      stories,)
          

  } else {
    return {}
  }
}

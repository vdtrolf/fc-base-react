import React, {useState,useEffect} from "react";
import Button from "./Button.jsx";

export default function Sidebar(props) {

  const {admin, sidebar, onCloseButton, onEnvironmentSelect, onEnvironmentDelete, environmentsList } = props;
    
  const [checkedState, setCheckedState] = useState(new Array(environmentsList.length).fill(false));
  const [selected,setSelected] = useState(false);
  const debug = false;

  const handleEnvironmentClick = (id,size) => {
    onEnvironmentSelect(id,size);
  }

  const handleGarbClick = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    var hasSelected = false;
    updatedCheckedState.forEach(state => hasSelected = hasSelected || state);

    setSelected(hasSelected);
  }

  const handleDelete = () => {
    var environmentsToDelete = [];
    checkedState.forEach((state,index) => {
      if (state) environmentsToDelete.push(environmentsList[index].id)
    })

    if (debug) {
      console.log("=== environments to delete ====");
      console.dir(environmentsToDelete);
      console.log("=============================================");
    }

    onEnvironmentDelete(environmentsToDelete);
    setCheckedState(new Array(environmentsList.length).fill(false))
  }

  useEffect(() =>{
    setCheckedState(new Array(environmentsList.length).fill(false))
  },[environmentsList.length])

  if (environmentsList) {

    const listEnvironments = environmentsList.map((environment, index) => {  
      return (
        <div key={environment.id} className={environment.running?"environment":"deadenvironment"}>
          {admin?<input type="checkbox" checked={checkedState[index]} onChange={() => handleGarbClick(index)} />:<div/>}
          <div onClick={() => handleEnvironmentClick(environment.id,environment.size)}>{environment.name} ({environment.size})</div>
          <div> - {environment.running?"":"over"}</div>
        </div>
      )
    });
 
    return (
      <div id="mySidebar" className="sidebar" style={{width:sidebar?'250px':'0px',border:sidebar?'4px solid rgb(103, 133, 168)':'0px solid rgb(103, 133, 168)'}}>
        <div className="sideNavbar">
          <div>&nbsp;</div>
          <div>Environments</div>
          <div><Button className="ButtonClose" onClickHandler={onCloseButton} >&nbsp;</Button></div>
        </div>
        <div id="environments">
          <div className="EnvironmentsList">{listEnvironments}</div>
        </div>
        <div className="sidebarButtonsBar">
            <div />
            {selected?<button className="inputButton" type="submit" onClick={handleDelete} value="Submit">Delete selected</button>:<div />}
        </div>
      </div>
    );
  } else {
    return (
      <div id="mySidebar" className="sidebar" style={{width:sidebar?'250px':'0px',border:sidebar?'4px solid rgb(103, 133, 168)':'0px solid rgb(103, 133, 168)'}}>
        <div className="sideNavbar">
          <div>Environments</div>
          <div><Button className="ButtonClose" onClickHandler={onCloseButton} >&nbsp;</Button></div>
        </div>
      </div>
    )
  } 

}
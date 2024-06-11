import React from "react";
import temp_0 from "./images/health-5.png";
import temp_1 from "./images/health-4.png";
import temp_2 from "./images/health-3.png";
import temp_3 from "./images/health-2.png";
import temp_4 from "./images/health-1.png";
import temp_5 from "./images/health-0.png";
import hunger_0 from "./images/hunger-0.png";
import hunger_1 from "./images/hunger-1.png";
import hunger_2 from "./images/hunger-2.png";
import hunger_3 from "./images/hunger-3.png";
import hunger_4 from "./images/hunger-4.png";
import hunger_5 from "./images/hunger-5.png";
import ice from "./images/ice-block-4.png"
import fish from "./images/fish.png"
import empty from "./images/empty.png"
import cross from "./images/cross.png"
import love from "./images/love.png"

export default function Footer(props) {

  const {penguins,onPenguinEnter,onPenguinLeave,onPenguinClick,illuminatedKey} = props;

  const hunger = [hunger_0,hunger_1,hunger_2,hunger_3,hunger_4,hunger_5]
  const temp = [temp_0,temp_1,temp_2,temp_3,temp_4,temp_5]
  const shapes = ["Slim","Fit","Fat"]
  // const activities = ["","Eating","Fishing","Making... well, you know..."]

  const handleMouseEnter = (id) => {
    onPenguinEnter(id)
  }


  if (penguins) {
    const listPenguins = penguins.map((penguin) => {
    const hungerImg = hunger[Math.floor(penguin.hunger/20)]
    const tempImg = temp[Math.floor(penguin.temp/20)]
    if(penguin.alive) {
        return <>
          <div key={penguin.key + 2000000} className="TwoBars"><img src={hungerImg} width="50px" height="10px" alt="" /><img src={tempImg} width="50px" height="10px" alt=""/></div>
          <div key={penguin.key + 1000000} className={penguin.key===illuminatedKey?"FooterTextIlluminated":"FooterText"} > 
            <img src={penguin.hasFish?fish:empty} with="20px" height="20px" alt="" />
            <img src={penguin.hasService?ice:empty} with="20px" height="20px" alt="" />
            <img src={penguin.canLove?love:empty} with="20px" height="20px" alt="" />
            <div onMouseEnter={() => handleMouseEnter(penguin.key)} onClick={() => onPenguinClick(penguin.key)} onMouseLeave={onPenguinLeave} >{penguin.name}</div>
            <div>({penguin.genderName} / {Math.floor(penguin.age)}y / {shapes[penguin.shape]})</div>
            <div>{penguin.activityText}</div>
          </div>
        </>
      } else {
        return <>
          <div key={penguin.key + 2000000} className="TwoBars"><img src={hungerImg} width="50px" height="10px" alt="" /><img src={tempImg} width="50px" height="10px" alt=""/></div>
          <div key={penguin.key + 1000000} className={"FooterText"} >
            <img src={cross} with="20px" height="20px" alt="" />
            <img src={empty} with="20px" height="20px" alt="" />
            <img src={empty} with="20px" height="20px" alt="" />
            <div onMouseEnter={() => handleMouseEnter(penguin.key)} onMouseLeave={onPenguinLeave}>{penguin.name}</div>
            <div>({penguin.genderName} / {Math.floor(penguin.age)}y / {shapes[penguin.shape]})</div>
            <div>{penguin.activityText}</div>
          </div>
        </>
      }
      // return <></>;
    });
 
    return (
      <div className="Footer">
        {listPenguins}
      </div>
    );
  } else {
    return (
      <div className="Footer">
        &nbsp;
      </div>
    )
  }
}

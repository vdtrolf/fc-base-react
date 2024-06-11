import React from "react";
import ButtonLarge from "./ButtonLarge.jsx";

import peng_m from "./images/peng-m.png";
import peng_f from "./images/peng-f.png";
import peng_y from "./images/peng-y.png";

import peng_m_ice from "./images/peng-m-ice.png";
import peng_f_ice from "./images/peng-f-ice.png";

import peng_m_fish from "./images/peng-m-fish.png";
import peng_f_fish from "./images/peng-f-fish.png";
import peng_y_fish from "./images/peng-y-fish.png";

import peng_m_ice_fish from "./images/peng-m-ice-fish.png";
import peng_f_ice_fish from "./images/peng-f-ice-fish.png";

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

import ice from "./images/ice-block-0.png"

export default function Details(props) {

  const {onDetailsCloseButton,onEatButton,penguinObj} = props;

  const hunger = [hunger_0,hunger_1,hunger_2,hunger_3,hunger_4,hunger_5]
  const temp = [temp_0,temp_1,temp_2,temp_3,temp_4,temp_5]
  const shapes = ["","fat","fit","slim","lean"]
  let genderTxt = penguinObj.gender === "m" ? "male":"female"
  if (penguinObj.isChild) genderTxt = "child"

  let hungerImg = hunger[Math.floor(penguinObj.hunger/20)]
  let tempImg = temp[Math.floor(penguinObj.temp/20)]
  
  let image = peng_m;
  
  if (penguinObj.hasService && penguinObj.hasFish) {
    image = penguinObj.gender ==="m"? peng_m_ice_fish : peng_f_ice_fish;    
  } else if (penguinObj.hasService) {
    image = penguinObj.gender ==="m"? peng_m_ice : peng_f_ice;    
  } else if (penguinObj.hasFish) {
    image = penguinObj.gender ==="m"? peng_m_fish : peng_f_fish;    
    if (penguinObj.isChild) image =  peng_y_fish;
  } else {
    image = penguinObj.gender ==="m"? peng_m : peng_f;    
    if (penguinObj.isChild) image =  peng_y;
  }

  const handleEatClick = () => {
    onEatButton(penguinObj.key);
  }

    return (     
        <div id="myDetails" className="Details" > 
          <div>
            <div className="detailsHead" >
              <img src={image} width="64px" height="64px" alt="" />
              <div className="detailsName">{penguinObj.name} ({genderTxt}, {shapes[penguinObj.shape]} - {Math.floor(penguinObj.age)} years old) - {penguinObj.canLove}</div>
            </div>  
          
            <div className="detailsList" >
              <div className="detailsBar"><div>Hunger: </div><img src={hungerImg} width="100px" height="20px" alt="" /></div>
              <div className="detailsBar"><div>Temperature: </div><img src={tempImg} width="100px" height="20px" alt=""/></div>
              <div className="detailsBar"><div>Blocks: </div>{penguinObj.hasService && <img src={ice} width="40px" height="20px" alt=""/>}</div>
            </div>
          </div>
          <div className="detailsGridBack" >
            {penguinObj.hasFish && <ButtonLarge className="ButtonFish" onClickHandler={handleEatClick}>&nbsp;</ButtonLarge>}
            {penguinObj.hasFish && <ButtonLarge className="ButtonDropFish" onClickHandler={handleEatClick}>&nbsp;</ButtonLarge>}
          </div>
        
      </div>

      

    )
 

}
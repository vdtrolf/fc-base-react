import React, {useState,useEffect} from "react";
import device_0_A from "./images/tile-sea.png";
import device_0_B from "./images/tile-sea.png";
import earth from "./images/tile-ice-1-A.png";
import empty from "./images/tile-sea.png";


export default function Device(props) {

  const [device,setDevice] = useState({});  
  const {deviceType, deviceNum, deviceAngle, deviceVpos, deviceHpos, onTileClick, tileSize} = props;

  useEffect(() => {

    // let pixels = tileSize 

    const devices = [device_0_A,device_0_B];


        var deviceImg = empty;
        if (deviceType  > 0 && deviceType < 14 ) {
            deviceImg = devices[deviceAngle==="a"?deviceType*2:deviceType*2 +1];
        } else if (deviceType > 13 ) {
            deviceImg = earth;
        }
        
        setDevice({vpos:deviceVpos,hpos:deviceHpos,img:deviceImg});
   },[deviceType,deviceNum,deviceHpos,deviceVpos,deviceAngle])              

   const handleClick = () => {
      onTileClick(device.vpos,device.hpos);
   }
 
  if (device.img) {
    return <div><img src={device.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={device.vpos + "-" + device.hpos} /></div>
  } 
}
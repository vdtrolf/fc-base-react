import React, {useState,useEffect} from "react";

// import ice_0 from "./images/ice-block-0.png";
import ice_1 from "./images/ice-block-1.png";
import ice_2 from "./images/ice-block-2.png";
import ice_3 from "./images/ice-block-3.png";
import ice_4 from "./images/ice-block-4.png";
import ice_5 from "./images/ice-block-5.png";
import ice_6 from "./images/ice-block-6.png"; 

import showel_1 from "./images/ice-showel-1.png";
import showel_2 from "./images/ice-showel-2.png";
import showel_3 from "./images/ice-showel-3.png";
import showel_4 from "./images/ice-showel-4.png";
import showel_5 from "./images/ice-showel-5.png";
import showel_6 from "./images/ice-showel-6.png"; 


export default function service(props) {

    const [service,setService] = useState({});  
    const {serviceHpos,serviceVpos,serviceAge, serviceHasShowel,tileSize} = props;

    useEffect(() => {

        let pixels = tileSize  + 'px'
        const ice_img = [ice_6,ice_5,ice_4,ice_3,ice_2,ice_1,ice_1,ice_1]
        const showel_img = [showel_6,showel_5,showel_4,showel_3,showel_2,showel_1,showel_1,showel_1]
        let imgAge = Math.floor(serviceAge / 2) 
        let image = serviceHasShowel ? showel_img[imgAge] :ice_img[imgAge];
 
        const style = {width: pixels, height: pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
        setService({img:image,left:serviceHpos * tileSize,top:serviceVpos * tileSize, style:style});

    },[serviceAge, serviceHpos, serviceVpos, serviceHasShowel,tileSize])    
  
    return ( 
        <>
        <div className="service" style={{left: service.left + 'px', top: service.top + 'px', transition:'1s'}} >
            <img src={service.img} style={service.style} alt= "" /> 
        </div>
        </>
    )

}
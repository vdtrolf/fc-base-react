import React, {useState,useEffect} from "react";

export default function Story(props) {

  const [story,setStory] = useState({});  
  const {storyType, storyNum, storyAngle, storyVpos, storyHpos, onTileClick, tileSize} = props;

  useEffect(() => {

    // let pixels = tileSize 

    const Stories = [];


        var storyImg = empty;
        if (storyType  > 0 && storyType < 14 ) {
            storyImg = storys[storyAngle==="a"?storyType*2:storyType*2 +1];
        } else if (storyType > 13 ) {
            storyImg = earth;
        }
        
        setStory({vpos:storyVpos,hpos:storyHpos,img:storyImg});
   },[storyType,storyNum,storyHpos,storyVpos,storyAngle])              

   const handleClick = () => {
      onTileClick(story.vpos,story.hpos);
   }
 
  if (story.img) {
    return <div><img src={story.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={story.vpos + "-" + story.hpos} /></div>
  } 
}
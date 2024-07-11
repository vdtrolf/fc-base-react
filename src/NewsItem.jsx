import React, {useState,useEffect} from "react";

export default function News(props) {

  const [news,setNews] = useState({});  
  const {newsType, newsNum, newsAngle, newsVpos, newsHpos, onTileClick, tileSize} = props;

  useEffect(() => {

    // let pixels = tileSize 

    const Stories = [];


        var newsImg = empty;
        if (newsType  > 0 && newsType < 14 ) {
            newsImg = newss[newsAngle==="a"?newsType*2:newsType*2 +1];
        } else if (newsType > 13 ) {
            newsImg = earth;
        }
        
        setNews({vpos:newsVpos,hpos:newsHpos,img:newsImg});
   },[newsType,newsNum,newsHpos,newsVpos,newsAngle])              

   const handleClick = () => {
      onTileClick(news.vpos,news.hpos);
   }
 
  if (news.img) {
    return <div><img src={news.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={news.vpos + "-" + news.hpos} /></div>
  } 
}

import React, {useState,useEffect}  from "react";

import "./App.css";
import Startup from "./Startup.jsx"
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Adminbar from "./Adminbar.jsx";
import SiteArea from "./SiteArea.jsx";
import Footer from "./Footer.jsx";
import convert from "./Fetchserver.js"

import Language from "./data/language.js"
import Domain from "./data/domain.js"
import Story from "./data/story.js"
import NewsItem from "./data/newsItem.js"

import * as constants from "./Constants.jsx";

export default function App() {

  const urls= [{name:"faircolibri",url:"http://82.165.235.146/faircolibri"},
  {name:"fcTest", url:"http://85.215.204.50/faircolibri"},
  {name:"local", url:"http://localhost:8081/faircolibri"}]

  const [sidebar,setSidebar] = useState(false);
  const [adminbar,setAdminbar] = useState(false);
  const [admin,setAdmin] = useState(false);
  const [domain,setDomain] = useState({});
  const [newsItem,setNewsItem] = useState({});
  const [baseURL,setBaseURL] = useState({name:"local", url:"http://localhost:8081/faircolibri"});
  const [language,setLanguage] = useState(9)
  const [domainsList,setDomainsList] = useState([]);
  const [newsItemsList,setNewsItemsList] = useState([]);
  const [cookiesAgreement,setCookiesAgreement] = useState(false);
  
  useEffect(() => {
    document.title = 'FAIR Colibri (' + baseURL.name + ")";
  },[baseURL]);

  useEffect(() => {
    refreshDomainsList(baseURL.url)
    .then((updatedDomainsList) => setDomainsList(updatedDomainsList));
  },[baseURL]);

  const handleAdminButton = () => {
    if (sidebar) {
      setSidebar(false);
    } 
    setAdminbar(!adminbar);
    console.log("BUTTON ADMIN PRESSED");
  } 

  const handleCloseButton = () => {
    setSidebar(false);
    setAdminbar(false);
    console.log("BUTTON CLOSE PRESSED");
  } 

  const handleLogoutButton = () => {
    setSidebar(false);
    setAdminbar(false);
    setAdmin(false);
    console.log("LOGOUT CLOSE PRESSED");
  } 

  const handleDetailsCloseButton = () => {
    setSelectedKey(0);
    setIlluminatedKey(0);
  }

  const handleDomainSelect = (id,size) => {
    setDomain(id)
    refreshNewsItemsList(baseURL.url,domain.id)
    .then((updatedNewsItemsList) => setNewsItemsList(updatedNewsItemsList));
    setSidebar(false);
    setAdminbar(false);
  }

  const handleNewsItemSelect = (id,size) => {
    setNewsItem(id)
    setSidebar(false);
    setAdminbar(false);
  }

  const handleLanguageSelect = (id,size) => {
    setLanguage(id)
    setSidebar(false);
    setAdminbar(false);
  }

  const handleURLSelect = (url) => {
    console.log("URL SELECTED " + url)
    setBaseURL(url);
    setDomain({});
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
      <Sidebar admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onDomainSelect={handleDomainSelect} domainId={domain.id} domainsList={domainsList} sidebar={sidebar}/>
      <Adminbar admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onLogoutButton={handleLogoutButton} adminbar={adminbar} urls={urls} onURLSelect={handleURLSelect} onUserInput={handlUserInput}/>
      <Navbar cookiesAgreement={cookiesAgreement} domain={domain} language={language} admin={admin} onStartButton={handleStartButton} onAdminButton={handleAdminButton} />
      <div className="WorkArea">
        {cookiesAgreement === constants.NOT_AGREED && <Startup originalSize={boardSize} originalDifficulty={boardDifficulty} onCreateButton={handleCreateButton}/>}
        {cookiesAgreement !== constants.NOT_AGREED && <SiteArea domain={domain} language={language} newsItem={newsItem} cookiesAgreement={cookiesAgreement}/>}
        {cookiesAgreement !== constants.NOT_AGREED && <Footer domain={domain} language={language} />}
        {cookiesAgreement === constants.NOT_AGREED && <div className="Footer">&nbsp;</div>}
      </div>
    </div>
  );
}

const getSite = async (baseURL,language) => {
  const siteData = await convert(baseURL + "create?lang=" + language)
  return extractSiteData(siteData);
}

const refreshDomainsList = async (baseURL)  => {
  const domainsListData = await convert(baseURL + "domains" );
  return domainsListData;
}

const refreshNewsItemsList = async (baseURL)  => {
  const newsItemsListData = await convert(baseURL + "newsItems" );
  return newsItemsListData;
}

const extractSiteData = (environmentData) => {

  console.log("================= SITE DATA =============")
  console.dir(siteData)
  console.log("================= SITE DATA =============")

  const languages = [];
  const newsItems = [];
  const stories = [];
  const domains = [];
  
  if (siteData) {
    
    // console.dir(newsItems)

    if (siteData.languages) { 
      siteData.languages.forEach(language => {
        languages.push( new Language(language.id,
          language.key,
          language.name))
      }); 
    } 
 
    if (siteData.domains) { 
      siteData.domains.forEach(domain => {
        domains.push( new Domain(domain.id,
          domain.key,
          domain.name,
          domain.description,
          domain.logo,
          domain.creationDate))
 
      }); 
    }

    if (siteData.stories) { 
      siteData.stories.forEach(story => {
        stories.push( new Story(story.id,
          story.key,
          story.vpos,
          story.hpos,
          story.kind,
          story.isTaken))
 
      }); 
    }

    if (siteData.newsItems) { 
      siteData.newsItems.forEach(newsItem => {
        newsItems.push(new NewsItem ( newsItem.id,
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

    return new Site(siteData.id,
                      siteData.key,
                      siteData.language,
                      siteData.user,
                      siteData.domain,
                      domains,
                      stories,
                      newsItems)
          
  } else {
    return {}
  }
}

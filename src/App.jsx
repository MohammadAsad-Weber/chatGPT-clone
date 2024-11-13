import React from 'react';
import './App.css'; // StyleSheet

// Context API
import IndexContext from './Context';

// Components
import SideBarTop from './Components/SideBarTop/SideBarTop';
import SideBarBottom from './Components/SideBarBottom/SideBarBottom';
import MainContent from './Components/MainContent/MainContent';

function App() {

  return (
    <div id='chatGPT'>
      <IndexContext> {/*Wrapping into Context API*/}
        <div id='sidebar'>
          <SideBarTop />
          <SideBarBottom />
        </div>
        <MainContent />
      </IndexContext>
    </div>
  )
};

export default App;
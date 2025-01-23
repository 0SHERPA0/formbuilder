import React,{ useState } from 'react';
import './App.css';
import Appinput from './component/input';
import Appcheckbox from './component/checkbox';
import Appbutton from './component/button';
import AppRadio from './component/radio';
import Appselect from './component/select';
import Formbuilder from './formbuilder';
function App() {
  return (
    <div className="App"> 
     <Formbuilder />
    </div>
  );
}

export default App;

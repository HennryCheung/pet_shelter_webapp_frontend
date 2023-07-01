import './App.css';
import CharityWorkerSignin from './charityworker_signin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CharityWorkerSignup from './charityworker_signup';
import Home from './Home';
import AddCat from './AddCat';
import UpdateCat from './UpdateCat';
import CharityWorkerChangePassword from './charityworker_changepassword';
import PublicHome from './PublicHome';
import MemberSignUp from './member_signup';
import MemberSignIn from './member_signin';
import MemberChangePassword from './member_changepassword';
import MemberHome from './MemberHome';
import Favourites from './favourites';
import CatForum from './catForum';
import { gapi, gpai } from 'gapi-script';
import { useEffect } from 'react';

function App() {

  const clientId = "698962701202-v9qqu7b05m7pdfg7e1gg2qst86hal169.apps.googleusercontent.com";

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load("client:auth2", start);
  });

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<CharityWorkerSignin />}></Route>
          <Route path="/signup" element={<CharityWorkerSignup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addCat" element={<AddCat />}></Route>
          <Route path="/editCat/:catID" element={<UpdateCat />}></Route>
          <Route path='/changepassword' element={<CharityWorkerChangePassword />}></Route>
          <Route path='/publichome' element={<PublicHome />}></Route>
          <Route path='/membersignup' element={<MemberSignUp />}></Route>
          <Route path='/membersignin' element={<MemberSignIn />}></Route>
          <Route path='/memberchangepassword' element={<MemberChangePassword />}></Route>
          <Route path='/memberhome' element={<MemberHome />}></Route>
          <Route path='/favourites' element={<Favourites />}></Route>
          <Route path='/catforum' element={<CatForum />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

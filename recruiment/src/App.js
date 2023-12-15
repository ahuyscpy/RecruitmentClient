import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import AppRoute from './Routes';
function App() {

  //useState user = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  

  return (
    <UserContext.Provider value={{user,setUser}}>
    <AppRoute/>
    </UserContext.Provider>
  );
}

export default App;

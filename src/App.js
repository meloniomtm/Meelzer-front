import React, {useReducer} from 'react';
import './App.css';

import SearchContext from './contexts/SearchContext'
import {initialState, meelzerReducer} from './reducers/meelzerReducer'

import Router from './routes/router'

function App() {
  const [state, dispatch] = useReducer(meelzerReducer, initialState);

  return (
    <SearchContext.Provider value={{search: state.search, dispatch: dispatch}}>
    <Router/>
    </SearchContext.Provider>
  );
}

export default App;

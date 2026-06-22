import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RootStore, StoreContext } from './stores/RootStore';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={RootStore}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
              <Toaster position="bottom-right"/>
          </Provider>
      </BrowserRouter>
  </StrictMode>,
)

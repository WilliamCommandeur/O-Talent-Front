import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage/index.tsx';
import store from './store/index.tsx';
import TrainingPage from './components/TrainingPage/index.tsx';
import MemberProfilePage from './components/PageProfile/MemberProfilePage/index.tsx';
import OrganismProfilePage from './components/PageProfile/OrganizationProfilePage/index.tsx';
import FormPage from './components/Form/index.tsx';
import SearchPage from './components/SearchPage/index.tsx';


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search/:arg1?", element: <SearchPage /> },
      { path: "training/:title", element: <TrainingPage /> },
      { path: "member/:name", element: < MemberProfilePage/> },
      { path: "organization/:name", element: < OrganismProfilePage/> },
      { path: "edit/organization/:name", element: < OrganismProfilePage/> },
      { path: "signup", element: <FormPage />},
      
    ],
  },
  
 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

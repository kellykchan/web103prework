import React from 'react';
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import Header from './components/Header';
import './App.css'

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/add', element: <AddCreator /> },
    { path: '*', element: <div>404 Not Found</div> },
  ]);


  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
};

export default App;

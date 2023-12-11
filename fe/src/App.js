import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './layouts/Home';
import SignInForm from './layouts/SignInForm';
import AdminLogin from './layouts/AdminLogin';
import Dashboard from './layouts/Dashboard';
import AllBook from "./layouts/AllBook";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
//import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Route path="/" exact component={Dashboard} />
        <Route path="/register" exact component={SignInForm} />
        <Route path="/adminLogin" exact component={AdminLogin} />
        <Route path="/dashboard" component={Dashboard} />



      </BrowserRouter>
    </div >
  );
}

export default App;

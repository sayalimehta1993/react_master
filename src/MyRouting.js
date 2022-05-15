import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Change from "./components/Change";
import CreateUpdate from "./components/CreateUpdate";
import Delete from "./components/Delete";
import Details from "./components/Details";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Pagination from "./components/Pagination";
import Register from "./components/Register";
import Forgot from "./components/Forgot";
import Playground from "./components/Playground"
import Create from "./components/Create";
import Master from "./components/Master";
import Edit from "./components/Edit";
import Todo from "./components/Todo";
import Master2 from './components/Master/Master';
import TestMemo from './components/TestMemo';
const MyRouting = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Change" component={Change} />
          <Route exact path="/Playground" component={Playground} />
          <Route exact path="/Add" component={CreateUpdate} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/Master" component={Master} />
          <Route exact path="/Master2" component={Master2} />
          {/* <Route exact path="/edit/:id" component={CreateUpdate} /> */}
          <Route exact path="/Delete/:id" component={Delete} />
          <Route exact path="/Details/:id" component={Details} />
          <Route exact path="/Footer" component={Footer} />
          <Route exact path="/Header" component={Header} />
          <Route exact path="/Logout" component={Logout} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Pagination" component={Pagination} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Forgot" component={Forgot} />
          <Route exact path='/TestMemo' component={TestMemo} />
          <Route exact path="/todo" component={Todo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default MyRouting;

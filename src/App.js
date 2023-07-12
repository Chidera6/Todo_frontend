import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';
import Logout from './components/Logout';
//import UpdateTodos from './components/UpdateTodos';

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };
  //const handleLogout = () => {
  //  setUser(null);
  //};

  return (
    <div>
      <nav className="nav-bar">
      {user ? (
      <>
        <button>
          <NavLink exact to="/" className="nav-link" activeClassName="active-link">
            To dos
          </NavLink>
        </button>
        <button>
          <NavLink to="/log-out" className="nav-link" activeClassName="active-link">
            Log out
          </NavLink>
        </button>
      </>
      ) : (
      <>
        <button>
          <NavLink to="/sign-up" className="nav-link" activeClassName="active-link">
            Sign Up
          </NavLink>
        </button>
        <button>
          <NavLink to="/log-in" className="nav-link" activeClassName="active-link">
            Login
          </NavLink>
        </button>
      </>
      )}
      </nav>
      <Switch>
        <Route exact path="/">
          <TodoList user={user} />
        </Route>
        <Route path="/sign-up">
          <SignUp handleLogin={handleLogin} />
        </Route>
        <Route path="/log-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/log-out">
          <Logout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;



import { Switch, Route,NavLink} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';
import Logout from './components/Logout';
function App() {
  
  
  return (
    <div>
      
    <nav class="nav-bar">
      <NavLink exact to="/" className="nav-link" activeClassName="active-link">To dos</NavLink>
      <NavLink to="/sign-up" className="nav-link" activeClassName="active-link">Sign Up</NavLink>
      <NavLink to="/log-in" className="nav-link" activeClassName="active-link">Login</NavLink>
      <NavLink to="/log-out" className="nav-link" activeClassName="active-link">Log out</NavLink>
    </nav>
      
    <Switch>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/log-in">
        <Login />
      </Route>
      <Route path="/log-out">
        <Logout />
      </Route>

    </Switch>
    </div>
  );
};
      

export default App;

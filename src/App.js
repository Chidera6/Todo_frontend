import { Switch, Route,NavLink} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';
function App() {
  
  
  return (
    <div>
      
    <nav class="nav-bar">
      <NavLink exact to="/" className="nav-link" activeClassName="active-link">To dos</NavLink>
      <NavLink to="/sign-up" className="nav-link" activeClassName="active-link">Sign Up</NavLink>
      <NavLink to="/login" className="nav-link" activeClassName="active-link">Login</NavLink>


    </nav>
      
    <Switch>
      <Route exact path="/">
        <TodoList />
      </Route>

      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="login">
        <Login />
      </Route>
    </Switch>
    </div>
  );
};
      

export default App;

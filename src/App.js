import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/user/:id/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            Inicio...
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">admin</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

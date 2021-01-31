import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Reset from "./Components/Reset";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path="/" exact>
            Inicio...
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <h2 className="text-center">Cargando....</h2>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Firestore from "./Firestore";

const Admin = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe el usuario");
      props.history.push("/login");
    }
  }, [props.history]);

  return (
    <div>
      <h2 className="text-center my-4">Ruta protegida</h2>
      {user && <Firestore user={user} />}
    </div>
  );
};

export default withRouter(Admin);

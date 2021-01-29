import React from "react";
import { withRouter } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState, useCallback } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      //   console.log("Ingresar Email");
      setError("Ingresar Email");
      return;
    }
    if (!password.trim()) {
      //   console.log("Ingresar Password");
      setError("Ingresar Password");
      return;
    }
    if (password.length < 6) {
      //   console.log("Password mayor a 6 caracteres");
      setError("Password debe ser de 6 caracteres o mas");
      return;
    }
    setError(null);
    console.log("Pasando todas las validaciones");

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
      }
    }
  }, [email, password, props.history]);

  const registrar = useCallback(async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await db.collection("usuarios").doc(response.user.email).set({
        email: response.user.email,
        uid: response.user.uid,
      });
      await db.collection(response.user.uid).add({
        name: "Tarea de ejemplo",
        fecha: Date.now(),
      });
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya utilizado");
      }
    }
  }, [email, password, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Login de acceso"}
      </h3>

      <hr />

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              className="form-control mt-2"
              placeholder="Ingrese un password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              className="btn btn-dark btn-lg btn-block mt-2"
              type="submit"
            >
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
              className="btn btn-info btn-sm btn-block mt-2"
            >
              {esRegistro ? "Ya estas registrado?" : "No tienes cuenta?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

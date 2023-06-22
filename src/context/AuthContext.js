import { createContext, useState } from "react";
import { Productos } from "../components";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //Lo setea desde un inicio
    const userStorage = JSON.parse(localStorage.getItem("userAuth")) || "Iniciar Sesión";
    const [userAuth, setUserAuth] = useState(userStorage);
    const [mensajeUserNoAuth, setMensajeUserNoAuth] = useState(true);
    const jsonUsers = require("../json/data.json");
    const users = jsonUsers["users"];

    function login(values, enterLoading) {
      const validacionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      const result = validacionEmail.test(values.email);
      //Validacion de Inicio de Sesion con los usuarios del json
      const userAdmin = users.filter((user) => {
        return (
          user.email.toLowerCase() == values.email.toLowerCase() &&
          user.password == values.password
        );
      });
      //Recoge el array de los registrados en el localStorage
      const usersLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
      //Encuentra si hay usuarios registrados en el localStorage
      const userRegistrado = usersLocalStorage?.filter((user) => {
        return (
          user.email.toLowerCase() == values.email.toLowerCase() &&
          user.password == values.password
        );
      });
      // if (userAdmin == "" || userRegistrado) {
        
      // }
      if (
        (result == true && values.password !== "" && userAdmin != "") ||
        userRegistrado.length > 0
      ) {
        enterLoading(0);
        setTimeout(() => {
          //Guardamos el usuario en el localStorage
          userAdmin != ""
            ? localStorage.setItem(
                "userAuth",
                JSON.stringify(userAdmin[0].nickname)
              )
            : localStorage.setItem(
                "userAuth",
                JSON.stringify(userRegistrado[0].nickname)
              );
          //Seteamos el UserAuth de acuerdo al local storage
          userAdmin != ""
            ? setUserAuth(userAdmin[0].nickname)
            : setUserAuth(userRegistrado[0].nickname);
          window.location.href="/"
        }, 4000);
        setMensajeUserNoAuth(true);
      }
    }

    function logout(){
      localStorage.removeItem("userAuth");
      removeProductosIniciarSesion();
      window.location.href = "/";
      setTimeout(() => {
        setUserAuth("Iniciar Sesión");
      }, 4000)
    }

    //Crea el mismo carritoCompras 
    function saveProductos(productosIniciarSesion){
      localStorage.setItem("carritoCompras", JSON.stringify(productosIniciarSesion));
    }

    //Remueve los productos de iniciar sesión al momento de desloguearse
    function removeProductosIniciarSesion(){
      const productoStorageCarritoCompras = JSON.parse(localStorage.getItem("carritoCompras")) ?? [];
      const productosIniciarSesion = productoStorageCarritoCompras.filter(producto => producto.user !== "Iniciar Sesión");
      saveProductos(productosIniciarSesion);
    }

    return ( <AuthContext.Provider value={{userAuth, setUserAuth, login, logout, mensajeUserNoAuth, users}}>{children}</AuthContext.Provider> );

};
 
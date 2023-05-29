import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import logo from "../../assets/logo.png";
import registro from "../../assets/registro.png";
import "./NavBar.css";

const NavBar = () => {
    const { user, call_login_google, handleLogout } = useContext(UserContext);

  return (
    <div className="head">
      <NavLink className="title" to="/">
        <img src={logo} style={{ width: "270px", height: "120px" }} alt="Logo" />
      </NavLink>

      {user ? (
        <div>
          {user.displayName}
          <img src={user.photoURL} alt="User" />
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div onClick={call_login_google}>
          <NavLink to="/register">
            <h2 className="title">Registrarse / Iniciar Sesión</h2>
          </NavLink>

          <div>
            <img src={registro} style={{ width: "50px", height: "50px", marginRight: "50px" }} alt="Registro" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

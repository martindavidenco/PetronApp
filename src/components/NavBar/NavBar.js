import "./NavBar.css"
import { NavLink } from "react-router-dom"
import androide from "../../assets/androidePetrona.png"
const NavBar = () => {
  return (
    <div class="head">
   
      <h1><NavLink className="title" to="/">Petronapp</NavLink></h1>
      <img src={androide} className="androideImg"/>

      
      <h2>Tu I.A. asistente de cocina </h2>

    </div>
  )
}

export default NavBar
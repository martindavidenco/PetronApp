import "./Quien.css"
import martin from "../../assets/martin.svg"
import leo from "../../assets/leo.svg"
import imagenBackground1 from "../../assets/about.svg"
import imagenBackground2 from "../../assets/bg2.png"

const Quien = () => {
  return (
    <div className="quienContainer">
      <div className="background1">
        <div className="quienes">
          <h2>¿Quienes somos?</h2>
          <p>Hola! Somos Martin y Leo, dos amigos que unieron sus
            conocimientos para desarrollar su primer producto digital.
            “Doña PetronApp” es el resultado de nuestra pasion por
            la comida y nuestras ganas de crear.</p>
          <p>
            Nos enorgullece ofrecerte una aplicación intuitiva y fácil
            de usar, diseñada para acompañarte en cada paso de tus
            recetas favoritas.
          </p>
          <div className="iconosContainer">
            <a href="https://www.linkedin.com/in/mart%C3%ADndavidenco/" target="_blank"> <img src={martin} className="icono" /></a>
            <a href="https://www.linkedin.com/in/leo-juarez-415653231" target="_blank"><img src={leo} className="icono" /></a>
          </div>

        </div>
        <img src={imagenBackground1} className="imagenBackground1" />
        {/* <div className="imagenBackground1"></div> */}
      </div>
      <div className="background2">
        <div className="mision">
          <h2>Mision, Vision</h2>
          <p>En Doña PetronApp, nuestra misión es hacer que la cocina
            sea divertida y accesible para todos.
            Queremos ser tu asistente virtual culinario de confianza
            brindándote respuestas personalizadas y en tiempo real.
            Nuestra visión es convertirnos en el líder en asistencia culinaria
            creando una comunidad donde compartamos experiencias y
            disfrutemos de deliciosas recetas.
            ¡Únete a nosotros y descubre una nueva forma de disfrutar la cocina!.</p>

        </div>
        <img src={imagenBackground2} className="imagenBackground2" />
        {/* <div className="imagenBackground2"> </div> */}
      </div>

    </div>

  )
}

export default Quien
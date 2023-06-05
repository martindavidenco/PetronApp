import{ Accordion} from "../Accordion/Accordion";
import { data } from "../Accordion/data";
import "./Preguntas.css"

const Preguntas = () => {
  return (
    <>
   <div className="preguntasContainer">
      <div className="accordionContainer"> 
        <h3 className="main-title">Preguntas frecuentes</h3>
        <div className="main-title-underline"></div>
        {data.map((section, index) => (
          <Accordion key={index} section={section} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Preguntas
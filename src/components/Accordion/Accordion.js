import React from "react";
import useOpenController from "./UseOpenController.js";
import "./Accordion.css"
import flecha from "../../assets/flecha.png"
export const Accordion = ({ section, key }) => {
    const { isOpen, toggle } = useOpenController(false);
  ;
    return (
        <div className="accordionContainer1">
            <div className="accordion-container">
                <ExpendableColumn
                    question={section.question}
                    isOpen={isOpen}
                    toggle={toggle}
                />
                {isOpen && <TextSection text={section.answer} />}
                <div className="underline"></div>
            </div>
        </div>

    );
};

export const ExpendableColumn = ({ question, isOpen, toggle }) => {
    return (
        <div className="column-container" onClick={toggle}>
            <div className="column-text">{question}</div>
            <button className="expendable-button">
                <span
                    class="material-symbols-outlined"
                    style={{
                        transform: `rotate(${isOpen ? 180 : 0}deg)`,
                        transition: "all 0.25s",
                    }}
                >
                </span>
                <img src={flecha} className="flecha" style={{ height: "10px" }} />
            </button>
        </div>
    );
};

export const TextSection = ({ text }) => {
    return (
        <div className="text-container">
            <div>{text}</div>
        </div>
    );
};
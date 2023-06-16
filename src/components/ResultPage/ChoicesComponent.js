// Importing necessary dependencies and components
import { useState } from "react";
import { SpeechBubbleIcon } from "./zookeeper/zooKeeperIcon";
import "./resultStyle.css";
import { useNavigate } from "react-router-dom";
import { Button, Collapse, Card } from "react-bootstrap";
import useSound from 'use-sound';
import mouth_09_pop from '../../sound/mouth_09_pop.mp3';

// Define the ChoicesComponent functional component that takes props as input
export const ChoicesComponent = ({ choices, gameModes, maps }) => {
    // Initialize necessary states and hooks
    const navigate = useNavigate();

    const [playActive] = useSound(mouth_09_pop, { volume: 0.25, preload: true });
    const [playOn] = useSound(mouth_09_pop, { volume: 0.25, preload: true });
    const [playOff] = useSound(mouth_09_pop, { volume: 0.25, preload: true });

    const handleDeleteChoice = (choiceId) => {
        // Delete the choice by making a DELETE request to the API
        fetch(`http://localhost:8088/choices/${choiceId}`, {
            method: "DELETE",
        }).then(() => {
            if (choices.length === 1) {
                navigate("/goal");
            } else {
                window.location.reload();
            }
        });
    };

    const handleSaveChoice = () => {
        navigate("/profile");
    };

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
        setIsShown(!isShown);
    };

    return (
        <>
            {/* Render a div with a class name */}
            <div className="animalSilFont">Show</div>
            <div className="buttonResultToggle">
                {/* Render a Button component */}
                <Button
                    className="ResultButton"
                    variant="primary"
                    onClick={handleClick}
                    aria-controls="gameModeResult mapResult habitatAmnResult exhibitAmnResult"
                    aria-expanded={isShown}
                    onMouseDown={playActive}
                    onMouseUp={() => {
                        handleClick ? playOff() : playOn();
                    }}
                >
                    View Plan
                </Button>
            </div>
            {/* Render the main container */}
            <main className="toggle--container">
                {/* Render an unordered list */}
                <ul className="choicesUl">
                    {/* Map over the 'choices' array and render a list item for each choice */}
                    {choices.map((choice, index) => {
                        const gameMode = gameModes.find((mode) => mode.id === choice.gameModeId);
                        const map = maps.find((m) => m.id === choice.zooMapId);

                        return (
                            <>
                                {/* Render a Collapse component */}
                                <Collapse in={isShown}>
                                    <Card className="transparentCard">
                                        <Card.Body className="centerContent-image d-flex justify-content-center align-items-center">
                                            {/* Render the SpeechBubbleIcon component */}
                                            <SpeechBubbleIcon onDelete={() => handleDeleteChoice(choice.id)} onSave={handleSaveChoice} />
                                        </Card.Body>
                                    </Card>
                                </Collapse>

                                {/* Render a list item */}
                                <li className="planList" key={index}>
                                    {/* Render a row */}
                                    <div className="row row-custom">
                                        {/* Render a column */}
                                        <div className="col-custom">
                                            {/* Render a Collapse component */}
                                            <Collapse in={isShown}>
                                                <Card className="card-custom--result">
                                                    <Card.Body className="card-body-custom">Your Game Mode is {gameMode ? gameMode.mode : "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        {/* Render a column */}
                                        <div className="col-custom">
                                            {/* Render a Collapse component */}
                                            <Collapse in={isShown}>
                                                <Card className="card-custom--result">
                                                    <Card.Body className="card-body-custom">Your Zoo Map is {map ? map.type : "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        {/* Render a column */}
                                        <div className="col-custom">
                                            {/* Render a Collapse component */}
                                            <Collapse in={isShown}>
                                                <Card className="card-custom--result">
                                                    <Card.Body className="card-body-custom">Your aimed Habitat amount is {choice.habitatAmount || "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        {/* Render a column */}
                                        <div className="col-custom">
                                            {/* Render a Collapse component */}
                                            <Collapse in={isShown}>
                                                <Card className="card-custom--result">
                                                    <Card.Body className="card-body-custom">Your aimed Exhibit amount is {choice.exhibitAmount || "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        <Collapse in={isShown}>
                                            {/* Render a div */}
                                            <div className="footPrintFont">aAbBcCdlLmMnNoOqQRtzZvVkKuUpPzE</div>
                                        </Collapse>
                                    </div>
                                </li>
                            </>
                        );
                    })}
                </ul>
            </main>
        </>
    );
};

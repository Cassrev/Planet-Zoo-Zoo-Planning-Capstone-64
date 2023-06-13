import { useState } from "react";
import { SpeechBubbleIcon } from "./zookeeper/zooKeeperIcon";
import "./resultStyle.css";
import { useNavigate } from "react-router-dom";
import { Button, Collapse, Card } from "react-bootstrap";

export const ChoicesComponent = ({ choices, gameModes, maps }) => {
    const navigate = useNavigate();

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
            <div className="buttonResultToggle">
                <Button
                    variant="primary"
                    onClick={handleClick}
                    aria-controls="gameModeResult mapResult habitatAmnResult exhibitAmnResult"
                    aria-expanded={isShown}
                >
                    View Plan
                </Button>
            </div>
            <main className="toggle--container">
                <div>
                    <ul className="choicesUl">
                        {choices.map((choice, index) => {
                            const gameMode = gameModes.find((mode) => mode.id === choice.gameModeId);
                            const map = maps.find((m) => m.id === choice.zooMapId);

                            return (
                                <li className="planList" key={index}>
                                    <Collapse in={isShown}>
                                        <Card className="transparentCard">
                                            <Card.Body className="centerContent">
                                                <SpeechBubbleIcon onDelete={() => handleDeleteChoice(choice.id)} onSave={handleSaveChoice} />
                                            </Card.Body>
                                        </Card>
                                    </Collapse>

                                    <div className="row">
                                        <div className="col">
                                            <Collapse in={isShown}>
                                                <Card>
                                                    <Card.Body>Your Game Mode is {gameMode ? gameMode.mode : "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        <div className="col">
                                            <Collapse in={isShown}>
                                                <Card>
                                                    <Card.Body>Your Zoo Map is {map ? map.type : "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        <div className="col">
                                            <Collapse in={isShown}>
                                                <Card>
                                                    <Card.Body>Your aimed Habitat amount is {choice.habitatAmount || "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>

                                        <div className="col">
                                            <Collapse in={isShown}>
                                                <Card>
                                                    <Card.Body>Your aimed Exhibit amount is {choice.exhibitAmount || "Unknown"}</Card.Body>
                                                </Card>
                                            </Collapse>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </>
    );
};

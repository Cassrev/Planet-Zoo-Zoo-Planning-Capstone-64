import { useState } from "react";
import { SpeechBubbleIcon } from "./zookeeper/zooKeeperIcon";
import "./resultStyle.css"
import { useNavigate } from "react-router-dom";

export const ChoicesComponent = ({ choices, gameModes, maps }) => {
    const navigate = useNavigate()

    const handleDeleteChoice = (choiceId) => {
        // Delete the choice by making a DELETE request to the API
        fetch(`http://localhost:8088/choices/${choiceId}`, {
            method: "DELETE"
        }).then(() => {
            if (choices.length === 1) {
                navigate("/goal");
            } else {
                window.location.reload();
            }
        });
    };

    const handleSaveChoice = () => {
        navigate("/profile")
    };

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
        setIsShown((current) => !current);
    };

    return (
        <>
            <div className="buttonResultToggle">
                <button className="ResultButton" onClick={handleClick}>
                    Click to see your plan
                </button>
            </div>
            <main className="toggle--container">
                {isShown && (
                    <div>
                        <ul className="choicesUl">
                            {choices.map((choice) => {
                                const gameMode = gameModes.find((mode) => mode.id === choice.gameModeId);
                                const map = maps.find((m) => m.id === choice.zooMapId);

                                return (
                                    <li className="planList" key={choice.id}>
                                        <SpeechBubbleIcon
                                            onDelete={() => handleDeleteChoice(choice.id)}
                                            onSave={handleSaveChoice}
                                        />
                                        <div className="gameModeResult">Your Game Mode is {gameMode ? gameMode.mode : "Unknown"}</div>
                                        <div className="mapResult">Your Zoo Map is {map ? map.type : "Unknown"}</div>
                                        <div className="habitatAmnResult">Your aimed Habitat amount is {choice.habitatAmount || "Unknown"}</div>
                                        <div className="exhibitAmnResult">Your aimed Exhibit amount is {choice.exhibitAmount || "Unknown"}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </main>
        </>
    );
};

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const GoalMain = () => {
    const localStorage_user = localStorage.getItem("sitePZ_user")
    const user = JSON.parse(localStorage_user)

    const navigate = useNavigate();
    const [gameMode, setGameMode] = useState([]);


    useEffect(
        () => {

            fetch(`http://localhost:8088/gameModes`)
                .then(response => response.json()) // Parse the response as JSON
                .then((gameModeArray) => {
                    setGameMode(gameModeArray)
                })
        },
        [] // Empty dependency array, so the effect runs only once when the component mounts
    )

    const [maps, setMap] = useState([]);
    useEffect(
        () => {

            fetch(`http://localhost:8088/maps`)
                .then(response => response.json()) // Parse the response as JSON
                .then((zooMapArray) => {
                    setMap(zooMapArray)
                })
        },
        [] // Empty dependency array, so the effect runs only once when the component mounts
    )

    const [choices, setChoice] = useState({
        userId: user.id,
        gameModeId: 0,
        habitatAmount: 0,
        exhibitAmount: 0,
        zooMapId: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        // Make a PUT request to update the ticket on the server
        return fetch(`http://localhost:8088/choices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(choices),
        })
            .then((response) => response.json())
            .then(() => {
                // Navigate to the "/tickets" route after successful update
                navigate("/result");
            });
    };

    const handleIntegerInputChange = (event) => {
        const copyOfUserChoices = { ...choices };
        copyOfUserChoices[event.target.id] = parseInt(event.target.value);
        setChoice(copyOfUserChoices);
    };

    return (<>
        <form className="form--post" id="my_form" onSubmit={handleSaveButtonClick}>
            <div className="modeContainer">
                <fieldset data-identifier="radio-button">
                    <div className="form-group-gameMode">
                        Select Game Mode:
                        {
                            gameMode.map(
                                (modeObj) => {
                                    return (
                                        <div key={modeObj.id} className="radio">
                                            <label>
                                                <input
                                                    id="gameModeId"
                                                    type="radio"
                                                    value={modeObj.id}
                                                    checked={choices.gameModeId === modeObj.id}
                                                    onChange={handleIntegerInputChange}
                                                />
                                                {modeObj.mode}
                                            </label>
                                        </div>
                                    );
                                }
                            )
                        }
                    </div>
                </fieldset>
            </div>
            <div className="habitatContainer">
                <div className="habitatAmountInput">
                    <label>
                        Habitat Goal Amount:
                        <input
                            id="habitatAmount"
                            type="number"
                            onChange={handleIntegerInputChange}
                        />
                    </label>
                </div>
            </div>
            <div className="exhibitContainer">
                <div className="exhibitAmountInput">
                    <label>
                        Exhibit Goal Amount:
                        <input
                            id="exhibitAmount"
                            type="number"
                            onChange={handleIntegerInputChange}
                        />
                    </label>
                </div>
            </div>
            <div className="zooMapContainer">
                <fieldset data-identifier="radio-button">
                    <div className="form-group-map">
                        Select Zoo Map:
                        {
                            maps.map(
                                (mapObj) => {
                                    return (
                                        <div key={mapObj.id} className="radio">
                                            <label>
                                                <input
                                                    id="zooMapId"
                                                    type="radio"
                                                    value={mapObj.id}
                                                    checked={choices.zooMapId === mapObj.id}
                                                    onChange={handleIntegerInputChange}
                                                />
                                                {mapObj.type}
                                            </label>
                                        </div>
                                    );
                                }
                            )
                        }
                    </div>
                </fieldset>
            </div>

            <div className="continueArrowButtonContainer">
                <fieldset data-identifier="submit-button">
                    <button
                        className="btn"
                        type="submit"> Continue </button>
                </fieldset>
            </div>
        </form>
        <button onClick={() => navigate("/result")}>Cheat to result page</button>
    </>)
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameModeRadio } from "./GameModeRadio";
import { MapRadio } from "./MapRadio";
import "./goals.css"

/* 
GoalMain accepts and destructure prop object: user from LocalView(Parent)
*/
export const GoalMain = ({ user }) => {
    const navigate = useNavigate();

    const [gameMode, setGameMode] = useState([]); // State variable for game mode
    // The value of gameMode will be stored in the state, and setGameMode is a function to update that state

    const [maps, setMap] = useState([]); // State variable for maps
    // The value of maps will be stored in the state, and setMap is a function to update that state

    /*
    !By calling useState with the initial object, the choices state variable is created and its initial value is set.

    !The setChoice function can be used to update the value of the choices state later on. When setChoice is called with a new value, it triggers a re-render of the component and updates the value of choices.
    ⬇️⬇️⬇️⬇️⬇️
    */
    const [choices, setChoice] = useState({
        userId: user.id, // sets the value of the userId property to the id value from a user object.
        gameModeId: 0,
        zooMapId: 0,
        habitatAmount: 0,
        exhibitAmount: 0
    });

    // Function to fetch game modes from the server
    const fetchGameModes = async () => {
        // Send a GET request to the specified URL
        const response = await fetch("http://localhost:8088/gameModes");

        // Convert the response to JSON format
        const gameModeArray = await response.json();

        // Update the state variable 'gameMode' with the fetched data
        setGameMode(gameModeArray);
    };

    useEffect(() => {
        // This useEffect hook is used to fetch game modes from a server when the component is initialized.

        fetchGameModes();
    }, []);

    // Function to fetch maps from the server
    const fetchMaps = async () => {
        const response = await fetch("http://localhost:8088/maps");
        const zooMapArray = await response.json();
        setMap(zooMapArray);
    };

    // Fetch maps when the component is initialized
    useEffect(() => {
        fetchMaps();
    }, []);

    // Handle save button click
    const handleSaveButtonClick = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Send a POST request to the specified URL
        fetch("http://localhost:8088/choices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(choices),
        })
            .then(() => {
                // After the POST request is successfully completed,
                // navigate to the "/result" route
                navigate("/result");
            })
    };

    // Function to handle input change for integer values
    const handleIntegerInputChange = (event) => {
        // Create a copy of the current state object
        const copyOfUserChoices = { ...choices };

        // Convert the input value to an integer and update the corresponding choice
        copyOfUserChoices[event.target.id] = parseInt(event.target.value);

        // Update the state with the modified choices object
        setChoice(copyOfUserChoices);
    };

    return (
        <>
            <form className="form--post" id="my_form" onSubmit={handleSaveButtonClick}>
                {/* Container for game mode selection */}
                <div className="modeContainer">
                    <fieldset data-identifier="radio-button">
                        <div className="form-group-gameMode">
                            Select Game Mode:
                            {/* Render game mode radio buttons */}
                            {gameMode.map((modeObj) => (
                                <GameModeRadio
                                    key={modeObj.id}
                                    modeObj={modeObj}
                                    choices={choices}
                                    handleIntegerInputChange={handleIntegerInputChange}
                                />
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/* Container for habitat amount input */}
                <div className="habitatContainer">
                    <div className="habitatAmountInput">
                        <label>
                            Habitat Goal Amount:
                            {/* Input field for habitat amount */}
                            <input
                                id="habitatAmount"
                                type="number"
                                onChange={handleIntegerInputChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Container for exhibit amount input */}
                <div className="exhibitContainer">
                    <div className="exhibitAmountInput">
                        <label>
                            Exhibit Goal Amount:
                            {/* Input field for exhibit amount */}
                            <input
                                id="exhibitAmount"
                                type="number"
                                onChange={handleIntegerInputChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Container for zoo map selection */}
                <div className="zooMapContainer">
                    <fieldset data-identifier="radio-button">
                        <div className="form-group-map">
                            Select Zoo Map:
                            {/* Render map radio buttons */}
                            {maps.map((mapObj) => (
                                <MapRadio
                                    key={mapObj.id}
                                    mapObj={mapObj}
                                    choices={choices}
                                    handleIntegerInputChange={handleIntegerInputChange}
                                />
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/* Container for continue button */}
                <div className="continueArrowButtonContainer">
                    <fieldset data-identifier="submit-button">
                        <button className="btnContinueGoal" type="submit">
                            Continue
                        </button>
                    </fieldset>
                </div>
            </form>
        </>
    );
};


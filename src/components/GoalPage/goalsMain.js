import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameModeRadio } from "./GameModeRadio";
import { MapRadio } from "./MapRadio";
import { Form, Row, Col, Button } from 'react-bootstrap';
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

    // Function that handles the click event on a save button
    const handleSaveButtonClick = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Check if the form is valid
        if (validateForm()) {
            // If the form is valid, make a POST request to the server
            fetch("http://localhost:8088/choices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(choices), // Convert the choices object to a JSON string
            })
                .then(() => {
                    navigate("/result"); // Redirect to the "/result" page
                });
        } else {
            // If the form is not valid, display an alert message
            alert("Please fill out all fields before continuing.");
        }
    };

    // Function that validates the form
    const validateForm = () => {
        // Check if any required fields are empty
        if (
            choices.gameModeId === 0 || // Check if the game mode ID is 0
            choices.zooMapId === 0 || // Check if the zoo map ID is 0
            choices.habitatAmount === 0 || // Check if the habitat amount is 0
            choices.exhibitAmount === 0 // Check if the exhibit amount is 0
        ) {
            return false; // Return false if any required field is empty
        }
        return true; // Return true if all required fields are filled
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
        <div className="containerGoal">
            <Form className="form--post" id="my_form" onSubmit={handleSaveButtonClick}>
                <Form.Group className="container-gameMode">
                    <Form.Label className="custom-form-label">Select Game Mode:</Form.Label>
                    <div className="gameModeContainer">
                        {gameMode.map((modeObj) => (
                            <GameModeRadio
                                key={modeObj.id}
                                modeObj={modeObj}
                                choices={choices}
                                handleIntegerInputChange={handleIntegerInputChange}
                            />
                        ))}
                    </div>
                </Form.Group>
                <div className="footPrint">Z</div>

                <Form.Group className="container-habitatGoalAmn">
                    <Form.Label className="custom-form-label">Habitat Goal Amount:</Form.Label>
                    <Form.Control
                        id="habitatAmount"
                        type="number"
                        onChange={handleIntegerInputChange}
                    />
                </Form.Group>
                <div className="footPrint">H</div>
                <Form.Group className="container-exhibitGoalAmn">
                    <Form.Label className="custom-form-label">Exhibit Goal Amount:</Form.Label>
                    <Form.Control
                        id="exhibitAmount"
                        type="number"
                        onChange={handleIntegerInputChange}
                    />
                </Form.Group>
                <div className="footPrint">Y</div>
                <Form.Group className="container-zooMap">
                    <Form.Label className="custom-form-label">Select Zoo Map:</Form.Label>
                    <div className="mapContainer">
                        {maps.map((mapObj) => (
                            <MapRadio
                                key={mapObj.id}
                                mapObj={mapObj}
                                choices={choices}
                                handleIntegerInputChange={handleIntegerInputChange}
                            />
                        ))}
                    </div>
                </Form.Group>
                <div className="footPrint">C</div>
                <Button className="btnContinueGoal" type="submit">
                    Continue
                </Button>
            </Form>
        </div>
    );
}


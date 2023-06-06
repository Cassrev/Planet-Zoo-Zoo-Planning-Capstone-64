import { useEffect, useState } from "react"

export const SelectGameMode = () => {
    const localStorage_user = localStorage.getItem("sitePZ_user")
    const user = JSON.parse(localStorage_user)

    const [gameMode, setGameMode] = useState([]);

    useEffect(
        () => {
            /* 
            This useEffect hook is used to fetch the list of employees from the server when the component mounts.
            */

            /* 
            The fetch function is used to make an HTTP GET request to the specified URL, which is "http://localhost:8088/users?isStaff=true" in this case.
            This URL is requesting a list of users (employees) with the "isStaff" parameter set to true.
            */

            fetch(`http://localhost:8088/gameModes`)
                .then(response => response.json()) // Parse the response as JSON
                .then((gameModeArray) => {
                    /* 
                    The response data is received as an array of employee objects.
                    The setEmployees function is used to update the state variable "employees" with the received employeeArray.
                    This will trigger a re-render of the component with the updated employee list.
                    */
                    setGameMode(gameModeArray)
                })
        },
        [] // Empty dependency array, so the effect runs only once when the component mounts
    )

    const getGameModeInfo = async () => {
        const response = await fetch(
            `http://localhost:8088/gameModes`
        );
        // Extract the ticket object from the response
        const gameModeInfo = await response.json();
        const gameModeObject = gameModeInfo[0];
        // Update the ticket state with the fetched ticket object
        setGameMode(gameModeObject);
    }
    useEffect(() => {
        getGameModeInfo();
    }, []);

    const [modeChoices, setModeChoice] = useState({
        userId: user.id,
        gameModeId: 0
    })

    const handleIntegerInputChange = (event) => {
        const copyOfUserChoices = { ...modeChoices };
        copyOfUserChoices[event.target.id] = parseInt(event.target.value);
        setModeChoice(copyOfUserChoices);
    };

    return (<><fieldset data-identifier="radio-button">
        <div className="form-group">
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
                                        checked={modeChoices.gameModeId === modeObj.id}
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
    </>)
}
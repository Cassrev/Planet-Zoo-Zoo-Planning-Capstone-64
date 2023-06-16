import "./gameMode.css"

/* 
The component receives three parent props:

> modeObj: An object containing information about the game mode, such as id and mode. The object is destructured, so modeObj directly references this prop.

> choices: An object containing the current selected choices. The object is destructured, so choices directly references this prop.

> handleIntegerInputChange: A function that handles changes when this radio button is selected. The function is destructured, so handleIntegerInputChange directly references this prop.
*/

export const GameModeRadio = ({ modeObj, choices, handleIntegerInputChange }) => {
    return (
        <div key={modeObj.id} className="radio">
            {/* This div represents a radio button option */}
            <label className="modeLabel">
                {/* The label displays the text for the radio button option */}
                <input
                    id="gameModeId" // The id attribute for the radio input element
                    type="radio" // The type of input element, in this case, a radio button
                    value={modeObj.id} // The value associated with this radio button option
                    checked={choices.gameModeId === modeObj.id} // Determines if this radio button is currently selected
                    onChange={handleIntegerInputChange} // The function to handle changes when this radio button is selected
                />
                {modeObj.mode} {/*The text displayed next to the radio button*/}
            </label>
        </div>
    );
};

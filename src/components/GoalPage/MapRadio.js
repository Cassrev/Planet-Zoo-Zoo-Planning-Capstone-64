import "./mapRadio.css"

/* 
MapRadio receives three parent props:

> mapObj: An object containing information about the map, such as id and type. The object is destructured, so mapObj directly references this prop.

> choices: An object containing the current selected choices. The object is destructured, so choices directly references this prop.

> handleIntegerInputChange: A function that handles changes when this radio button is selected. The function is destructured, so handleIntegerInputChange directly references this prop.
*/


export const MapRadio = ({ mapObj, choices, handleIntegerInputChange }) => {
    return (
        <div key={mapObj.id} className="radio">
            {/* This div represents a radio button option */}
            <label className="mapLabel">
                <input
                    id="zooMapId" // The id attribute for the radio input element
                    type="radio" // The type of input element, in this case, a radio button
                    value={mapObj.id} // The value associated with this radio button option
                    checked={choices.zooMapId === mapObj.id} // Determines if this radio button is currently selected
                    onChange={handleIntegerInputChange} // The function to handle changes when this radio button is selected
                />
                {mapObj.type} {/* // The text displayed next to the radio button */}
            </label>
        </div>
    );
};


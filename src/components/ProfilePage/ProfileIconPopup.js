import { useState } from "react";
import "./iconPopup.css"

export const ProfileIconPopup = ({ onSave }) => {
    const [newIconUrl, setNewIconUrl] = useState('');

    const handleInputChange = (event) => {
        setNewIconUrl(event.target.value);
    };

    const handleSaveClick = () => {
        onSave(newIconUrl);
    };

    return (
        <div className="popup-content">
            <input type="text" value={newIconUrl} onChange={handleInputChange} placeholder="Enter icon URL" />
            <button onClick={handleSaveClick} type="button" className="btn btn-primary-Popup">
                Save
            </button>
        </div>
    );
};
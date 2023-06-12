import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import "./keeperStyle.css";

export const SpeechBubbleIcon = ({ onDelete, onSave }) => {

    const handleNoClick = () => {
        onDelete();
    };

    const handleYesClick = () => {
        onSave();
    };

    return (
        <div className="image-container">
            <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1129401.jpg?resize=1200:*" alt="Your Image" className="keeperImage" />
            <div className="speech-bubble">
                <FontAwesomeIcon icon={faComment} />
                <span className="speech-bubble-text">Ey mate! Are you happy with your plan?</span>
                <div className="button-container">
                    <button onClick={handleNoClick}>No</button>
                    <button onClick={handleYesClick}>Yes</button>
                </div>
            </div>
        </div>
    );
};

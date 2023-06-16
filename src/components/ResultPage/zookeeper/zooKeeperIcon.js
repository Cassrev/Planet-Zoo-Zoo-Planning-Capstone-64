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
            <div class="bubbleSteve right">Crikey, what a plan! Do you approve little buddy?
            </div>
            <div class="bubbleCroc left">
                <div className="button-container">
                    <button className="yesBtn" onClick={handleYesClick}>Yes</button>
                    <button className="noBtn" onClick={handleNoClick}>No</button>
                </div>
            </div>
        </div>
    );
};

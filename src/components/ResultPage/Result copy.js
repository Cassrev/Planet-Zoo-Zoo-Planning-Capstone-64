import { useState } from "react";
import "./resultStyle.css"

export const Result = () => {
    const [isShown, setIsShown] = useState(false);

    const handleClick = (event) => {
        // 👇️ toggle shown state
        setIsShown(current => !current);

        // 👇️ or simply set it to true
        // setIsShown(true);
    }
    return (
        <>
            <div className="buttonResultToggle"><button className="ResultButton" onClick={handleClick}>Click to see your plan</button></div>
            <main className='toggle--container'>
                {isShown && (
                    <div className="container--showModeType">
                        show game mode type result here
                    </div>)}
                {isShown && (
                    <div className="container--showZooMap">
                        Show zoo map result here
                    </div>
                )}
                {isShown && (
                    <div className="container--habitatAmount">
                        Show habitat amount here
                    </div>
                )}
                {isShown && (
                    <div className="container--exhibitAmount">
                        Show exhibit amount here
                    </div>
                )}
            </main>
        </>
    )
}
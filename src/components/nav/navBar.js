import { Link, useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import close_mouth_to_eat from '../../sound/close_mouth_to_eat.mp3';
import { useState } from 'react'; // Import the useState hook
import "./navBar.css";

export const LocalNavBar = () => {
    const navigate = useNavigate();
    const [play, { stop }] = useSound(close_mouth_to_eat, { volume: 3.5, preload: true });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
        play(); // Play the sound effect when hovering begins
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        stop(); // Stop the sound effect when hovering ends
    };

    return (
        <ul className="navbar">
            {localStorage.getItem("sitePZ_user") ? (
                <li className="navbar__item navbar__logout">
                    <Link
                        className="navbar__link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("sitePZ_user");
                            navigate("/", { replace: true });
                        }}
                        onMouseEnter={handleMouseEnter} // Call the event handler on mouse enter
                        onMouseLeave={handleMouseLeave} // Call the event handler on mouse leave
                        style={{ textDecoration: "none" }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    );
};

import { Link, useNavigate } from "react-router-dom"
import "./navBar.css"

export const LocalNavBar = () => {
    // The useNavigate hook allows us to programmatically navigate between different routes
    const navigate = useNavigate()

    return (
        <ul className="navbar">

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/goal">
                    Goal
                </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/result">
                    Result
                </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">
                    Profile
                </Link>
            </li> */}
            
            {/* Conditional rendering based on the presence of a user in local storage */}
            {localStorage.getItem("sitePZ_user") ? (
                // If there is a user in local storage, display the Logout link
                <li className="navbar__item navbar__logout">
                    <Link
                        className="navbar__link"
                        to=""
                        onClick={() => {
                            // Remove the user from local storage
                            localStorage.removeItem("sitePZ_user");
                            // Navigate to the home page (replace the current URL)
                            navigate("/", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                // If there is no user in local storage, display an empty string (nothing)
                ""
            )}
        </ul>
    );
}

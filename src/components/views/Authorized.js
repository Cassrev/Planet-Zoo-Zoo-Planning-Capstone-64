import { Navigate, useLocation } from "react-router-dom"

// A component called "Authorized" is defined
export const Authorized = ({ children }) => {

    // The useLocation hook is used to get the current location object
    const location = useLocation()

    // Check if the "sitePZ_user" item exists in the localStorage
    if (localStorage.getItem("sitePZ_user")) {
        // If the "sitePZ_user" item exists, render the children components
        return children
    }
    else {
        // If the "sitePZ_user" item does not exist, redirect to the login page
        // using the Navigate component from react-router-dom
        return (
            <Navigate
                to={`/login/${location.search}`} // Redirects to the login page with the current search parameters
                replace // Replaces the current location in the history stack
                state={{ location }} // Passes the current location object as state to the login page
            />
        )
    }
}

import { useEffect, useState } from 'react';
import './profileStyle.css';
import { useNavigate } from 'react-router-dom';
import { ProfileIconPopup } from './ProfileIconPopup';

export const ProfileMain = ({ user }) => {
    const [userProfileIcon, setUserProfileIcon] = useState(null);
    const [userName, setUserName] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupContent, setShowPopupContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Define a function to fetch the user's icon
        const fetchUserIcon = async () => {
            // Make an HTTP GET request to the server, passing the user's ID as a query parameter
            const response = await fetch(`http://localhost:8088/accounts?id=${user.id}`);

            // Parse the response as JSON and assign it to the 'data' variable
            const data = await response.json();

            // Find the user's account object within the data array based on the user's ID
            const currentUser = data.find((account) => account.id === user.id);

            // Update the user profile icon state variable with the value from currentUser.profileIcon
            setUserProfileIcon(currentUser.profileIcon);
        };

        // Call the fetchUserIcon function when the component is mounted or when 'user.id' changes
        fetchUserIcon();
    }, [user.id]);

    useEffect(() => {
        // Define a function to fetch the user's name
        const fetchUserName = async () => {
            // Make an HTTP GET request to the server, passing the user's ID as a query parameter
            const response = await fetch(`http://localhost:8088/accounts?id=${user.id}`);

            // Parse the response as JSON and assign it to the 'data' variable
            const data = await response.json();

            // Find the user's account object within the data array based on the user's ID
            const currentUserName = data.find((account) => account.id === user.id);

            // Update the user name state variable with the value from currentUserName.userName
            setUserName(currentUserName.userName);
        };

        // Call the fetchUserName function when the component is mounted or when 'user.id' changes
        fetchUserName();
    }, [user.id]);

    const handleIconSave = async (newIconUrl) => {
        // Update the profile icon in the database
        const response = await fetch(`http://localhost:8088/accounts/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profileIcon: newIconUrl }),
        });

        // The response.ok property is a boolean value that tells us if the response from the server was successful.
        if (response.ok) {
            // Update the profile icon in the state
            setUserProfileIcon(newIconUrl);
            setShowPopup(false);
        } else {
            // Handle error if the request was not successful
            console.error('Failed to update profile icon');
        }
    };

    const handlePopupToggle = () => {
        setShowPopup(!showPopup);
        setShowPopupContent(false);
    };

    return (
        <section className="theVh">
            <div className="section-container">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12 col-xl-4 d-flex justify-content-center">
                            <div className="card card-lg" style={{ backgroundColor: 'rgba(66, 122, 83, 0.671)' }}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="mt-3 mb-4" onClick={handlePopupToggle}>
                                        {userProfileIcon ? (
                                            <img
                                                src={userProfileIcon}
                                                className="rounded-circle img-fluid"
                                                style={{ width: '200px' }}
                                                alt="Profile"
                                            />
                                        ) : (
                                            <div>Loading profile icon...</div>
                                        )}
                                        {showPopup && (
                                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                                <ProfileIconPopup onSave={handleIconSave} />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="mb-2">Hello, {userName}</h4>
                                    <button
                                        onClick={() => navigate('/result')}
                                        type="button"
                                        className="btn btn-primary btn-rounded btn-lg"
                                    >
                                        View Your Zoo Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

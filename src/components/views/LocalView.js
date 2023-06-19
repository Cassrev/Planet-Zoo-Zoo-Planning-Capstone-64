import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ResultContainer } from '../ResultPage/ResultContainer';
import { GoalMain } from '../GoalPage/goalsMain';
import { ProfileMain } from '../ProfilePage/profileMain';
import { LoadingScreen } from '../loadingScreen/LoadingScreen';

export const LocalViews = () => {
    const [loading, setLoading] = useState(true); // The initial value of loading is set to true.

    /* 
    Is used to simulate an asynchronous operation. It sets the value of loading to false after a delay of 2470 milliseconds. Since the dependency array [] is empty, the effect runs only once when the component mounts.
    ⬇️⬇️⬇️⬇️⬇️
    */
    useEffect(() => {
        // Simulate an async operation
        setTimeout(() => {
            setLoading(false);
        }, 3305);
    }, []);

    // Retrieves the value associated with the key "sitePZ_user" from the localStorage
    const localStorage_user = localStorage.getItem('sitePZ_user');

    // Parses the retrieved value from a string to a JavaScript object
    const user = JSON.parse(localStorage_user);

    return (
        <div>
            <Routes>
                {/* Use the `Route` component with the `element` prop */}
                <Route
                    path="/goal"
                    element={loading ? <LoadingScreen /> : <GoalMain user={user} />}
                />
                <Route
                    path="/result"
                    element={loading ? <LoadingScreen /> : <ResultContainer user={user} />}
                />
                <Route
                    path="/profile"
                    element={loading ? <LoadingScreen /> : <ProfileMain user={user} />}
                />
            </Routes>
        </div>
    );
};

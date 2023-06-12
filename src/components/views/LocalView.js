import { Route, Routes } from 'react-router-dom';
import { ResultContainer } from '../ResultPage/ResultContainer';
import { GoalMain } from '../GoalPage/goalsMain';
import { ProfileMain } from '../ProfilePage/profileMain';

export const LocalViews = () => {
    // Retrieves the value associated with the key "sitePZ_user" from the localStorage
    const localStorage_user = localStorage.getItem("sitePZ_user");

    // Parses the retrieved value from a string to a JavaScript object
    const user = JSON.parse(localStorage_user);

    return (
        <Routes>
            <Route path="/goal" element={<GoalMain user={user} />} />
            <Route path="/result" element={<ResultContainer user={user} />} />
            <Route path="/profile" element={<ProfileMain user={user} />} />

        </Routes>
    );
};

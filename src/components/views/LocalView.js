import { Outlet, Route, Routes } from "react-router-dom"
import { GoalMain } from "../GoalPage/goalsMain";
import { ResultMain } from "../ResultPage/resultMain";
import { ChoicesComponent, Result } from "../ResultPage/Result";

export const LocalViews = () => {
    return (
        <Routes>
            <Route path="/goal" element={<GoalMain />} />
            {/* <Route path="/result" element={<ResultMain />} />
            <Route path="/result" element={<Result />} /> */}
            <Route path="/result" element={<ChoicesComponent />} />
        </Routes>
    );
}
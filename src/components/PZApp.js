import { ApplicationViews } from "./views/ApplicationViews"
import { Route, Routes } from "react-router-dom";
import './PZApp.css';
import { Authorized } from "./views/Authorized";
import { LoginRegister } from "./auth/LoginRegister";
import { LogOutNav } from "./nav/logout";

export const PlanetZooApp = () => {
	return <Routes>
		<Route path="/login" element={<LoginRegister />} />

		<Route path="*" element={
				<Authorized>
					<>
						<LogOutNav />
						<ApplicationViews />
						
					</>
				</Authorized>

			}
		/>
	</Routes>
}
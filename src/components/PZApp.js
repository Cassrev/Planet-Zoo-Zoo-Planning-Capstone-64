import { ApplicationViews } from "./views/ApplicationViews"
import { Route, Routes } from "react-router-dom";
import './PZApp.css';
import { Authorized } from "./views/Authorized";
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";

export const PlanetZooApp = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />

		<Route path="/register" element={<Register />} />

		<Route path="*" element={
				<Authorized>
					<>
						<ApplicationViews />
					</>
				</Authorized>

			}
		/>
	</Routes>
}
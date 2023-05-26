import { ApplicationViews } from "./views/ApplicationViews"
import './App.css';

export const PlanetZooApp = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />

		<Route path="*" element={
				<Authorized>
					<>
						<NavBar />
						<ApplicationViews />
					</>
				</Authorized>

			}
		/>
	</Routes>
}
import { createRoot } from "react-dom/client" // Importing the 'createRoot' function
import "./index.css" // Importing the 'index.css' file
import { BrowserRouter } from "react-router-dom" // Importing the 'BrowserRouter' component
import { PlanetZooApp } from "./components/PZApp"
import 'bootstrap/dist/css/bootstrap.min.css';



const container = document.getElementById("root") // Getting the root element
const root = createRoot(container) // Creating a root using the 'container' element

root.render( // Rendering JSX code inside the root element
	<BrowserRouter> {/*Wrapping the component inside 'BrowserRouter'*/}
		<PlanetZooApp /> {/*Rendering the 'PlanetZooApp' component */}
	</BrowserRouter>
)

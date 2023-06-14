import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';
import useSound from 'use-sound';
import mouth_09_pop from '../sound/mouth_09_pop.mp3';
import "./customLog.css";
import "./animalText.css";

export const LoginRegister = () => {
	/*
	!What is the point of useState hook?
	⁡⁢⁢⁢State allows components to manage and update their data. In this case, the component uses state to manage the input values of userName and passWord (representing the login credentials), isShown (a boolean flag to show or hide the login/register form), profileIcon (the URL of the user's profile icon), and previewIcon (the URL of the previewed profile icon).⁡
	*/
	// State variables using useState hook
	const [userName, setUserName] = useState("");
	const [passWord, setPassword] = useState("");
	const [isShown, setIsShown] = useState(false);
	const [profileIcon, setProfileIcon] = useState("");
	const [previewIcon, setPreviewIcon] = useState("");


	const [playActive] = useSound(mouth_09_pop, { volume: 0.25 });
	const [playOn] = useSound(mouth_09_pop, { volume: 0.25 });
	const [playOff] = useSound(mouth_09_pop, { volume: 0.25 });

	/* 
	!What is the point of the useNavigate hook?
	⁡⁢⁢Is used to obtain a navigation function. It allows the component to navigate to different pages/routes of the application programmatically.⁡
	*/
	const navigate = useNavigate();

	// Toggles the visibility of the login/register form
	const handleClick = () => {
		setIsShown(current => !current);
	};

	// Handles the login process when the login form is submitted
	const handleLogin = (e) => {
		e.preventDefault();

		// Make a fetch request to the server to check if the user exists
		return fetch(`http://localhost:8088/accounts?userName=${userName}`)
			.then(res => res.json())
			.then(foundUsers => {
				if (foundUsers.length === 1) {
					const user = foundUsers[0];
					const userState = {
						id: user.id,
						userName: user.userName,
						passWord: user.password
					};

					// Store user data in local storage
					localStorage.setItem("sitePZ_user", JSON.stringify(userState));

					// Navigate to the "/goal" route
					navigate("/goal");
				} else {
					// Display an error message if login is invalid
					window.alert("Invalid login");
				}
			});
	};

	// Handles the registration process when the registration form is submitted
	const handleRegister = (e) => {
		e.preventDefault();

		// Check if the username is already taken
		return fetch(`http://localhost:8088/accounts?userName=${userName}`)
			.then(res => res.json())
			.then(response => {
				if (response.length > 0) {
					// Display an error message if the username is already taken
					window.alert("Account with that Username already exists");
				} else {
					// Register a new user
					registerNewUser();
				}
			});
	};

	// Updates the user data based on the input field
	const updateUser = (evt, field) => {
		const { value } = evt.target;
		if (field === "profileIcon") {
			setProfileIcon(value);
			setPreviewIcon(value); // Update preview icon
		} else {
			setUserName(value);
		}
	};

	// Registers a new user by sending a POST request to the server
	const registerNewUser = async () => {
		const user = {
			userName,
			passWord,
			profileIcon
		};

		// Make a POST request to create a new user
		const response = await fetch("http://localhost:8088/accounts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		});

		/* 
		This is responsible for extracting the JSON data from the response object returned by the server. The response body is expected to be a JSON object, representing the newly created user. The `response.json()` method is an async function that reads the response body and parses it as JSON.

		By using await before response.json(), the code waits for the promise to be fulfilled and assigns the resulting user object to the "createdUser" variable. This allows the code to access and work with the user's data returned by the server, such as the id property.
		⬇️⬇️⬇️⬇️⬇️
		*/
		const createdUser = await response.json();

		if (createdUser.hasOwnProperty("id")) {
			// Store user data in local storage
			localStorage.setItem("sitePZ_user", JSON.stringify({
				id: createdUser.id,
			}));

			// Navigate to the "/goal" route
			navigate("/goal");
		}
	};

	// JSX markup
	return (
		<>
			{/* Button to show the login/register form */}
			<div className="testingAn">test</div>
			<div className="buttonPlanningToggle">
				<button className="StartPlanningButton" onClick={handleClick}
					onMouseDown={playActive}
					onMouseUp={() => {
						handleClick ? playOff() : playOn();
					}}
				>
					Start Planning
				</button>
			</div>
			{/* Login/Register form */}
			{isShown && (
				<Container className="d-flex justify-content-center align-items-center vh-450">
					<Row>
						<Col xs={12} md={60}>
							<Tab.Container id="ex1" defaultActiveKey="pills-login">
								{/* Navigation tabs for login and registration */}
								<Nav justify variant="pills" className="mb-3 nav-pills-custom">
									<Nav.Item className="nav-item-custom">
										<Nav.Link eventKey="pills-login" className="custom-link nav-link-custom">Login</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item-custom">
										<Nav.Link eventKey="pills-register" className="custom-link nav-link-custom">Register</Nav.Link>
									</Nav.Item>
								</Nav>

								{/* Content of the login/register form */}
								<Tab.Content>
									{/* Login form */}
									<Tab.Pane eventKey="pills-login" >
										<Form onSubmit={handleLogin} className="form-custom">
											{/* Input field for username */}
											<Form.Group className="mb-4">
												<Form.Control
													type="userName"
													id="loginName"
													placeholder="Username"
													value={userName}
													onChange={(e) => setUserName(e.target.value)}
												/>
											</Form.Group>
											{/* Input field for password */}
											<Form.Group className="mb-4">
												<Form.Control
													type="password"
													id="loginPassword"
													placeholder="Password"
													value={passWord}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</Form.Group>
											{/* Button to submit the login form */}
											<Button variant="primary" className="btn-block mb-4 btn-dark-custom" type="submit">
												Log in
											</Button>
										</Form>
									</Tab.Pane>
									{/* Registration form */}
									<Tab.Pane eventKey="pills-register">
										<Form className="form-custom">
											{/* Input field for username */}
											<Form.Group className="mb-4">
												<Form.Control
													type="text"
													id="userName"
													placeholder="Create your Username"
													value={userName}
													onChange={(e) => updateUser(e, "userName")}
												/>
											</Form.Group>
											{/* Input field for password */}
											<Form.Group className="mb-4">
												<Form.Control
													type="password"
													id="registerPassword"
													placeholder="Register your Password"
													value={passWord}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</Form.Group>
											{/* Input field for profile icon link */}
											<Form.Group className="mb-4">
												<Form.Control
													type="text"
													id="profileIcon"
													placeholder="Profile Icon Link"
													value={profileIcon}
													onChange={(e) => updateUser(e, "profileIcon")}
												/>
											</Form.Group>
											{/* Preview of the profile icon */}
											{previewIcon && (
												<div className="mb-4">
													<p>Preview:</p>
													<img src={previewIcon} alt="Profile Icon" style={{ maxWidth: "100px" }} />
												</div>
											)}
											{/* Button to register a new user */}
											<Button
												variant="primary"
												className="btn-block mb-3"
												onClick={handleRegister}
											>
												Begin Planning
											</Button>
										</Form>
									</Tab.Pane>
								</Tab.Content>
							</Tab.Container>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

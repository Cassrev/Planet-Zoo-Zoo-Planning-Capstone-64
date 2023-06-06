import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';
import "./Login.css";

export const LoginRegister = () => {
	const [userName, setUserName] = useState("");
	const [passWord, setPassword] = useState("");
	const [isShown, setIsShown] = useState(false);
	const [profileIcon, setProfileIcon] = useState("");
	const [previewIcon, setPreviewIcon] = useState(""); // Added state for preview icon
	const navigate = useNavigate();

	const handleClick = (event) => {
		setIsShown(current => !current);
	};

	const handleLogin = (e) => {
		e.preventDefault();

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

					localStorage.setItem("sitePZ_user", JSON.stringify(userState));

					navigate("/goal");
				} else {
					window.alert("Invalid login");
				}
			});
	};

	const [user, setUser] = useState({
		userName: "",
		passWord: "",
	});

	const registerNewUser = async () => {
		const user = {
			userName,
			passWord,
			profileIcon
		};

		const response = await fetch("http://localhost:8088/accounts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		});

		const createdUser = await response.json();

		if (createdUser.hasOwnProperty("id")) {
			localStorage.setItem("sitePZ_user", JSON.stringify({
				id: createdUser.id,
			}));

			navigate("/goal");
		}
	};

	const handleRegister = (e) => {
		e.preventDefault();
		return fetch(`http://localhost:8088/accounts?userName=${user.userName}`)
			.then(res => res.json())
			.then(response => {
				if (response.length > 0) {
					window.alert("Account with that Username already exists");
				} else {
					registerNewUser();
				}
			});
	};

	const updateUser = (evt, field) => {
		const { value } = evt.target;
		if (field === "profileIcon") {
			setProfileIcon(value);
			setPreviewIcon(value); // Update preview icon
		} else {
			setUserName(value);
		}
	};

	return (
		<>
			<div className="buttonPlanningToggle">
				<button className="StartPlanningButton" onClick={handleClick}>
					Start Planning
				</button>
			</div>
			{isShown && (
				<Container className="d-flex justify-content-center align-items-center vh-450">
					<Row>
						<Col xs={12} md={60}>
							<Tab.Container id="ex1" defaultActiveKey="pills-login">
								<Nav justify variant="pills" className="mb-3">
									<Nav.Item>
										<Nav.Link eventKey="pills-login">Login</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="pills-register">Register</Nav.Link>
									</Nav.Item>
								</Nav>

								<Tab.Content>
									<Tab.Pane eventKey="pills-login">
										<Form onSubmit={handleLogin}>
											<Form.Group className="mb-4">
												<Form.Control
													type="userName"
													id="loginName"
													placeholder="Email or username"
													value={userName}
													onChange={(e) => setUserName(e.target.value)}
												/>
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Control
													type="password"
													id="loginPassword"
													placeholder="Password"
													value={passWord}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</Form.Group>
											<Button variant="primary" className="btn-block mb-4" type="submit">
												Log in
											</Button>
										</Form>
									</Tab.Pane>
									<Tab.Pane eventKey="pills-register">
										<Form>
											<Form.Group className="mb-4">
												<Form.Control
													type="text"
													id="userName"
													placeholder="Username"
													value={userName}
													onChange={(e) => updateUser(e, "userName")}
												/>
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Control
													type="password"
													id="registerPassword"
													placeholder="Password"
													value={passWord}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Control
													type="text"
													id="profileIcon"
													placeholder="Profile Icon Link"
													value={profileIcon}
													onChange={(e) => updateUser(e, "profileIcon")}
												/>
											</Form.Group>
											{previewIcon && (
												<div className="mb-4">
													<p>Preview:</p>
													<img src={previewIcon} alt="Profile Icon" style={{ maxWidth: "100px" }} />
												</div>
											)}
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

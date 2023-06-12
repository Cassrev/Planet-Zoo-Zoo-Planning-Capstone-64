import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// Go over to make sure it works
export const Login = () => {
	const [userName, setUserName] = useState("")
	const [passWord, setPassword] = useState("")
	const [isShown, setIsShown] = useState(false);
	const navigate = useNavigate()

	const handleClick = (event) => {
		// 👇️ toggle shown state
		setIsShown(current => !current);

		// 👇️ or simply set it to true
		// setIsShown(true);
	};

	const handleLogin = (e) => {
		e.preventDefault()

		return fetch(`http://localhost:8088/accounts?userName=${userName}`)
			.then(res => res.json())
			.then(
				foundUsers => {
					if (foundUsers.length === 1) {
						const user = foundUsers[0]
						const userState = {
							id: user.id,
							passWord: user.password
						}

						localStorage.setItem("sitePZ_user", JSON.stringify(userState))

						navigate("/goal")
					}
					else {
						// If no user is found with the entered email, display an error message
						window.alert("Invalid login");
					}
				}
			)
	}
	return (<><div className="toggleMain">
		<div className="buttonPlanningToggle"><button className="StartPlanningButton" onClick={handleClick}>Start Planning</button></div>
	


		<div className='toggle--container'>
			{isShown && (
				<div className="container--login">
					<section>
						<form className="form--login" onSubmit={handleLogin}>
							<fieldset>
								<label htmlFor="inputUserName"> Account Name </label>
								<input type="username"
									value={userName}
									onChange={evt => setUserName(evt.target.value)}
									className="form-control"
									placeholder="Username"
									required autoFocus />
							</fieldset>
							<fieldset>
								<label htmlFor="inputPassword"> Password </label>
								<input type="password"
									value={passWord}
									onChange={evt => setPassword(evt.target.value)}
									className="form-control"
									placeholder="Password"
									required autoFocus />
							</fieldset>

							<fieldset>
								<button className="arrowButton" type="submit">
									Log in
								</button>
							</fieldset>
						</form>
					</section>
				</div>)}
			{isShown && (
				<section className="link--register">
					{/* Link to the registration page */}
					<Link to="/register">Create your account</Link>
				</section>
			)}
		</div>
		</div>
	</>
	)
}
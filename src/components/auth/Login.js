import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// Go over to make sure it works
export const Login = () => {
	const [userName, passWord] = useState("")
	const navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()

		return fetch(`http://localhost:8088/users?userName=${userName}`)
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

						navigate("/")
					}
					else {
						const user = foundUsers[0]
						const userState = {
							id: user.id,
							passWord: user.password
						}
						localStorage.setItem("sitePZ_user", JSON.stringify(userState))

						navigate("/")
					}
				}
			)
	}
return (
    <>
    <main className="container--login">
			<section>
				<form className="form--login" onSubmit={handleLogin}>
					<fieldset>
						<label htmlFor="inputUserName"> Account Name </label>
						<input type="username"
							value={userName}
							onChange={evt => set(evt.target.value)}
							className="form-control"
							placeholder="Username"
							required autoFocus />
					</fieldset>
					<fieldset>
						<label htmlFor="inputPassword"> Password </label>
						<input type="password"
							value={passWord}
							onChange={evt => set(evt.target.value)}
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
			<section className="link--register">
                <Link to="/register">Create your account</Link>
            </section>
		</main>
    </>
)
}
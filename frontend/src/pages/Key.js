import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.scss";

const Key = () => {
	const location = useLocation();
	const [formData, setFormData] = useState({
		Email: "",
		Name: "",
	});
	const [key, setKey] = useState("");
	const [msg, setMsg] = useState("");

	useEffect(() => {
		setFormData({
			Email: "",
			Name: "",
		});
		setKey("");
		setMsg("");
	}, [location.pathname]);

	const handleFormData = (event) => {
		event.preventDefault();
		let url =
			location.pathname === "/createKey" || location.pathname === "/"
				? `http://localhost:5000/signup/`
				: `http://localhost:5000/login/`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setKey(data.Key);
				setMsg(data.Message);
				console.log(key);
				localStorage.setItem("API", data.Key);
				console.log(localStorage.getItem("API"));
			})
			.catch((err) => console.log(err));

		setFormData({
			Email: "",
			Name: "",
		});
	};

	// useEffect(() => {
	// 	const data = window.localStorage.getItem("API")
	// 	if(!data){
	// 		window.location.reload()
	// 	}
	// }, [key]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div>
			{location.pathname === "/createKey" || location.pathname === "/" ? (
				<h1>Generate an API key</h1>
			) : (
				<h1>Find Your API Key</h1>
			)}
			<div className="form">
				<div>
					<form onSubmit={handleFormData}>
						<label>Enter Your Email: </label>
						<input
							type="email"
							name="Email"
							placeholder="Enter Email"
							value={formData.Email}
							onChange={handleInputChange}
							required
						/>
						{location.pathname === "/createKey" || location.pathname === "/" ? (
							<>
								<label>Enter Your Name: </label>
								<input 
									type="text"
									name="Name"
									placeholder="Enter name"
									value={formData.Name}
									onChange={handleInputChange}
									required
								/>
							</>
						) : (
							<></>
						)}

						<button type="submit">Get Key</button>
					</form>
				</div>
			</div>
			{key ? (
				<div className="msg">
					<div>
						<h2>{msg}</h2>
						<h2>API Key: {key}</h2>
					</div>
				</div>
			) : (
				<br />
			)}
		</div>
	);
};

export default Key;

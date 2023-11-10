import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../App.scss";

const Add = () => {
	const [key, setKey] = useState("");
	useEffect(() => {
		setKey(localStorage.getItem("API"));
	});
	const initialFormData = {
		name: "",
		age: "",
		breed: "",
		owner: "",
		feed: [],
		supplements: [],
		shoes: null,
		farrier: "",
		forSale: null,
	};
	const [formData, setFormData] = useState(initialFormData);
	const [msg, setMsg] = useState("");
	const [horses, setHorses] = useState([]);

	const handleFormData = (event) => {
		event.preventDefault();
		let url = `http://localhost:5000/horses/add`;
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
				setMsg(data.Message);
				setHorses(data.Horses);
				console.log(horses);
			})
			.catch((err) => console.log(err));

		setFormData(initialFormData);
		// history.push('/horses')
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "feed" || name === "supplements") {
			const feedArray = value.split(","); // Splitting the feed input by comma
			setFormData((prevState) => ({
				...prevState,
				[name]: feedArray,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	return (
		<div>
			{key ? (
				<>
					<h1>Add a Horse</h1>
					<div className="form">
						<div>
							<form onSubmit={handleFormData}>
								<input
									value={formData.name}
									name="name"
									type="text"
									placeholder="Horse Name"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									value={formData.age}
									name="age"
									type="number"
									placeholder="Horse's age"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									value={formData.breed}
									name="breed"
									type="text"
									placeholder="Horse's breed"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									value={formData.owner}
									name="owner"
									type="text"
									placeholder="Owner's Name"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									value={formData.feed}
									name="feed"
									type="text"
									placeholder="Feed"
									onChange={handleInputChange}
									required
								/>
								<br />
								<input
									value={formData.supplements}
									name="supplements"
									type="text"
									placeholder="Supplements"
									onChange={handleInputChange}
									required
								/>
								<br />
								<label>Does this horse need shoes?</label>
								<br />
								<div onChange={handleInputChange}>
									<input
										value="true"
										name="shoes"
										type="radio"
										defaultChecked
										// checked={formData.shoes === true}
									/>
									<label>Yes</label>
									<br />
									<input
										value="false"
										name="shoes"
										type="radio"
										// checked={formData.shoes === true}
										// onChange={handleInputChange}
									/>
									<label>No</label>
								</div>

								<br />
								<input
									value={formData.farrier}
									name="farrier"
									type="text"
									placeholder="Farrier Appointment(mm/dd/yy)"
									onChange={handleInputChange}
									required
								/>
								<br />
								<label>Is this horse for sale?</label>
								<br />

								<div onChange={handleInputChange}>
									<input
										type="radio"
										value="true"
										name="forSale"
										defaultChecked
										// checked={formData.forSale === true}
									/>
									<label>Yes</label>
									<br />
									<input
										type="radio"
										value="false"
										name="forSale"
										// checked={formData.forSale === true}
										// onChange={handleInputChange}
									/>
									<label>No</label>
								</div>

								<br />
								<button type="submit">Add horse</button>
							</form>
						</div>
					</div>
					{msg ? (
						<>
							<Navigate to={"/horses"} state={{ message: msg }} />
						</>
					) : (
						<br />
					)}
				</>
			) : (
				<h1>You must have a valid api key to view this page</h1>
			)}
		</div>
	);
};

export default Add;

import React, { forwardRef, useEffect, useState } from "react";
import "../App.scss";
import { Params, redirect, useParams } from "react-router-dom";


const Update = () => {
	const [key, setKey] = useState("")
	useEffect(() =>{
		setKey(localStorage.getItem('API'))
	})
	let { id } = useParams();
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
	const [horse, setHorse] = useState([]);

	

	// Some function that will use the id to get the horse data from the API
	function loadAPI() {
		let geturl = `http://localhost:5000/findHorse/${id}`;
		fetch(geturl)
			.then((data) => data.json())
			.then((data) => {
				console.log(data.Horse[0]);
				setHorse(data.Horse[0]);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
	}, []);

	useEffect(() => {
		setFormData({
			name: horse.Name,
			age: horse.Age,
			breed: horse.Breed,
			owner: horse.Owner,
			feed: horse.FeedType,
			supplements: horse.Supplements,
			shoes: horse.HasShoes,
			farrier: horse.FarrierAppointment,
			forSale: horse.ForSale,
		});
		console.log(formData);
	}, [horse]);

	const handleFormData = (event) => {
		event.preventDefault();
		let url = `http://localhost:5000/horses/edit/${id}`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) => {
				setMsg(data.Message);
			})
			.catch((err) => console.log(err));

		setFormData(initialFormData);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<div>
			{
				key? <><h1>Edit {formData.name}</h1><div className="form">
					<div className="updateform">
						<input
							value={formData.name}
							name="name"
							type="text"
							placeholder="Horse Name"
							onChange={handleInputChange}
							required />
						<br />
						<input
							value={formData.age}
							name="age"
							type="number"
							placeholder="Horse's age"
							onChange={handleInputChange}
							required />
						<br />
						<input
							value={formData.breed}
							name="breed"
							type="text"
							placeholder="Horse's breed"
							onChange={handleInputChange}
							required />
						<br />
						<input
							value={formData.owner}
							name="owner"
							type="text"
							placeholder="Owner's Name"
							onChange={handleInputChange}
							required />
						<br />
						<input
							value={formData.feed}
							name="feed"
							type="text"
							placeholder="Feed"
							onChange={handleInputChange}
							required />
						<br />
						<input
							value={formData.supplements}
							name="supplements"
							type="text"
							placeholder="Supplements"
							onChange={handleInputChange}
							required />
						<br />
						<label>Does this horse need shoes?</label>
						<br />
						<div onChange={handleInputChange}>
							<input
								value="true"
								name="shoes"
								type="radio"
								checked={formData.shoes === true} />
							<label>Yes</label>
							<br />
							<input
								value="false"
								name="shoes"
								type="radio"
								checked={formData.shoes === false} />
							<label>No</label>
						</div>

						<br />
						<input
							value={formData.farrier}
							name="farrier"
							type="text"
							placeholder="Farrier Appointment(mm/dd/yy)"
							onChange={handleInputChange}
							required />
						<br />
						<label>Is this horse for sale?</label>
						<br />

						<div onChange={handleInputChange}>
							<input
								type="radio"
								value="true"
								name="forSale"
								checked={formData.forSale === true} />
							<label>Yes</label>
							<br />
							<input
								type="radio"
								value="false"
								name="forSale"
								checked={formData.forSale === false} />
							<label>No</label>
						</div>

						<br />
						<button onClick={handleFormData}>Update Horse</button>
					</div>
				</div>
				{msg ? <><Navigate to={"/horses"} state={{message: msg}} /></>: <br />}</>
			:(
				<h1>You must have a valid api key to view this page</h1>
			)}
			
		</div>
	);
};

export default Update;

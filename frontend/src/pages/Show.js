import React, { useEffect, useState } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Show = (props) => {
	const [key, setKey] = useState("")
	useEffect(() =>{
		setKey(localStorage.getItem('API'))
	})
	const location = useLocation();
	const data = location.state?.message;
	
	const [horses, setHorses] = useState([""]);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		let url = "http://localhost:5000/horses";
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setHorses(data.Horses);
			})
			.catch((err) => console.log(err));
	}, []);

	function deleteHorse(id) {
		const getUrl = `http://localhost:5000/horses/delete/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setHorses(data.Horses);
				setMsg(data.msg);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			{
				key? 
				<><h1>All Horses</h1>
				{data ? <h2>{data}</h2> : <></>}
			{horses && horses.length > 0 ? (
				<div className="horses">
					{horses?.map((horse) => (
						<div className="horseCard">
							<div className="horse">
								<h4>
									<b>{horse.Name}</b>
								</h4>
								<h5>
									<b>Age:</b> {horse.Age}
								</h5>
								<h5>
									<b>Breed:</b> {horse.Breed}
								</h5>
								<h5>
									<b>Owner's Name:</b> {horse.Owner}
								</h5>
								<h5>
									<b>List of Feed:</b>{" "}
								</h5>
								<ul>
									{horse.FeedType?.map((feed) => (
										<li>
											<h5>{feed}</h5>
										</li>
									))}
								</ul>
								<h5>
									<b>List of Supplements</b>
								</h5>
								<ul>
									{horse.Supplements?.map((supp) => (
										<li>
											<h5>{supp}</h5>
										</li>
									))}
								</ul>

								<h5>
									<b>Does this horse have shoes?</b>{" "}
									{horse.HasShoes === true ? "Yes" : "No"}
								</h5>
								<h5>
									<b>Next Farrier Appointment:</b> {horse.FarrierAppointment}
								</h5>
								<h5>
									<b>Is this horse for sale?</b>{" "}
									{horse.ForSale === true ? "Yes" : "No"}
								</h5>
								<Link to={`/update/${horse._id}`}>Edit</Link>
								<a href="#" onClick={() => deleteHorse(horse._id)}>
									Delete
								</a>
							</div>
						</div>
					))}
					<div></div>
				</div>
			) : (
				<br />
			)}</>
			:(
				<h1>You must have a valid api key to view this page</h1>
			)}
			
		</div>
	);
};

export default Show;

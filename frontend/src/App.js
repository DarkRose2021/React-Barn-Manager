import "./App.scss";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Add from "./pages/Add";
import Show from "./pages/Show";
import Update from "./pages/Update";
import Key from "./pages/Key";
import { useEffect, useState } from "react";

function App() {
	const [key, setKey] = useState("")
	useEffect(() =>{
		setKey(localStorage.getItem('API'))
	})
	function localClear() {
		localStorage.clear();
	}
	return (
		<div>
			
			<div className="layout">
				<BrowserRouter>
					<header>
						<nav
							className="navbar navbar-expand-sm navbar-toggleable-sm mb-3"
							id="top"
						>
							
							<div className="container-fluid">
								<button
									className="navbar-toggler"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target=".navbar-collapse"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
									
								{
				key? <><ul className="navbar-nav flex-grow-1">
											<li className="nav-item">
												<NavLink to="/horses" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
													All Horses
												</NavLink>
											</li>
											<li className="nav-item">
												<NavLink to="/add" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
													Add a Horse
												</NavLink>
											</li>
										</ul><NavLink to="/getKey" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
												Get Key
											</NavLink><NavLink to="/createKey" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
												Create Key
											</NavLink><a href="#" onClick={() => localClear()} className="nav-link">Clear Key</a></>
			 :(
				<><NavLink to="/getKey" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
													Get Key
												</NavLink><NavLink to="/createKey" className={({ isActive, isPending }) => isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"}>
														Create Key
													</NavLink><a href="#" onClick={() => localClear()} className="nav-link">Clear Key</a></>
			)}
								</div>
							</div>
						</nav>
					</header>
					<div>
						<Routes>
							<Route path="/add" element={<Add />} />
							<Route path="/update/:id" element={<Update />} />
							<Route path="/horses" element={<Show />} />
							<Route path="/yourHorses" element={<Show />} />
							<Route path="/getKey" element={<Key />} />
							<Route path="/createKey" element={<Key />} />
							<Route path="/" element={<Key />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;

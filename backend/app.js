const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const dal = require("./dal").dal;
const port = 5000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json("Barn manager backend");
});

app.get("/horses", async (req, res) => {
	let horses = await dal.read();
	res.json({ Message: "", Horses: horses });
});

app.get("/findHorse/:id", async (req, res) => {
	let id = req.params.id;
	let horse = await dal.findHorse(id);
	res.json({ Message: "", Horse: horse });
});

app.get("/horses/add", async (req, res) => {
	res.json("Adding a horse");
});

app.post("/horses/add", async (req, res) => {
	let name = req.body.name;
	let age = req.body.age;
	let breed = req.body.breed;
	let owner = req.body.owner;
	let feed = req.body.feed;
	let supplements = req.body.supplements;
	let shoes = req.body.shoes;
	let farrier = req.body.farrier;
	let forSale = req.body.forSale;
	dal.createHorse(
		name,
		age,
		breed,
		owner,
		feed,
		supplements,
		shoes,
		farrier,
		forSale
	);

	let horses = await dal.read();
	return res.json({ Message: `${name} was added`, Horses: horses });
}); 

app.get("/horses/add", async (req, res) => {
	res.json("Adding a horse");
});

app.get("/horses/edit", async (req, res) => {
	res.json("editing a horse");
});

app.post("/horses/edit/:id", async (req, res) => {
	let id = req.params.id;
	let name = req.body.name;
	let age = req.body.age;
	let breed = req.body.breed;
	let owner = req.body.owner;
	let feed = req.body.feed;
	let supplements = req.body.supplements;
	let shoes = req.body.shoes;
	let farrier = req.body.farrier;
	let forSale = req.body.forSale;
	dal.update(
		id,
		name,
		age,
		breed,
		owner,
		feed,
		supplements,
		shoes,
		farrier,
		forSale
	);
	let horses = await dal.read();
	return res.json({ Message: `${name} was updated`, Horses: horses });
});

app.get("/horses/delete/:id", async (req, res) => {
	id = req.params.id;
	dal.del(id);
	let horses = await dal.read();
	res.json({ Message: `Horse deleted`, Horses: horses });
});

app.get("/login", async (req, res) => {
	res.json("loginpage");
});

app.post("/login", async (req, res) => {
	const formData = req.body;
    let info = await dal.checkLogin(formData.Email)
    let key = info.Key
    res.json({Message:"Api key found", Key: key})
});

app.post("/signup", async (req, res) => {
    const formData = req.body;
	let role = "boarder"

    let existingUser = await dal.checkLogin(formData.Email)
    if(existingUser){
        return res.json({Message: "Email already in use", Key: existingUser.Key})
    }else{
        const key = uuidv4();
		dal.addUser(formData.Email, key, formData.Name, role);
		return res.json({ Message: `${formData.Name} was added`, Key: key });
    }
});

app.listen(port, () => {
	console.log("listening on port " + port);
});

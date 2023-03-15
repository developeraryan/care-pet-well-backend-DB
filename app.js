//imports , Modules
const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
const users = require("./routes/api/users");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const port = process.env.port || 4200;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect Database
connectDb();
//setting up schema
const userSchema = new mongoose.Schema({
  name: { type: "string", required: [true, "Enter Your Name"] },
  gender: { type: "string", required: [true, "what's your gender"] },
});
//setting up modelS
const NewUsers = new mongoose.model("user", userSchema);

//creating data
const user = new NewUsers({
  name: "aryan",
  gender: "male",
});



//Local host port running on this
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

//Get request on home route
app.get("/", (req, res) => {
  res.send("hi welcome");
});

app.get("/getallusers", (req, res) => {
  async function getData() {
  let user  = await NewUsers.find({}).exec();;
  console.log(user);
  res.send(user);
} 
getData();
});


app.post("/", (req, res) => {
  // console.log(req.params.name);
  // console.log(req.params.gender);
});
app.post("/adduser",(req,res)=> {
  console.log("name",req.body.name);
  console.log("gender",req.body.gender);
  const user = new NewUsers({
    name: req.body.name,
    gender: req.body.gender,
  });
  user
  .save()
  .then(() => {
    res.send("data set");
  })
  .catch((e) => {
    res.send(`there's some error ${e}`);
  });
  
})

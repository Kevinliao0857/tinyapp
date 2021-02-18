const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const { urlDatabase, usersData, generateRandomString } = require ("./helpers");
const { req } = require("express");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieParser())


app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  console.log("User in URLs")
  const userID = req.cookies.user_id
  const templateVars = {user: usersData[userID], urls: urlDatabase};
  console.log(templateVars)
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  // console.log(req.body);  
  const longURL = req.body.longURL
  const shortURL = generateRandomString()
  urlDatabase[shortURL] = longURL
  res.redirect(`/urls/${shortURL}`);       
});

app.get("/urls/new", (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = {user: usersData[userID]}
  res.render("urls_new", templateVars);
  console.log("User going to New")
});

app.get("/urls/:shortURL", (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: usersData[userID]};
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL]
  res.redirect("/urls")
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});


//log in, log out
app.get("/login", (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = {user: usersData[userID]}
  res.redirect("/urls_login", templateVars);
});

app.post("/login", (req, res) => {
  const userID = req.body;
  console.log(userID)
  res.cookie("user_id", userID);
  res.redirect("/urls");
});

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls');
})



// registration
app.get("/register", (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = {user: usersData[userID]}
  res.render("urls_registration", templateVars)
});
  




app.post("/register", (req, res) => {
const userID = req.cookies.user_id
const templateVars = {user: usersData[userID]}
if (req.body.email === '' || req.body.password === '') {
  res.status(400).send("Missing information in the required fields!");
} 

if (usersData[userID]) {
 res.status(400).send("Username already exists")
} else {
  const userID = generateRandomString();
    usersData[userID] = {
      userID,
      email: req.body.email,
      password: req.body.password
    };
    console.log(userID)
    res.cookie("user_id", userID);
    res.redirect("/urls")
}  
});
 




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

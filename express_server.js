const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const { urlDatabase, usersData, generateRandomString, checkForEmail, checkForPassword, urlOwner } = require("./helpers");
const { req, request, response } = require("express");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieParser());


//*********Web pages ************/

app.get("/", (req, res) => {
  res.redirect("/urls");
});

// redirection to login screen verion

app.get("/urls", (req, res) => {
  console.log("User in URLs")
  const userID = req.cookies.user_id
  const userURLs = urlOwner(userID, urlDatabase)
  const templateVars = {user: usersData[userID], urls: userURLs};
  if (usersData[userID] === undefined) {
    res.redirect("/login")
  } else {
  console.log(templateVars)
  res.render("urls_index", templateVars);
  }
});


// redirecting users to login

app.get("/urls/new", (req, res) => {
  const userID = req.cookies.user_id;
  const templateVars = {user: usersData[userID]};
  if (usersData[userID] === undefined) {
    res.redirect("/login");
  } else {
    res.render("urls_new", templateVars);
    console.log("User going to New");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const userID = req.cookies.user_id;
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: usersData[userID]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});



// log in get 
app.get("/login", (req, res) => {
  const userID = req.cookies.user_id;
  const templateVars = {user: usersData[userID]};
  res.render("urls_login", templateVars);
});


// registration
app.get("/register", (req, res) => {
  const userID = req.cookies.user_id;
  const templateVars = {user: usersData[userID]};
  res.render("urls_registration", templateVars);
});


app.get("*", (req, res) => {

res.redirect("/login")
})

//***************Posts ********/


app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

//url rando link gen
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});



// log in post
app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (checkForEmail(email) && checkForPassword(password)) {
    const user = checkForEmail(email)
    // console.log(user);
    res.cookie("user_id", user.id);
    res.redirect("/urls");
  } else if (checkForEmail(email)) {
    res.status(403).send("Wrong password");
  } else {
    res.status(403).send("User doesn't exist");
  }
});



// log out post
app.post("/logout", (req, res) => {
  const userID = req.cookies.user_id;
  res.clearCookie("user_id", userID);
  res.redirect("/urls");
});

  
// register post
app.post("/register", (req, res) => {
  const email = req.body.email;
  if (email === '' || req.body.password === '') {
    res.status(400).send("Missing information in the required fields!");
  } else if (checkForEmail(email)) {
    res.status(400).send("Username already exists");
  } else {
    const userID = generateRandomString();
    usersData[userID] = {
      userID,
      email: email,
      password: req.body.password
    };
    console.log(userID);
    res.cookie("user_id", userID);
    res.redirect("/urls");
  }
});
 



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt")

const { urlDatabase, users, generateRandomString, checkForEmail, urlOwner } = require("./helpers");
const { req, request, response } = require("express");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(cookieSession({
  name: "session",
  keys: ["hello", "goodbye"]
}));


//*********Web pages ************/

app.get("/", (req, res) => {
  const templateVars = {
    user: null
  };
  res.redirect("/register", templateVars);
});

// log in get 
app.get("/login", (req, res) => {
  const templateVars = {
    user: null
  };
  res.render("urls_login", templateVars);
});

// registration
app.get("/register", (req, res) => {
  const userID = req.session.user_id;
  const templateVars = {user: users[userID]};
  res.render("urls_registration", templateVars);
});

// redirection to login screen verion

app.get("/urls", (req, res) => {
  const userID = req.session.user_id
  const userURLs = urlOwner(userID, urlDatabase)
  const templateVars = {user: users[userID], urls: userURLs};
  if (users[userID] === undefined) {
    res.redirect("/login")
  } else {
  console.log(templateVars)
  res.render("urls_index", templateVars);
  }
});

// redirecting users to login

app.get("/urls/new", (req, res) => {
  const userID = req.session.user_id;
  const templateVars = {user: users[userID]};
  if (users[userID] === undefined) {
    res.redirect("/login");
  } else {
    res.render("urls_new", templateVars);
    console.log("User going to New");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const userID = req.session.user_id;
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: users[userID]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});




//***************Posts ********/

//url rando link gen
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});


app.post("/urls/:shortURL/delete", (req, res) => {
  const id = req.session.user_id;
  const shortURL = req.params.shortURL;
  if (id === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
  res.redirect("/urls");
  } else {
    res.status(403).send("Ruh Roh");
  }
});



// log in post
app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const passwordCheck = checkForEmail(email)

  if (checkForEmail(email) && bcrypt.compareSync(password, passwordCheck.password)) {
    const user = checkForEmail(email)
    // console.log(user);
    req.session.user_id = user.id;
    res.redirect("/urls");
  } else if (checkForEmail(email)) {
    res.status(403).send("Wrong password");
  } else {
    res.status(403).send("User doesn't exist");
  }
});



// log out post
app.post("/logout", (req, res) => {
  res.clearCookie("session");
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
    users[userID] = {
      userID,
      email: email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    console.log(users.password)
    console.log(userID);
    req.session.user_id = userID;
    res.redirect("/urls");
  }
});
 



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const usersData = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  },
  "guy": {
    id: "guy",
    email: "testing@example.com",
    password: "123"
  }
}


const generateRandomString = (length = 6) => {
  return Math.random().toString(36).substr(2, length)
  }


const checkForEmail = (email) => {
  for (const userID in usersData) {
    if (email === usersData[userID].email) {
      return usersData[userID];
    }
  }
  return false
};

const checkForPassword = (password) => {
  for (const userID in usersData) {
    if (password === usersData[userID].password) {
      return usersData[userID];
    }
  }
  return false
};

  module.exports = {
    urlDatabase,
    usersData,
    generateRandomString,
    checkForEmail,
    checkForPassword
  }
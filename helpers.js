const urlDatabase = {
  b2xVn2: { longURL: "http://www.lighthouselabs.ca", userID: "aJ48lW" },
  Ysm5xK: { longURL: "http://www.google.com", userID: "aJ48lW" },
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const users = { 
  "aJ48lW": {
    id: "aJ48lW", 
    email: "user@example.com", 
    password: "$2b$10$M1rpN0K5Lf4ft1H1ufVCSOlkSDjHBgwtq39q6uQH4x0geOumAjW9e"
  },
}


const generateRandomString = (length = 8) => {
  return Math.random().toString(36).substr(2, length).slice(1, -1)
  }


const checkForEmail = (email) => {
  for (const userID in users) {
    if (email === users[userID].email) {
      return users[userID];
    }
  }
  return false
};


const urlOwner = (obj, database) => {
  let userUrls = {};
  for (const shortURL in database) {
    if (database[shortURL].userID === obj) {
      userUrls[shortURL] = database[shortURL];
    }
  }
  return userUrls;
};

  module.exports = {
    urlDatabase,
    users,
    generateRandomString,
    checkForEmail,
    urlOwner

  }
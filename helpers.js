const urlDatabase = {
  b2xVn2: { longURL: "http://www.lighthouselabs.ca", userID: "ak47lW" },
  Ysm5xK: { longURL: "http://www.google.com", userID: "ak47lW" },
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const usersData = { 
  "aJ48lW": {
    id: "aJ48lW", 
    email: "user@example.com", 
    password: "123"
  },
 "ak47lW": {
    id: "ak47lW", 
    email: "user2@example.com", 
    password: "321"
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


//for later use when login bug is fixed

// const urlOwner = (obj, userID) => {
//   let newObj = {};
//   for (let i in obj) {
//     if (obj[i].userID === userID) {
//       newObj[i] = obj[i];
//     }
//   }
//   return newObj;
// };

  module.exports = {
    urlDatabase,
    usersData,
    generateRandomString,
    checkForEmail,
    checkForPassword
  }
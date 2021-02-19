const { assert } = require('chai');

const { checkForEmail, urlOwner } = require('../helpers');

const testUsers = {
  "aJ48lW": {
    id: "aJ48lW", 
    email: "user@example.com", 
    password: "$2b$10$M1rpN0K5Lf4ft1H1ufVCSOlkSDjHBgwtq39q6uQH4x0geOumAjW9e"
  },
  "123456": {
    id: "12345", 
    email: "mouseexample.com", 
    password: "321"
  },
  "789101": {
    id: "78910", 
    email: "test@example.com", 
    password: "123"
  }
}
describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = checkForEmail("user@example.com", testUsers)
    const expectedOutput = "aJ48lW";
    assert.equal(testUsers.userRandomID);
  });
});


const testUrls = {
  'abcd': {
    longURL: 'http://www.google.ca',
    userID: 'Kevin'
  },
  'xywz': {
    longURL: 'http://www.ask.com',
    userID: 'John'
  },
  'jfkd': {
    longURL: 'http://www.cbc.com',
    userID: 'Kevin'
  }
};

describe('#urlOwner', () => {
  it('should return the matching user', () => {
    const userUrls = urlOwner('Kevin', testUrls);
    const expectedResult = {
      'abcd': {
        longURL: 'http://www.google.ca',
        userID: 'Kevin'
      },
      'jfkd': {
        longURL: 'http://www.cbc.com',
        userID: 'Kevin'
      }
    };

    assert.deepEqual(userUrls, expectedResult);
  });

  it('should return an empty object if no user', () => {
    const userUrls = urlOwner('crystal', testUrls);
    assert.deepEqual(userUrls, {});
  });
});
const mysql = require('../../server_modules/mysql-connection');
const jwt = require('jsonwebtoken');
const easyTime = require('../../server_modules/easy-time');

function jwtSignUser(user) {
  return jwt.sign(user, "secret", {
    expiresIn: easyTime.getSeconds(0,0,1)
  })
}

module.exports.createUser = function userSignup(req, res){
  if (req.body) {
    const {username, password} = req.body;
    let query = "INSERT INTO user VALUES(?,?,?,?);";
    (async () => {
      let sqlResponse = await mysql.mysqlQuery(query, [username, password, 0, 0], "post");
      //Huono tapa katsoa onko samoja käyttäjänimiä
      if(sqlResponse.errno === 1062){
        return res.status(403).json({
          error: "dublicate",
        });
      }

      const userJson = {
        'username': username,
        'password': password
      }
      res.json(userJson);
    })();
  } else {
    console.log("no");
    res.status(403).end();
  }
}

module.exports.userLogin = function userLogin(req, res){

  const {username, password} = req.body;
  let query = "SELECT count(*) AS 'found' FROM user WHERE userName = ? AND password = ?";

  mysql.mysqlQuery(query, [username, password], "post")
  .then( (mysqlResponse) => {
    if(mysqlResponse[0].found === 0){
      return res.status(403).send({
        error: "Login information incorrect"
      });
    }

    const userJson = {
      'username': username,
      'password': password
    }

    res.send({
      user: userJson,
      token: jwtSignUser(userJson)
    });
  });
}

module.exports.userVerify = function userVerify(req, res){
  try {
    const token = req.body.token;
    const tokenDecoded = jwt.verify(token, "secret");
    return res.json({
      error: false,
      data: tokenDecoded,
      verify: true
    });
  } catch (error) {
    res.json({
      error: true,
      data: error,
      verify: false
    })
  }
}
module.exports.userLoginTest = function userLoginTest(req, res){
  let user = req.body;
  const token = jwtSignUser(user);
  res.json({
    token: token
  })
}
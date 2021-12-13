const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const url = require('url');
const multer = require('../../server_modules/multer-storage')

module.exports.getImage = (req, res) =>{
  const path = (multer.path+ "\\").replace(/\\/g,"\\\\");
  const regexPath = new RegExp('^'+path, 'g');
  console.log(regexPath);
  console.log("multer path :: "+ path);
  console.log("req path :: "+ req.query.path);
  if(req.query.path.match(regexPath)){
    let filename = req.query.path.replace(regexPath, '')
    console.log(filename);
    res.sendFile(req.query.path);
    /*const reader = fs.createReadStream(req.query.path);
    const passThrough = new stream.PassThrough()
    stream.pipeline(reader,passThrough,(err => {
      if(err){
        console.log(err);
        return res.status(404).send(err);
      }
    }))
    passThrough.pipe(res);
  } else{
    res.status(403).send({
      error: "Path didn't match or didn't find parameters"
    })*/
  }
}
module.exports.getSubmissionData = (req, res)=>{
  let arg = url.parse(req.url, true).query;
  const query = "SELECT id, imageFilepath FROM battle_submission WHERE battleId = ?";

  (async () => {
    const mysqlResponse = await mysql.mysqlQuery(query,arg[Object.keys(arg)[0]] , req.method);
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    res.status(status).send(mysqlResponse);
  })();
}
const whiteList = ['http://127.0.0.1:8081', 'http://127.0.0.1:8080'
    , 'http://localhost:8080', 'http://192.168.0.100:8080'];
let corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log("request header was " + req.header('Origin'));
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        console.log("Origin was found and set true");
        corsOptions = {
            origin: true,
        }
    } else{
        corsOptions = { origin: false};
    }
    return callback(null, corsOptions);
}

module.exports = corsOptionsDelegate;
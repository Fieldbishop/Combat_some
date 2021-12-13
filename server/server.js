/**
 * Basic requirement
 */
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
/**
 * Server_modules
 */
const storageProcess = require('./server_modules/multer-storage');
const corsOptions = require('./server_modules/cors-local');
/**
 *  Server_functions
 */
const leaderBoards = require('./server_functions/user_management/leaderboards');
const userStats = require('./server_functions/user_management/user-statistics');
const userManagement = require('./server_functions/user_management/user-management');
const imageUpload = require('./server_functions/battle_submissions/image_upload')
const ratingSystem = require('./server_functions/battle_submissions/rating-system.js');
const battleDataHandler = require('./server_functions/battle_submissions/battle-data-handler.js');
/**
 * Other Variables
 */

let uploader = multer({storage : storageProcess.storage });
/**
 * Middleware and server app wide actions.
 */

// for parsing application/json

app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.options('*', cors(corsOptions), ()=>{});
/*
let fileOptions = {
    dotfiles: "ignore",
    etag: true,
    extensions: ["png","jpg", "jpeg"],
    index: false,
    maxAge:"7d",
    redirect: false,
}
app.use(express.static(path.join(__dirname,"/public"), fileOptions))
app.use('/images', express.static('images'));
// View Engine Setup
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')
*/
/**
 * User Submissions
 */

/* Uploads an image and submits battle*/
app.post("/api/upload_file",cors(corsOptions),uploader.single('image'),(req,res) =>{
    imageUpload.uploadImage(req, res);
});
app.get("/api/images" ,cors(corsOptions),(req,res) => {
    battleDataHandler.getImage(req, res);
});
app.get("/api/submissionData",cors(corsOptions),(req,res)=>{
    battleDataHandler.getSubmissionData(req, res);
})
app.post("/api/rate", cors(corsOptions), (req, res) => {
    ratingSystem.updateRating(req, res);
});

/**
 *  User Credentials and Verification
 */

/* Inserts a new user into database on registration asynchronously */
app.post('/api/createUser', cors(corsOptions), function (req, res) {
    userManagement.createUser(req, res);
});

app.post('/api/login', cors(corsOptions), (req, res)=>{
    userManagement.userLogin(req, res);
});

app.get('/login/test', (req, res) => {
    userManagement.userLoginTest(req, res);
});

app.post('/api/verify', cors(corsOptions), (req, res) => {
    userManagement.userVerify(req, res);
})

/**
 * User rating information
 */
app.post('/api/userstats', cors(corsOptions), (req, res) => {
    userStats.userWins(req, res);
})

/* Returns a leaderboard dataset from the database asynchronously */
app.get('/api/leaderboard', function (req, res) {
    leaderBoards.getLeaderboardsByWins(req, res);
});

app.get('/api/leaderboards', cors(corsOptions), (req, res)=>{
    leaderBoards.getLeaderboards(req, res);
})

app.post('/api/postTrigger', cors(corsOptions), function (req, res) {
    console.log(req.headers);
    console.log(req.url);
    console.log(req.ip);
    console.log(req.body);
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.path);
    console.log(req.query);
    console.log(req.params);
    console.log(req.subdomains);
    res.status(204).end()
})
/**
 * Port Listener
 */
const port = process.env.PORT || 8081
const server = app.listen(port, function () {
    const host = server.address().address;

    console.log("Example app listening at http://%s:%s", host, port)
});




















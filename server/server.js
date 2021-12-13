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

app.patch('/api/usersubs', cors(corsOptions), (req, res) => {
    userStats.updateUserSubmissions(req, res);
});

/* Returns a leaderboard dataset from the database asynchronously */
app.get('/api/leaderboard', function (req, res) {
    leaderBoards.getLeaderboardsByWins(req, res);
});

app.get('/api/leaderboards', cors(corsOptions), (req, res)=>{
    leaderBoards.getEndedLeaderboards();
    leaderBoards.getLeaderboards(req, res);
})

/**
 * Port Listener
 */
const port = process.env.PORT || 8081
const server = app.listen(port, function () {
    const host = server.address().address;

    console.log("Example app listening at http://%s:%s", host, port)
});




















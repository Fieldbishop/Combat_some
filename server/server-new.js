const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const url = require('url');
const path = require("path");
const cors = require('cors');
const multer = require('multer');

const jwt = require('jsonwebtoken');

const mysql = require('./server_modules/mysql-connection');
const storageProcess = require('./server_modules/multer-storage');
const corsOptions = require('./server_modules/cors-local');

const upload = multer({storage : storageProcess}).single('image');

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// for parsing multipart/form-data
//app.use(express.static('public'));


/*
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*
const http = require("http")
console.log(http.STATUS_CODES);
//console.log(http.METHODS)
// app.get('/events', function (req, res){})
*/

app.options('*', cors(corsOptions), ()=>{});
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
app.post('/api/image', cors(corsOptions), function (req, res) {
    //console.log(req);
    (async () => {
        if (req.body) {
            req.body
            res.status(200).end()
        } else {
            res.status(403).end()
        }
    })()
})

// L juttuja

app.post("/api/upload_file",cors(corsOptions),(req,res) =>{
    upload(req,res,function (err){
        if(err){
            return res.send("Error uploading file" + err).status(500);
        }
        console.log(req.file);
        res.status( 200).end();
    });
});
/** Uploads an image */
app.post("/api/upasdasd",function(req,res){

    upload(req,res,function (err){
        if(err){
            return res.send("Error uploading file");
        }
        res.send("File uploaded successfully");
    });
});

/** Returns a leaderboard dataset from the database asynchronously */
app.get('/api/leaderboard', function (req, res) {
    (async () => {
        if (req.body) {
            let query = "SELECT userName FROM user ORDER BY wins DESC";
            let leaderboard = await mysql.mysqlQuery(query, null, "get");
            res.send(leaderboard);
            res.status(200).end();
        } else {
            res.status(403).end();
        }
    })();
});

/** Inserts a new user into database on registration asynchronously */
app.post('/api/createUser', cors(corsOptions), function (req, res) {
    (async () => {
        if (req.body) {
            const {username, password} = req.body;
            let query = "INSERT INTO user VALUES('" + username + "','" + password + "','0','0');";
            let paluu = await mysql.mysqlQuery(query, null, "post");


            //Huono tapa katsoa onko samoja käyttäjänimiä
            if(paluu == null){
                res.end("dublicate");
                res.status(403).end();
            }

            const userJson = {
                'username': username,
                'password': password
            }

            res.send({
                user: userJson,
            });
        } else {
            console.log("no");
            res.status(403).end();
        }
    })();
});

app.post('/api/login', cors(corsOptions), async (req, res) => {
    try {
        const {username, password} = req.body;
        let query = "SELECT count(*) AS 'found' FROM user WHERE userName = '" + username + "' AND password = '" + password + "'";

        const paluu = await mysql.mysqlQuery(query, null, "post");

        if(paluu[0].found === 0){
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
    } catch (err) {
        console.log(err);
    }
});

app.get('/login/test', (req, res) => {
    let user = req.body;

    const token = jwtSignUser(user);

    res.json({
        token: token
    })
});

app.post('/api/verify', cors(corsOptions), (req, res) => {
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
})

app.post('/api/userstats', cors(corsOptions), async (req, res) => {
    try {
        const username = jwt.verify(req.body.token, "secret").username
        const query = "SELECT userName, wins, participations FROM user WHERE userName = '" + username + "'";

        const paluu = await mysql.mysqlQuery(query, null, "post");

        return res.send(paluu)
    } catch (error) {
        res.json({
            error: true,
            data: error,
        })
    }
})

app.get('/api/leaderboards', cors(corsOptions), async (req, res) => {
    try {

        let query;

        if(req.query.id !== undefined) {
            query = "SELECT * FROM battle WHERE id = " + req.query.id;
        } else if(req.query.ids !== undefined) {
            query = "SELECT id FROM battle";
        } else {
            query = "SELECT * FROM battle";
        }

        const paluu = await mysql.mysqlQuery(query, null, 'get');

        res.send(paluu);

    } catch (error) {
        res.send({error: true, data: error});
    }
})

app.get('/api/images', cors(corsOptions), async (req, res) => {
    try {
        let query;

        if(req.query.id !== undefined) {
            query = "SELECT id, imageFilepath FROM battle_submission WHERE battleId = " + req.query.id
        } else {
            query = "SELECT id, imageFilepath FROM battle_submission";
        }
        const paluu = await mysql.mysqlQuery(query, null, 'get');
        res.send(paluu);
    } catch (error) {
        console.log(error);
        res.send({error: true, data: error});
    }
})

function jwtSignUser(user) {
    const fiveMin = 60 * 5;
    return jwt.sign(user, "secret", {
        expiresIn: fiveMin
    })
}


/**
 * Tästä eteenpäin turhaa.
 *
 *
 *
 */


app.get('/events', function (req, res) {
    res.sendFile(path.join(__dirname + '/listofevents.html'));
})
app.get('/api/events/all', corsOptions, function (req, res) {
    let sql = "SELECT event_date.Date, event.Name, event.Type,"
        + " Location.Location_name"
        + " FROM event_date, event, location"
        + " WHERE event_date.Event_id = event.Event_id and"
        + " event.Location_Location_id = Location.Location_id"
        //+ " and event_date.Date >= ? and event_date.Date <= ?"
        + " GROUP BY Name"
        + " ORDER BY event_date.Date";
    (async () => { // IIFE (Immediately Invoked Function Expression)
        const rows = mysql.query(sql);
        console.log(rows);
        res.send('{"numOfRows":' + rows.length + ',"rows":' + JSON.stringify(rows) + '}');
    })()
})

app.get('/api/location', corsOptions, function (req, res) {
    let parsedUrlQuery = url.parse(req.url, true).query;
    console.log(parsedUrlQuery);
    let locationName = parsedUrlQuery.name;
    let sql = "SELECT * " +
        "FROM location WHERE Location.Location_name = ?";
    (async () => { // IIFE (Immediately Invoked Function Expression)
        let rows = await mysql.mysqlQuery(sql, [locationName])
        console.log(rows);
        if (rows !== undefined) {
            res.send('{"numOfRows":' + rows.length + ',"rows":' + JSON.stringify(rows) + '}');
        } else {
            res.send('{"rows": ' + rows + '}');
        }
    })()
})


app.post('/api/event', corsOptions, function (req, res) {
    console.log("body: %j", req.body);
    (async () => {
        let message = {
            location: false,
            event: false,
            event_date: false,
        };
        let locationId = await locationSearch(req);
        if (!isNaN(locationId)) message.location = true;
        let sqlForAddingEvent = "INSERT " +
            "INTO event VALUES(?, ?, ?, ?)";
        let event
        if (req.body.eventName && req.body.type && !isNaN(locationId)) {
            event = await mysql.mysqlQuery(sqlForAddingEvent, [null, req.body.eventName, req.body.type, locationId]);
            if (!isNaN(event.insertId)) message.event = true;
            console.log(event);
            let event_date = await mysql.mysqlQuery("INSERT INTO event_date VALUES(?, ?)", [req.body.date, event.insertId]);
            if (!isNaN(event_date.insertId)) message.event_date = true;
            console.log(event_date);
        }
        res.send(JSON.stringify(message));
    })()
})

async function locationSearch(req) {
    let location = await mysql.mysqlQuery("SELECT * " +
        "FROM location WHERE Location_name = ? & Street_address = ? & Country = ? ORDER BY Location_id DESC LIMIT 0, 1",
        [req.body.placeName, req.body.address, req.body.country])
    let locationObject;
    locationObject = IsJsonString(location);
    let locationId = null;
    if ("Location_id" in locationObject) {
        locationId = locationObject.Location_id;
    } else if (!req.body.placeName || !req.body.city || !req.body.zip ||
        !req.body.country || !req.body.address) {
        location = await mysql.mysqlQuery("SELECT * " +
            "FROM location ORDER BY Location_id DESC LIMIT 0, 1");
        locationObject = IsJsonString(location);
        if ("Location_id" in locationObject) {
            locationId = locationObject.Location_id;
        }
    } else {
        let sqlForAddingLocation = "INSERT " +
            "INTO location VALUES(?, ?, ?, ?, ?, ?)";
        let response = await mysql.mysqlQuery(sqlForAddingLocation,
            [null, req.body.placeName, req.body.address, req.body.city, req.body.zip, req.body.country]);
        locationId = response.insertId;
    }
    return locationId;
}

function IsJsonString(jsonString) {
    try {
        if (jsonString && typeof jsonString === "object") {
            return jsonString;
        }
        let jsonObject = JSON.parse(jsonString);
        if (jsonObject && typeof jsonObject === "object") {
            return jsonObject;
        }
    } catch (e) {
        console.log("Caught an error: " + e + "while parsing " + jsonString)
    }
    return false;
}

app.get('/api/events', corsOptions, function (req, res) {

    let parsedUrlQuery = url.parse(req.url, true).query;
    let startDate = parsedUrlQuery.start;
    let endDate = parsedUrlQuery.end;
    let sql = "SELECT event_date.Date, event.Name, event.Type,"
        + " Location.Location_name"
        + " FROM event_date, event, location"
        + " WHERE event_date.Event_id = event.Event_id and"
        + " event.Location_Location_id = Location.Location_id"
        + " and event_date.Date >= ? and event_date.Date <= ?"
        + " GROUP BY Name"
        + " ORDER BY event_date.Date";
    (async () => {
        let rows = await mysql.mysqlQuery(sql, [startDate, endDate]);
        console.log(rows);
        res.send('{"numOfRows":' + rows.length + ',"rows":' + JSON.stringify(rows) + '}');
    })();
})

const port = process.env.PORT || 8081
const server = app.listen(port, function () {
    const host = server.address().address;

    console.log("Example app listening at http://%s:%s", host, port)
});
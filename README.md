# Some Combat

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<h3>REST API CALLS</h3>
<table style="text-align: center">
    <tr>
        <th> METHOD </th>
        <th> API NAME </th>
        <th> DESCRIPTION </th>
        <th> INPUT </th>
        <th> RETURNS </th>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/upload_file</td>
        <td></td>
        <td> Formdata name="image"; filename="some.png"; name="battleId"; name="username" </td>
        <td style="text-align: left" >{"fieldCount":0,"affectedRows":1,"insertId":19,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/images</td>
        <td></td>
        <td>?path=</td>
        <td style="text-align: left" >Image file if any</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/submissionData</td>
        <td></td>
        <td></td>
        <td style="text-align: left" >[{"id": int, "imageFilepath": String}]</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/createUser</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/login</td>
        <td></td>
        <td></td>
        <td style="text-align: left" >
        {"user":{"username": String,"password": String},"token": String}
        </td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/verify</td>
        <td></td>
        <td>{ token: "example"}</td>
        <td style="text-align: left" >
            { "error":false,"data":{"username":"string","password":"string","iat":0,"exp":0},"verify":true}
        </td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/userstats</td>
        <td></td>
        <td></td>
        <td style="text-align: left" >[{"userName":String ,"wins": int,"participations": int}]</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/api/usersubs</td>
        <td></td>
        <td></td>
        <td style="text-align: left" >{"username": String}</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/newVote</td>
        <td></td>
        <td></td>
        <td style="text-align: left" >{"fieldCount": int ,"affectedRows": int,"insertId": int,"serverStatus": int,"warningCount": int,"message": String ,"protocol41": boolean, "changedRows": int}</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/getOpenCups</td>
        <td>Gets as response</td>
        <td>-</td>
        <td style="text-align: left" >[{"id": int,"winnerUserName":null, "endDate": Date,"category": String,"retired":null ,"cupType": int}]</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/leaderboards</td>
        <td></td>
        <td>?id=3</td>
        <td style="text-align: left" >[{"id": int,"winnerUserName": null, "endDate": Date,"category": String,"retired":null, "cupType": int}]</td>
    </tr>
    <tr>
        <td>OPTIONS</td>
        <td>*</td>
        <td>Accepts Cross-Origin options from all paths</td>
        <td>-</td>
        <td style="text-align: left" >-</td>
    </tr>
</table>
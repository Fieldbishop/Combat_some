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
        <th> API NAME </th>
        <th> DESCRIPTION </th>
        <th> INPUT </th>
        <th> RETURNS </th>
        <th> METHOD </th>
    </tr>
    <tr>
        <td>/api/upload_file</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>POST</td>
    </tr>
    <tr>
        <td>/api/images</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>GET</td>
    </tr>
    <tr>
        <td>/api/submissionData</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>GET</td>
    </tr>
    <tr>
        <td>/api/createUser</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>POST</td>
    </tr>
    <tr>
        <td>/api/login</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>POST</td>
    </tr>
    <tr>
        <td>/api/verify</td>
        <td></td>
        <td>{ token: "example"}</td>
        <td style="text-align: left" >
            { "error":false,"data":{"username":"string","password":"string","iat":0,"exp":0},"verify":true}
        </td>
        <td>POST</td>
    </tr>
    <tr>
        <td>/api/userstats</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>POST</td>
    </tr>
    <tr>
        <td>/api/usersubs</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>PATCH</td>
    </tr>
    <tr>
        <td>/api/newVote</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>PUT</td>
    </tr>
    <tr>
        <td>/api/getOpenCups</td>
        <td>Gets as response</td>
        <td>-</td>
        <td style="text-align: left" ></td>
        <td>GET</td>
    </tr>
    <tr>
        <td>/api/leaderboards</td>
        <td></td>
        <td></td>
        <td style="text-align: left" ></td>
        <td>GET</td>
    </tr>
    <tr>
        <td>*</td>
        <td>Accepts Cross-Origin options from all paths</td>
        <td>-</td>
        <td style="text-align: left" ></td>
        <td>OPTIONS</td>
    </tr>
</table>
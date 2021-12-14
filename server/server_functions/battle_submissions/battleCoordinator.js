const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const themes = [
    "Night",
    "Nature",
    "Water",
    "Movement",
    "Vehicles",
    "Artsy",
    "Funny haha",
    "People",
    "Micro",
    "Macro",
    "Industry",
    "History",
    "Extreme"
];

module.exports.checkIfNoBattle = () => {
    let query = "SELECT * from battle";
    (async () => {
        let mysqlResponse = await mysql.mysqlQuery(query, null, "checkIfNoBattle");
        let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        if (mysqlResponse.length === 0) {
            this.startNewBattle();
        }
    })();
}

/**
 * Creates an hourly cup
 */
module.exports.startNewBattle = () => {
    let time = Math.floor((Date.now() + 3600000)/1000);
    let category = themes[Math.floor(Math.random() * themes.length)];
    let query = "INSERT INTO battle VALUES(null,null,FROM_UNIXTIME("+time+"),?)";
    let args = category;
    (async () => {
        let mysqlResponse = await mysql.mysqlQuery(query, args, "generateBattle");
        let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        return {
            response: mysqlResponse,
            status: status
        };
    })();
}

/**
 * Ends a cup, checks the winner and updates it into cup, removes all votes cast for the ending cup
 * and clears the entries for submitted images from the database
 * @param id
 */
module.exports.endBattle = (id) => {
    console.log(id);
    const btlID = id;
    let winner;
    let query;
    let args;

    let queryForGettingWinner = "SELECT userName FROM battle_submission WHERE battleId = ? ORDER BY rating DESC LIMIT 1"; //SELECT userName FROM battle_submission WHERE rating = (SELECT MAX(rating) from battle_submission WHERE battleId = ?
    let arg1 = btlID;
    let queryForSavingWinner = "UPDATE battle SET winnerUserName = ? WHERE id = ?";
    let arg2 = [winner, btlID];
    let queryForDisablingLinks = "SET FOREIGN_KEY_CHECKS = 0";
    let queryForEnablingLinks = "SET FOREIGN_KEY_CHECKS = 1";
    let queryForClearingVotes = "DELETE FROM user_vote where battleId = ?";
    let queryForClearingBattleSubmissions = "DELETE FROM battle_submission where battleId = ?";

    for (let i = 0; i < 6; i++) {
        switch (i) {
            case 0:
                query = queryForGettingWinner;
                args = arg1;
                break;
            case 1:
                query = queryForSavingWinner;
                args = arg2;
                break;
            case 2:
                query = queryForDisablingLinks;
                args = null;
                break;
            case 3:
                query = queryForClearingVotes;
                args = null;
                break;
            case 4:
                query = queryForClearingBattleSubmissions;
                args = null;
                break;
            case 5:
                query = queryForEnablingLinks;
                args = null;
                break;
            default:
                console.log("Error in ending the battle");
        }
        (async () => {
            if (i === 0) {
                winner = await mysql.mysqlQuery(query, args, null);       //TODO miten sais kivasti erroreiden kanssa :)
            } else {
                let mysqlResponse = await mysql.mysqlQuery(query, args, null);
                let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
                return {
                    response: mysqlResponse,
                    status: status
                };
            }
        })();
    }
}
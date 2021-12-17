const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const {deleteFile} = require("./image_upload");
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
        if (status !== 200) {
            console.error(mysqlResponse);
        }
        if (mysqlResponse.length === 0) {
            this.startNewBattle(1);
            this.startNewBattle(24);
            this.startNewBattle(168);
        }
    })();
}

/**
 * Starts a new cup
 * @param type the length of the cup
 */
module.exports.startNewBattle = (type) => {
    let time = Math.floor((Date.now() / 1000 + (type * 3600)));
    let category = themes[Math.floor(Math.random() * themes.length)];
    let query = "INSERT INTO battle VALUES(null,null,FROM_UNIXTIME(" + time + "),?,null,?)";
    let args = [category, type];
    (async () => {
        let mysqlResponse = await mysql.mysqlQuery(query, args, "generateBattle");
        let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        if (status !== 200) {
            console.error(mysqlResponse);
        }
    })();
}

/**
 * Handles deleting the relevant database entries on end of a cup
 * @param id ID of the battle that ended
 */
module.exports.endBattle = (id) => {
    console.log(id);
    const btlID = id;
    let winner;
    let query;
    let args;

    let queryForGettingWinner = "SELECT userName FROM battle_submission WHERE battleId = ? ORDER BY rating DESC LIMIT 1";
    let arg1 = btlID;
    let queryForSavingWinner = "UPDATE battle SET retired = 1, winnerUserName = ? WHERE id = ?";
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
                args = arg1;
                break;
            case 4:
                query = queryForClearingBattleSubmissions;
                args = arg1;
                break;
            case 5:
                query = queryForEnablingLinks;
                args = null;
                break;
            default:
                console.log("Error in ending the cup");
        }
        (async () => {
            if (i === 0) {
                let mysqlResponse = await mysql.mysqlQuery(query, args, null);
                let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
                winner = mysqlResponse;
                if (status !== 200) {
                    console.error(mysqlResponse);
                }
            } else {
                let mysqlResponse = await mysql.mysqlQuery(query, args, null);
                let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
                if (status !== 200) {
                    console.error(mysqlResponse);
                }
            }
        })();
    }
}

/**
 * For deleting the images at the end of a cup
 * @param battleId Id of the cup that is ending
 */
module.exports.deleteSubmissionImages = (battleId) => {
    let query = "SELECT imageFilepath FROM battle_submission WHERE battleId = ?";
    let args = battleId;
    (async () => {
        let mysqlResponse = await mysql.mysqlQuery(query, args, "Delete files");
        let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        if (status !== 200) {
            console.log(mysqlResponse);
        }
        if (mysqlResponse.length > 0) {
            for (let i = 0; i < mysqlResponse.length; i++) {
                await deleteFile(mysqlResponse[i].imageFilepath);
            }
        }
    })();
}
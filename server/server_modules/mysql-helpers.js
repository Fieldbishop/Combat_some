/**
 * Returns an error based on the sql error
 * @param sqlResponse - input sql error, string
 * @returns {number}
 */
function httpStatusWithSqlResponse(sqlResponse){
  if(sqlResponse && !sqlResponse.hasOwnProperty('errno')) {
    return 200;
  } else if(sqlResponse.hasOwnProperty('code')){
    if(sqlResponse.code === 'ER_DUP_ENTRY'){
      return 403;
    }
  }
  console.warn("Unclassified sql error :" + sqlResponse);
  return 500;
}

/**
 * Exported for application wide usage
 * @type {(function(*=): number)|*}
 */
module.exports.httpStatusWithSqlResponse = httpStatusWithSqlResponse;
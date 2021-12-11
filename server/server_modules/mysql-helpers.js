/**
 *
 *
 */
function httpStatusWithSqlResponse(sqlResponse){
  if(sqlResponse && !sqlResponse.hasOwnProperty('errno')) {
    return 200;
  } else if(sqlResponse.hasOwnProperty('code')){
    if(sqlResponse.code === 'ER_DUP_ENTRY'){
      return 403;
    }
  }
    return 500;
}

module.exports.httpStatusWithSqlResponse = httpStatusWithSqlResponse;
/**
* verifies that the string includes (){}=:?<>/
* @param {string} string 
* @returns {Boolean} Boolean
*/
function isValid(params) {
  const regex = /[(){}=:?<>/]/
  return regex.test(params)
}

module.exports = {isValid}
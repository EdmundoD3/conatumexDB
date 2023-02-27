function isValid(params) {
  const regex = /[(){}=:?<>/]/
  return regex.test(params)
}

module.exports = {isValid}
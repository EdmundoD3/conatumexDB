/**
* filter properties of an object
* @param {Object} object includes params of models
* @param {array} array includes this properties [string,...]
* @returns {Object} return object whith array params
*/
function filterObject(element={}, params=[]) {
  let model = {}
  for (const key in element) {
    if (params.includes(key)) {
      model[key]=element[key]
    }
  }
  return model
}

/**
* reduce properties of an object
* @param {Object} object includes params of models
* @param {array} array not includes this properties
* @returns {Object} return object whitout array params
*/
function reduceObject(element={}, params=[]) {
  let model = {}
  for (const key in element) {
    if (!params.includes(key)) {
      model[key]=element[key]
    }
  }
  return model
}

module.exports = {filterObject, reduceObject}
module.exports = class Model {
  constructor(params) {
    for (let attr in params) this[attr] = params[attr]
  }
}

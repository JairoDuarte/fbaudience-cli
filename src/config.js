module.exports.Env = {}

try {
  const Env = require('../env.json')
  module.exports.Env = Env
} catch (error) {}

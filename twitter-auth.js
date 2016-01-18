var error = require('eraro')({
  package: 'twitter-auth'
})

module.exports = function (options) {
  var seneca = this
  var internals = {}
  internals.accepted_framworks = [
    'express',
    'hapi'
  ]
  internals.options = options

  if (!options.framework) {
    options.framework = 'express'
  }

  internals.choose_framework = function () {
    if ('express' === internals.options.framework) {
      internals.load_express_implementation()
    }
    else {
      internals.load_hapi_implementation()
    }
  }

  internals.check_options = function () {
    if (seneca.options().plugin.web && seneca.options().plugin.web.framework) {
      internals.options.framework = seneca.options().plugin.web.framework
    }

    if (internals.accepted_framworks.indexOf(internals.options.framework) === -1) {
      throw error('Framework type <' + internals.options.framework + '> not supported.')
    }
  }

  internals.load_express_implementation = function () {
    seneca.use(require('./lib/express-twitter-auth'), internals.options)
  }

  internals.load_hapi_implementation = function () {
    seneca.use(require('./lib/hapi-twitter-auth'), internals.options)
  }

  internals.check_options()
  internals.choose_framework()

  return {
    name: 'twitter-auth'
  }
}


var _ = require('lodash')

module.exports = function (opts) {
  var seneca = this
  var options = opts

  seneca.add('role: auth, cmd: loginTwitter', function (args, done) {
    var msg = _.extend({}, args, {role: 'auth', trigger: 'service-login-twitter', service: 'twitter'})
    delete msg.cmd
    seneca.act(msg, function (err, data) {
      done(err, data)
    })
  })

  function init_strategy (strategy) {
    seneca.act('role: web, get: server', function (err, data) {
      if (err) {
        throw new Error('Cannot retrieve server: ' + err)
      }

      if (!data) {
        throw new Error('Cannot retrieve server')
      }

      var server = data.server
      server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: options.password,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        isSecure: _.has(options, 'isSecure') ? options.isSecure : true
      })

      seneca.act(
        'role: web',
        {
          plugin: 'auth',
          config: strategy,
          use: {
            prefix: '/auth/',
            pin: {role: 'auth', cmd: '*'},
            auth: 'twitter',
            map: {
              loginTwitter: {GET: true, POST: true, auth: 'twitter', alias: 'login_twitter'}
            }
          }
        }, function (err, result) {
          console.log('Register', err, result)
        })
    })
  }

  function init (args, done) {
    init_strategy(options)
    seneca.act({role: 'auth', cmd: 'register_service', service: 'twitter', conf: options})
    done()
  }

  seneca.add('init: hapi-twitter-auth', init)

  return {
    name: 'hapi-twitter-auth'
  }
}

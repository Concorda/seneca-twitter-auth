
module.exports = function (opts) {
  var seneca = this
  var options = opts


  function init_strategy(strategy) {
    seneca.act('role: web, get: server', function (err, data) {
      if (err) {
        throw new error('Cannot retrieve server: ' + err)
      }

      if (!data) {
        throw new error('Cannot retrieve server')
      }

      server = data.server
      server.auth.strategy(strategy.provider, 'bell', strategy)

      seneca.act(
        'role: web',
        {
          plugin: 'auth',
          config: config,
          use: {
            prefix: options.prefix,
            pin: {role: 'auth', cmd: '*'},
            auth: strategy.provider,
            map: {
              login: {GET: true, POST: true, data: true, alias: 'login_' + strategy.provider}
            }
          }
        })
    })
  }

  init_strategy(options.strategy)

  return {
    name: 'hapi-twitter-auth'
  }
}


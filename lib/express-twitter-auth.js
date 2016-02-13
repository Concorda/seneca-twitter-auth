var TwitterStrategy = require('passport-twitter').Strategy

module.exports = function (opt) {
  var options = opt || {}
  var seneca = this

  var authPlugin = new TwitterStrategy({
    consumerKey: options.apiKey,
    consumerSecret: options.apiSecret,
    callbackURL: options.urlhost + (options.callbackUrl || '/auth/twitter/callback')
  },
  function (accessToken, tokenSecret, profile, done) {
    seneca.act({
      role: 'auth',
      prepare: 'twitter_login_data',
      accessToken: accessToken,
      tokenSecret: tokenSecret,
      profile: profile
    }, done)
  })

  seneca.act({role: 'auth', cmd: 'register_service', service: 'twitter', plugin: authPlugin, conf: options})

  return {
    name: 'express-twitter-auth'
  }
}

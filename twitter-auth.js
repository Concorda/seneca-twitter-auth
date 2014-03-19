
var TwitterStrategy = require('passport-twitter').Strategy

module.exports = function (options) {

  var seneca = this

  var authPlugin = new TwitterStrategy({
      consumerKey:    options.apiKey,
      consumerSecret: options.apiSecret,
      callbackURL:    options.urlhost + "/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, done) {
      var data = {
        nick:         profile.username,
        name:         profile.displayName,
        identifier:   '' + profile.id,
        credentials:  {token: token, secret: tokenSecret},
        userdata:     profile,
        when:         new Date().toISOString()
      }
      done(null, data)
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: 'twitter', plugin: authPlugin, conf: options})

  return {
    name: 'twitter-auth'
  }
}

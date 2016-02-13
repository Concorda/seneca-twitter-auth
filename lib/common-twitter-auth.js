module.exports = function (opt) {
  var seneca = this
  var service = 'twitter'

  var prepareLoginData = function (args, cb) {
    var accessToken = args.accessToken
    var tokenSecret = args.tokenSecret
    var profile = args.profile

    var data = {
      nick: profile.username,
      name: profile.displayName,
      identifier: '' + profile.id,
      credentials: {token: accessToken, secret: tokenSecret},
      userdata: profile,
      when: new Date().toISOString()
    }

    data[service + '_id'] = data.identifier
    data.service = data.service || {}
    data.service[service] = {
      credentials: data.credentials,
      userdata: data.userdata,
      when: data.when
    }

    cb(null, data)
  }


  seneca.add({role: 'auth', prepare: 'twitter_login_data'}, prepareLoginData)

  return {
    name: 'common-twitter-auth'
  }
}

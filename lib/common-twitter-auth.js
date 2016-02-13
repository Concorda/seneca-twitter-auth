module.exports = function (options) {
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

    data = _.extend({}, data, profile)
    if (data.emails && data.emails.length > 0){
      data.email = data.emails[0].value
      data.nick = data.email
    }
    if (data.name && _.isObject(data.name)){
      data.firstName = data.name.givenName
      data.lastName = data.name.familyName
      delete data.name
    }
    data.name = data.firstName + ' ' + data.lastName

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

  function init(args, done) {
    seneca.act({role: 'auth', cmd: 'register_service', service: 'twitter', plugin: 'twitter', conf: options})
    done()
  }

  seneca.add('init: common-twitter-auth', init)


  return {
    name: 'common-twitter-auth'
  }
}

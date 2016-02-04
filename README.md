seneca-twitter-auth - a seneca-auth plugin
============================================

This plugin is used by [seneca-auth](https://www.npmjs.com/package/seneca-auth) for authenticating via twitter login.
It uses [PassportJS](http://passportjs.org). The [seneca-auth](https://www.npmjs.com/package/seneca-auth) is the
authentication plugin used by [Seneca](http://senecajs.org) toolkit.

For a gentle introduction to Seneca itself, see the [senecajs.org](http://senecajs.org) site.

If you're using this plugin module, feel to contact on twitter if you have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

## About

seneca-twitter-auth's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online](http://htmlpreview.github.com/?https://github.com/shanel262/twitter-auth/blob/master/docs/twitter-auth.html).

The annotated source can be found locally at [./docs/twitter-auth.html](./docs/twitter-auth.html).

### Install

```sh
npm install seneca-twitter-auth
```

### Using Twitter Auth

When using seneca-auth the twitter auth must be initialized using:

```
..........
    service: {
      "local": {},
      "twitter" : {
        "apiKey" : "TWITTER_KEY",
        "apiSecret" : "TWITTER_SECRET",
        "urlhost" : "http://localhost:3000"
      }
    }
..........

```

## Other information

There is provided a default seneca action that will prepare user data to a more convenient structure.
If this data structure is not matching the expected user data structure used by your application, you can overwrite the
seneca action and implement your own twitter-login-data action.

 - {role: 'auth', prepare: 'twitter_login_data'}

The JSON object provided for this action contains following data from Twitter login:
 - accessToken
 - tokenSecret
 - profile


 Note: You can provide also the callbackUrl as part of the options. If not provided then a default value is used.

 Default value for callbackUrl: '/auth/twitter/callback'


Register your app on [twitter](https://apps.twitter.com/)

## License
Copyright Mircea Alexandru and other contributors 2015, Licensed under [MIT](./LICENSE).
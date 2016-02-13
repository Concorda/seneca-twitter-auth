![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](https://github.com/senecajs/) a seneca-auth plugin

# seneca-twitter-auth

[![Dependency Status][david-badge]][david-url]
[![Gitter chat][gitter-badge]][gitter-url]

This plugin is used by [seneca-auth](https://www.npmjs.com/package/seneca-auth) for authenticating via twitter login.
It uses [PassportJS](http://passportjs.org). The [seneca-auth](https://www.npmjs.com/package/seneca-auth) is the
authentication plugin used by [Seneca](http://senecajs.org) toolkit.

For a gentle introduction to Seneca itself, see the [senecajs.org](http://senecajs.org) site.

If you're using this plugin module, feel to contact on twitter if you have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

- __Version:__ 0.1.1
- __License:__ [MIT](./LICENSE)

## About

seneca-twitter-auth's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online](http://htmlpreview.github.com/?https://github.com/senecajs/seneca-twitter-auth/blob/master/docs/twitter-auth.html).

The annotated source can be found locally at [./docs/twitter-auth.html](./docs/twitter-auth.html).

If you're using this module, and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-twitter-auth/issues),
- Tweet to [@senecajs](https://twitter.com/senecajs),
- Ask on the [Gitter][gitter-url].

If you are new to Seneca in general, please take a look at [senecajs.org](http://senecajs.org/). We have everything from
tutorials to sample apps to help get you up and running quickly.

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

## Contributing
The [Senecajs org](https://github.com/senecajs/) encourage open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License
Copyright Nicolas Herment and other contributors 2016, Licensed under [MIT](./LICENSE).

[david-badge]: https://david-dm.org/senecajs/seneca-twitter-auth.svg
[david-url]: https://david-dm.org/senecajs/seneca-twitter-auth
[gitter-badge]: https://badges.gitter.im/senecajs/seneca.png
[gitter-url]: https://gitter.im/senecajs/seneca

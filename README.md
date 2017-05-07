## Discourse SSO

```js
var sso = require('discoursso');

app.get('/sso', (req, res) => {

	try {
		// make sure to convert with the right user fields for discourse
		// email, name, username, avatar_url, admin, require_activation, ...
		const discourseUser = convert(req.user); 

		const url = sso(req.query, discourseUser, ssoSecret); // get redirect url

		res.redirect(url); // go there

	} catch(e) { // faled to verify signature, could discard query string as well
		res.redirect('/login?'+querystring.stringify(req.query));
	}
})

```
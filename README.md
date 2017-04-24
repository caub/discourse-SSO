## Discourse SSO

```js
var sso = require('discourse-ssso');

app.get('/sso', (req, res) => {

	try {
		const discourseUser = convert(req.user); // make sure to give the right user fields to discourse
		const url = sso(req.query, discourseUser, ssoSecret);
		res.redirect(url);

	} catch(e) {
		res.redirect('/login?'+querystring.stringify(req.query));
	}
})

```
const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}

// There is no need to import this file anywhere, CRA looks for a file by this name and loads it.

/*
 * ! it only works and is needed in dev environment!
 * ! in production the react server will be built and works as static files, so the proxy is useless！
 * Reason to have this Archeticure
 * 1. enable cookie pass from 3000 to 5000 link. we are in 3000, and if we link to 3000, the cookie will included, but if we link to 5000, browser will think we go to another domin, and no cookie inclueded. by using proxy, this problem solved.
 * 2. avoid cors problem. 
 * 感觉proxy的作用就是告诉browser，5000和3000是一家人！不要因为安全问题不把3000的东西给5000
 */
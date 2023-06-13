import http from 'http';
import app from './app/app.js';
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(PORT, console.log(`server listening to port ${PORT}.......`));

/* authentication and authorisation
1.passport for social login
2.cookiee 
3.sessions
4.tokens - jwt 
authentication-
1.aloowing user/admin
autherization-
1.giving previleges to curd/custamisation and other fun to a specific person
2.what kind of rights or privileges can a user can take
3.http servers are headless

//why we need jwt?
So one caveat here is that HTTP servers are stateless, meaning that when a user is being locked in,

our server does not remember the log in user.

So to be able to persist or to tell the server that, hey server, this user who has logged  in some
moment ago is the actual user. So please allow him or her to do whatever you want.

And that is why JSON web token comes into play, meaning that we are going to generate a token and give

it to the logging user. So upon every request the user wants to make, that user will take that token along to their request

so that the server will check that.

That is this token.*/

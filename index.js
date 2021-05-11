//index.js
/**
 * Required External Modules
 * */
const express = require("express");
const path = require("path");
const expressionSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

const authRouter = require("./auth");
/*
* App variables
* */
const app = express();//declaration of express aplication
const port = process.env.PORT || "8000";

/*
* Session Configuration
* */

const session = { // session = configuration object that enables options
    secret: process.env.SESSION_SECRET,//secret used to sign the session ID, could be a single string or multiple in an array
    cookie: {},//settings object for the session ID cookie (empty object)
    resave: false, //forces the session to be saved back to the session store
    saveUninitialized: false //optimizes cookie creation and storage space by avoiding creating a new session when bots visit. Reserving those for real users
};

if (app.get("env") === "production") {//what is env?
    //serve secure cookies, requires HTTPS
    session.cookie.secure = true; //initializing secure cookie session
}

/*
* Passport Configuration
* */
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        /**
         * Access tokens are used to authorize users to an API
         * (resouce server)
         * accesstoken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
        return done(null, profile);
    }
);
/*
* App Configuration
* */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set(express.static(path.join(__dirname, "public")));

app.use(expressionSession(session));//added empty session to xpressSession method

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) =>{
    done(null, user);
});

//creating custom middleware with express

app.use((req, res, next) => {
    res.locals.isAutheticated = req.isAutheticated();
    next();
});

/*
* Router mounting
* */

app.use("/", authRouter);
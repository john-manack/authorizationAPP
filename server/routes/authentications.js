const express = require('express');
const router = express.Router();

// encrypt passwords
const bcrypt = require('bcryptjs'); 

// access database models
const db = require('../models');

// import secret for jwt
const config = require('../secrets');

//scrape email and password from request header
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// used to create a jwt token
const jwt = require('jwt-simple');

const passport = require('passport')

require('../config/passAuth')

let requireSignIn = passport.authenticate('local', {session: false});
let requireAuth = passport.authenticate('jwt', {session: false});


/**
 * 
 *  This function returns a jwt 
 */
const token = (user) => {
    let timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id, 
        iat:timestamp
    },
        config.secret
    );
}



router.get('/', requireAuth, (req, res) => {
    res.send('hello world');
});

/**
 * logging in with credentials
 */

router.post('/signin', requireSignIn, (req, res) => {
    //validate user

    //send token
    res.json({token: token(req.user)});

});

/**
 * registering a new user in our database and send back a jwt
 */

router.post('/signup', async (req, res) => {

    //body-parse to scrape info
    //email, password
    let email = req.body.email;

    //encrypt: bcrypt
    let password = bcrypt.hashSync(req.body.password, 8);

    try{
        //models - store in database
        let records = await db.user.findAll({where: {email: email}})

        if (records.length === 0) {
            //add a new record
            let user = await db.user.create({
                email: email, 
                password: password
            })

            //returns a jwt
            let jwtToken = token(user);

            //passing jwt to client
            return res.json({token: jwtToken})

        } else {
            //send back an error
            return res.status(422).send({error: 'Email already exists'});

        }
    } catch(error) {
        // send back error, can't access database
        return res.status(423).send({error: `Can't access database`});

    }

    //create jwt token

    //send back a token
});

module.exports = router;

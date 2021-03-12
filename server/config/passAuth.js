

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcryptjs'); //unencrypt
const db = require('../models');// access to user model
const config = require('../secrets'); // gives access to jwt secret


/**
 * validating a user's credentials
 * email, password => local strategy
 * jwt
 */


 /**
  * local strategy
  * email and password validations
  */

  //options to override username field
  let options = {
      
  }
 let localLogin = new  {
     try {
        // check to see if email is in our db
        let records = await db.user.findAll();

        if(records !== null) {
            //encrypt password and compare to password in db

            bcrypt.compare(password, records[0].password, (err, isMatch) => {

                // check if err object exists
                if(err) {
                    return done(err);
                }

                // passwords did not match
                if(!isMatch) {
                    return done(null, false);
                }

                // valid user
                if(isMatch) {
                    return done(null, records[0]);
                }
            });

            //

        } else {
            // no email was found
            return done(null, false);
        }

     } catch (error) {
         //something in database retrieval
        return done(error);
     }

 }
 );

 /**
  * jwt strategy
  * validating token
  */
 let jwtOptions = {
     
 }
 let jwtLogin = new  {
    try {
        let user = await db.user.findByPk(payload.sub)
        if(user){
            // success
            done(null, user);
        } else {
            //didn't find the user
            done(null, false);
        }
    } catch (error) {
        return done(err);
    }
    
 });

 passport.use(localLogin);
 passport.use(jwtLogin);
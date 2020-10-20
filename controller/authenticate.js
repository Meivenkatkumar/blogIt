const jwt = require('jsonwebtoken');
const config = require("../config/config");
const User = require("../models/User");
const bcrypt = require('bcrypt-nodejs');

var getJWTToken = (user) => {
    let payload = {user: user};
    let secret = config.JWT_SECRET;
    let options = {expiresIn: config.sessionExpiryTime, issuer: config.jwtIssuer};
    var token = jwt.sign(payload, secret, options);
    return token;
}

var signup = async (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var email =  req.body.email;
    if((!username)||(!password)||(!email)){
        return res.status(200).json({success: false, msg: "Invalid Parameters."})
    }
    else{   
        try{
            let userObj = await User.findOne({
                username: username
            });
            if(!userObj){
                userObj = await User.create({
                    username: username,
                    password: bcrypt.hashSync(password),
                    auth: "native",
                    email: email
                }); 

                var user = {
                    userID: userObj._id,
                    username: userObj.username,
                    auth: "native"
                };
                var token = getJWTToken(user);

                return res.cookie('token', token, {
                    maxAge: 24 * 60 * 60 * 1000, 
                    httpOnly: true,
                    secure: false,
                    sameSite: true,
                })
                .status(200)
                .json({success: true, msg:"User registered successfully!"});
            }
            else{
                return res.status(200).json({success: false, msg: "Username already exists!"});
            }
        }catch(e){
            return res.status(200).json({success: false, msg: e})
        }
    }
};

var login = async (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;
    
    if((!username)||(!password)){
        return res.status(200).json({success: false, msg: "Invalid Parameters."})
    }
    else{   
        try{
            const userObj = await User.findOne({
                username: username,
                auth: "native"
            });
            if(userObj){
                var match = bcrypt.compareSync(password, userObj.password);
                if (match) {
                    var user = {
                        userID: userObj._id,
                        username: userObj.username,
                        auth: "native"
                    };
                    var token = getJWTToken(user);
                    
                    return res.cookie('token', token, {
                        maxAge: 24 * 60 * 60 * 1000, 
                        httpOnly: true,
                        secure: false,
                        sameSite: true,
                    })
                    .status(200)
                    .json({success: true, msg:"Login Successful!", username: userObj.username});   
                
                } else {
                    return res.status(200).json({success: false, msg: "Incorrect Credentials!"})
                }    
            }
            else{
                return res.status(200).json({success: false, msg: "Incorrect Credentials!"})
            }
        }catch(e){
            return res.status(200).json({success: false, msg: e})
        }
    }
};


var validateToken = async (req, res)=>{
    const authorizationHeader = req.headers.authorization || (req.cookies && req.cookies.token && `Bearer ${req.cookies.token}`);
    let result;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: config.sessionExpiryTime,
        issuer: config.jwtIssuer
      };
      const JWT_SECRET= config.JWT_SECRET
      try {
        result = jwt.verify(token, JWT_SECRET, options);
        return res.status(200).json({success: true, msg: "Authentication Successful!", user: result.user});
      } catch (err) {
        return res.status(200).json({success: false, msg: "Invalid Token, Verification failed."});
      }
    } else {
        return res.status(200).json({success: false, msg: "Authentication Token Required."});
    }
};




module.exports.signup = signup;
module.exports.login = login;
module.exports.validateToken = validateToken;
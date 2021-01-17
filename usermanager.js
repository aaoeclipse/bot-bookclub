const { strict } = require('assert');
const fs = require('fs')

var UserManager = {};

UserManager.checkUser = function(user) {
    fs.readFile("userlist.txt", function(err, buf) {
        if (buf.includes(user)){
            return true;
        }else{
            return false;
        }
    });
};
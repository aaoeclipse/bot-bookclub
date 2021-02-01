// const getBook = require('./bookmanager.js')
const fs = require('fs')

class State {
    constructor() {
    }

    init(user, callback){
        this.states = this.getStates()
        this.user = this.getUser(user)
        callback.bind(this)()
    }

    getInstructions(callback){
        console.log(this.states)
        this.states.forEach(state => {
            if(state.name === this.user.curr_state)
                callback(state.name)
        });
    }

    getStates(){
        return Promise.resolve().then(() => {
            fs.readFile('data/states.json', (err, data) => {
                if (err) {
                    console.log(`Error reading file: ${err}`);
                }
                else {
                    let parsed = JSON.parse(data);
                    parsed.States.forEach(state => {
                        console.log(state.name)
                    });
                    return parsed.States
                }
            })
        });
    }

    getUser(user){
        return Promise.resolve().then(()=> {
            fs.readFile('data/userlist.json', (err, data) => {
                if (err) {
                    console.log(`Error reading file: ${err}`);
                }
                else {
                    const userlist =  JSON.parse(data);
                    userlist.users.forEach(curr_user => {
                        if (user === curr_user.username)
                        {
                            return user;
                        }
                    });
                }
            });
        })
    }

    getStateOfUser(){
        return this.user.curr_state;
    }

    changeUserState(){
        if (typeof(this.user.next_states) == "string"){
            console.log(`Previous state ${this.user.curr_state}`);
            this.user.curr_state = this.user.next_states
            console.log(`Curr state ${this.user.curr_state}`);
        }
            else 
            console.log("this user is in defualt with many options")
    }
}

module.exports = State;
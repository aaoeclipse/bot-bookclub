const num_of_states = 3
const getBook = require('./bookmanager.js')

/**
 * StateManager focus on the flow of users interacting with adding new books
 */
function StatesManager() {
    this.users = []; 

    /**
     * Check in which state is the person and if the user is not registered then it
     * adds them into the list 
     * @param {String} userName 
     */
    this.checkState = (userName) => {
        var found = false;
        for (const [ , value] of Object.entries(this.users)) {
            if (value.key === userName){
                found = true;
                // console.log(`found ${value.key} and ${value.value}!`);
                return value;
            }
        }
        if (!found){
            this.users.push({
                key:   userName,
                value: 0,
                book: [] 
            });
            console.log(this.users)

            return 0;
        }
       
    }

    /**
     * Moves to the next state for the given user
     * @param {String} userName 
     */
    this.nextState = (userName) => {
        for (const [key, value] of Object.entries(this.users)) {
            if (value.key === userName){
                this.users[key].value = (this.users[key].value + 1) % num_of_states

            }
        }
    };

    /**
     * returns the string that is needed for the user
     * @param {String} userName 
     */
    this.getText = (userName) => {
        for (const [ , value] of Object.entries(this.users)) {
            if (value.key === userName){
                switch(value.value) {
                    case 0:
                      return "Title: "
                    case 1:
                      return "Author: "
                    case 2:
                      return "Description: "
                    default:
                      return "... tell Santi that somethings wrong..."
                  } 
            }
            return "hmmm.... that's strange.... tell Santi something is amiss"
        }
    }

    /**
     * adds input into the user and after it changes the state
     * @param {String} userName 
     */
    this.sendText = (userName, text) => {
        if(!text){
            text = ""
        }
        for (const [ , value] of Object.entries(this.users)) {
            if (value.key === userName){
                if(value.value === 2) {
                    console.log("finish adding");
                    value.book.push(text);
                    console.log(value.book);
                    
                    getBook.getbooks((data) => {
                        data.counter += 1
                        var id = data.counter
                        data.books.push({
                            "id": id,
                            "title": value.book[0],
                            "author": value.book[1],
                            "description": value.book[2],
                            "recommended": value.key,
                            "voted": [
                            ],
                            "votes": 0
                        });
                        getBook.writeJSON(data);
                        });
                  }else{
                      value.book.push(text);
                  }
            }
            return "hmmm.... that's strange.... tell Santi something is amiss"
        }
    }
}

module.exports = StatesManager;
const num_of_states = 4
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
    this.checkState = (userName, callback) => {
        var found = false;

        for (const [ , value] of Object.entries(this.users)) {
            if (value.key === userName){
                found = true;
                console.log(`found ${value.key} and ${value.value}!`);
                callback(value.value);
            }
        }
        if (!found){
            this.users.push({
                key:   userName,
                value: 0,
                book: [] 
            });
            console.log("user: ")
            console.log(this.users)
            callback(0);
        }
       
    }

    /**
     * Moves to the next state for the given user
     * @param {String} userName 
     */
    this.nextState = (userName) => {
        for (const [, value] of Object.entries(this.users)) {
            console.log("value: ")
            console.log(value)

            if (value.key === userName){
                value.value = (value.value + 1) % num_of_states
            }
        }
    };

    /**
     * returns the string that is needed for the user
     * @param {String} userName 
     */
    this.getText = (userName) => {
        for (const [ , value] of Object.entries(this.users)) {
            console.log(`${value.key} <==> ${userName}`)
            if (value.key == userName){
                switch(value.value) {
                    case 0:
                      return "Title: "
                    case 1:
                      return "Author: "
                    case 2:
                      return "Description: "
                    case 3:
                        getBook.getbooks((data) => {
                            data.counter += 1
                            var id = data.counter

                            console.log(data)
                            console.log(id)

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
                            value.book = []
                            });
                        
                        return "Done!"
                    default:
                      return "... tell Santi that somethings wrong..."
                  } 
            }
        }
        return `bib bop: Error on getText(): ${userName} \n${this.users}`
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
                if(value.value === (num_of_states-2)) {
                    console.log("finish adding");
                    value.book.push(text);
                    console.log(value.book);
                  }else{
                      value.book.push(text);
                  }
            }
        }
    }
}

module.exports = StatesManager;
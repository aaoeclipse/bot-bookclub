const fs = require('fs')
var outputFilename = 'data/booklist.json';

var getbooks = (callback) => {
    fs.readFile('data/booklist.json', (err, data) => {
        if (err) {
            console.log(`Error reading file: ${err}`);
        }
        else {
            const books = JSON.parse(data);
            callback(books);
        }
    });
}

var rmBook = ((id, callback) => {
    var result = ""
    var found = false;

    fs.readFile(outputFilename, (err, data) => {

        const books = JSON.parse(data);
        if (!books)
            return;

        for (const book in books.books) {
            if (Object.hasOwnProperty.call(books.books, book)) {
                const element = books.books[book];
                console.log(element)
                if (element.id === parseInt(id)) {
                    books.books.splice(book, 1)
                    found = true
                    result = "Book Deleted"
                }
            }
        }
        if (!found) {
            result = "No books with given id";
        } else {
            var newId = 1;
            for (const book in books.books) {
                if (Object.hasOwnProperty.call(books.books, book)) {
                    const element = books.books[book];
                    element.id = newId;
                    newId += 1;
                }
            }
            books.counter -= 1;
            writeJSON(books);
        }

        callback(result);
    });
});

var voteForBook = (id, user, callback) => {
    console.log(id)

    var result = ""
    var found = false;

    fs.readFile(outputFilename, (err, data) => {
        const books = JSON.parse(data);

        for (const book in books.books) {
            if (Object.hasOwnProperty.call(books.books, book)) {
                const element = books.books[book];
                console.log(element)
                if (element.id === id) {
                    var index = element.voted.indexOf(user);
                    // no ha votado
                    if (index === -1) {
                        element.voted.push(user)
                        element.votes += 1
                        found = true;
                        result = `${JSON.stringify(element)}\nSuccessfuly Voted!`;
                    } else if (index !== -1) {
                        // ya voto
                        element.voted.splice(index, 1);
                        element.votes -= 1
                        found = true;
                        result = `${JSON.stringify(element)}\nSuccessfuly Removed!`;
                    }
                }
            }
        }
        if (!found) {
            result = "No books with given id";
        } else {
            writeJSON(books);
        }
        callback(result);
    });
}

var writeJSON = (jsonData) => {
    fs.writeFile(outputFilename, JSON.stringify(jsonData, null, 4), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved to ");
        }
    });
}


module.exports.getbooks = getbooks;
module.exports.voteForBook = voteForBook;
module.exports.writeJSON = writeJSON;
module.exports.rmBook = rmBook;
const fs = require('fs')

var outputFilename = 'test.json';

var writeJSON = (jsonData) => {
    fs.writeFile(outputFilename, JSON.stringify(jsonData, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to ");
        }
    }); 
}
fs.readFile('test.json', (err,data) =>{
    const books = JSON.parse(data);
    for (const book in books.books) {
        if (Object.hasOwnProperty.call(books.books, book)) {
            const element = books.books[book];
            if (element.id === 2){
                var index = element.voted.indexOf('aaoeclipse');
                // no ha votado
                if (index === -1){
                    element.voted.push("aaoeclipse")
                    element.votes += 1
                    console.log(element);
                    console.log("vote succesfully counted!")
                    // vote succesfully counted!
                }else if (index !== -1){
                    // ya voto
                    element.voted.splice(index, 1);
                    element.votes -= 1
                    console.log("vote succesfully removed!")
                    // vote succesfully removed!
                }
            }
        }
    }
    writeJSON(books);
});
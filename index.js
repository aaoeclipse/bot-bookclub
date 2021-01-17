const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const getBook = require('./bookmanager.js');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    // ${message.author.username}

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === `help`) {
        instructions(msg);
    }
    if (command === `list`) {
        getBook.getbooks(books =>{
            books.books.forEach(book => {
                msg.channel.send(`${book.id}: ${book.title} - ${book.author} 
--- \t Description: ${book.description}  
--- \t Recommended by: @${book.recommended}  
--- \t Number of Votes: ${book.votes}  
--- \t Users Who Voted: ${book.voted}`)
            });
        });   
    }
    if (command === (`vote`)){
        if (!args.length){
            msg.channel.send(`Yo hommie, you forgot to put which id of book to vote for -.-`) 
        }else if (! isNumeric(args[0])) {
            msg.channel.send(`dude, you have to put an id... that's a number...`) 
        }else {
            getBook.voteForBook(Number(args[0]), msg.author.username, (result) =>{
                msg.channel.send(`${result}`)
            });
        }
    }

    if (command === `add`) {
        msg.channel.send(`Sorry! under contruction. Hey ${msg.author.username} don't blame me! it's aaoeclipse's fault
        tell him to finish building me. He's a lazy mf.`)
    }
 });

 var instructions = (msg) => {
    msg.channel.send('Bib pop! I\'m bookclub bot, here to help you be a better reader\nHere are all my commands that my master has coded for me: \
    \n* !add - I would help you to add a book to the recommended list! \
    \n* !list - shows all the books that have been sugested \
    \n* !vote {id} - vote for a specific book that might interest you \
    \n* !rm - removes a book from the list \
    \n* Boop! I\'m still learning and if I crash or something, just remember that Santiago programmed me, and he is not a very good programer, bib bop');
 }

 function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

client.login(token);
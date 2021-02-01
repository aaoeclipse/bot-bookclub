const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const getBook = require('./managers/bookmanager.js');
const StateManager = require('./managers/statemanager.js')

const states = new StateManager()


client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
    if ( msg.author.bot ) return;

    states.checkState(msg.author.username, (currState) => {
        if (currState !== 0){
            states.sendText(msg.author.username, msg.content) //
            msg.channel.send(states.getText(msg.author.username))
            states.nextState(msg.author.username)
        }else{
            if (!msg.content.startsWith(prefix)) return;

            const args = msg.content.slice(prefix.length).trim().split(' ');
            const command = args.shift().toLowerCase();

            if (command === `help`) {
                instructions(msg);
            }
            
            if (command === (`add`)){
                if (!args.length){
                    // no arguments
                    msg.channel.send(`Hi ${msg.author.username}, let me help you with that`)
                    msg.channel.send(states.getText(msg.author.username))
                    states.nextState(msg.author.username)
                } else {
                    msg.channel.send(`Hi ${msg.author.username}, let me help you with that\nI see you already put the title so lets jump to the next part!`)
                    if (args.length > 1){
                        states.sendText(msg.author.username, args.join(" "))
                    }else {
                        states.sendText(msg.author.username, args)
                    }
                    states.nextState(msg.author.username)
                    msg.channel.send(states.getText(msg.author.username))
                    states.nextState(msg.author.username)
                }
            }

            if (command === `list`) {
                var bookStringFormat = "";
                getBook.getbooks(books =>{
                    books.books.forEach(book => {
                        bookStringFormat += (`${book.id}: ${book.title} - ${book.author} 
        --- \t Description: ${book.description}  
        --- \t Recommended by: @${book.recommended}  
        --- \t Number of Votes: ${book.votes}  
        --- \t Users Who Voted: ${book.voted}\n`)
                    });
                    msg.channel.send(bookStringFormat);
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

            if (command === (`rm`)){
                if (!args.length){
                    msg.channel.send(`Yo hommie, you forgot to put which id of book to vote for -.-`) 
                }else if (! isNumeric(args[0])) {
                    msg.channel.send(`dude, you have to put an id... that's a number...`) 
                }else {
                    getBook.rmBook(args[0], (result)=>{msg.channel.send(result)})
                }
            }

            if (command === (`ch`)){
                if (!args.length)
                    msg.channel.send(`You have to say which chapter you are in!`) 
                else if(!isNumeric(args[0])){
                    msg.channel.send(`You have to say the # of the chapter you are in!`) 
                }else {
                    let myRole = msg.guild.roles.cache.find(role => role.name === `Chapter ${args[0]}`);
                    if(!myRole){
                        msg.channel.send(`Sorry, no role created for this chapter yet`) 
                    }else{
                        msg.member.roles.add(myRole).catch(console.error);
                    }
                }
            }

        }

    });
 });

 var instructions = (msg) => {
    msg.channel.send('Bib pop! I\'m bookclub bot, here to help you be a better reader\nHere are all my commands that my master has coded for me: \
    \n* !add - I would help you to add a book to the recommended list! \
    \n* !list - shows all the books that have been sugested \
    \n* !vote {id} - vote for a specific book that might interest you \
    \n* !rm - removes a book from the list \
    \n* !ch [# of chapter] - select the chapter you are on! \
    \n* Boop! I\'m still learning and if I crash or something, just remember that Santiago programmed me, and he is not a very good programer, bib bop');
 }

 function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

client.login(token);
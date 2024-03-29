const SlackBot = require('slackbots');
const Axios = require('axios');

const bot = new SlackBot({
  token: #TODO: INPUT YOUR SLACK BOT OAUNTH TOKEN HERE
  name: 'jokebot'
});

//Start Handler
bot.on('start', () => {
  var params = {
        icon_emoji: ':smiley:'
    };

  bot.postMessageToChannel('general', 'Get Ready To Laugh With @Jokebot', params);
});

//Error Handler
bot.on("error", (err) => console.log(err))

//Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message') {
  return
}

  handleMessage(data.text);
});

//Responds to Data
function handleMessage(message) {
  if(message.includes(' chucknorris')) {
    chuckJoke();
  }

  else if(message.includes(' yomomma')){
    yoMommaJoke();
  }

  else if(message.includes(' random')){
    randomJoke();
  }

  else if(message.includes(' help')){
    runHelp();
  }
}


//Tell a Chuck Norris Joke
function chuckJoke()
{
  Axios.get('http://api.icndb.com/jokes/random/').then(res => {
    const joke = res.data.value.joke;
    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
}

//Tell a Yo Momma Joke
function yoMommaJoke()
{
  Axios.get('https://api.yomomma.info').then(res => {
    const joke = res.data.joke;
    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params);
  });
}

//Tell a Random Joke
function randomJoke()
{
  const rand = Math.floor(Math.random() * 2);
  if (rand == 0) {
    chuckJoke();
  }

  else if (rand == 1) {
    yoMommaJoke();
  }
}

//Show bot help
function runHelp()
{
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomomma' or 'random' to hear a joke`, params);
}
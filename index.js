const SlackBot = require('slackbots');
const Axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-682956834919-683254336406-dNVuPa7zik3OWW0B34hVamuR',
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
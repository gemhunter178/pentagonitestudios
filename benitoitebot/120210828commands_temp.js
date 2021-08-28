const prefix = '!!';
const defCommands = [
  {
    name: 'hello',
    cd: 1000,
    mod: 0,
    desc: 'default command, sort of a !ping. Bot says hi to you'
  },
  {
    name: 'logme',
    cd: 10000,
    mod: 0,
    desc: 'displays contents of user object on console. Mostly for debugging purposes',
  },
  {
    name: 'goodbye',
    exVar: 'cooldown',
    mod: -1,
    desc: 'shuts off the bot',
  },
  {
    name: 'commands',
    exVar: 'cooldown',
    cd: 1000,
    mod: 0,
    desc: 'lists all enabled commands on the channel (as long as within character limit)'
  },
  {
    name: 'cd',
    exVar: 'cooldown',
    mod: 1,
    desc: 'changes the cooldown of a command for the channel, in seconds. Example: \'' + prefix + 'cd ' + prefix + 'hello 10\''
  },
  {
    name: 'disable',
    exVar: 'cdDisable',
    mod: 1,
    desc: 'Disables a command for the channel. Example: \'' + prefix + 'disable ' + prefix + 'hello\''
  },
  {
    name: 'enable',
    exVar: 'cdEnable',
    mod: 1,
    desc: 'Enables a command for the channel. Example: \'' + prefix + 'enable ' + prefix + 'hello\''
  },
  {
    name: 'timer',
    exVar: 'timerObject',
    mod: 1,
    desc: 'adds a timer: \'' + prefix + 'timer [time in minutes] [message]\''
  },
  {
    name: 'deltimer',
    exVar: 'timerObject',
    mod: 1,
    desc: 'deletes most recently added timer'
  },
  {
    name: 'convert',
    cd: 10000,
    mod: 0,
    desc: null //convert already has it's own help function currently, might migrate here eventually
  },
  {
    name: 'define',
    exVar: 'wordsApiData',
    cd: 10000,
    mod: 1,
    desc: 'returns a definition of the word, powered by WordsApi (#notspon)'
  },
  {
    name: 'fish',
    cd: 5000,
    mod: 0,
    desc: 'The famous fish command that started the drive behind this bot.'
  },
  {
    name: 'fishstats',
    cd: 15000,
    mod: 0,
    desc: 'Displays the current month\'s ' + prefix + 'fish records.'
  },
  {
    name: 'morse',
    cd: 10000,
    mod: 0,
    desc: 'Converts to/from morse. From morse requires the query to start with \'.\' \'-\' or \'_\' ...or if asking: help -> .... . .-.. .--'
  },
  {
    name: 'codeword',
    cd: 5000,
    mod: 0,
    desc: 'Enter a query and try to find the codeword! example: codeword is "test" -> a query of "seat" would give 2 matching places (-e-t) and 1 other matching character (s)'
  },
  {
    name: 'trivia',
    exVar: 'saveChats',
    cd: 1000,
    mod: 1,
    desc: 'trivia, powered by Open Trivia Database! (#notspon) to play enter A | B | C | D for multiple choice or T | F for true false questions!'
  },
  {
    name: 'tone',
    cd: 10000,
    mod: 0,
    desc: 'A tone indicator lookup based on toneindicators and tonetags on carrd co'
  },
  {
    name: 'purge',
    exVar: 'allowPurge',
    mod: 1,
    desc: 'bans all users on a predefined list. Requires asking the bot owner to enable'
  },
  {
    name: 'allowpurge',
    exVar: 'allowPurge',
    mod: -1,
    desc: '[bot owner only] allows use of purge for 5 minutes. or user query \'false\' to end before 5 minutes'
  },
  {
    name: 'test',
    mod: -1,
    desc: 'a test command to test if this object file is working.'
  }
]
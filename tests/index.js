var child_process = require('child_process')

var tests = [
    child_process.fork(__dirname + '/test-use-default-config.js', [], {stdio: 'inherit'}),
    child_process.fork(__dirname + '/test-share-socket.js', [], {stdio: 'inherit'}),
]


// well done -- nodejs will wait for all children processes exit.



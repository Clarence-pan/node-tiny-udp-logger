var logger = require('../index.js')({port: 514, host: 'localhost', shareSocket: true})



console.log("Begin test... ")


logger.log(__filename + ": Hello world!", function(err){
    console.log("Log message sent. Error: ", err);
    logger.close()
})




console.log("End test...")


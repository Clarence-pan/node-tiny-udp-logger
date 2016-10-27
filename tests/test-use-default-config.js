var logger = require('../index.js')()



console.log("Begin test... ")


logger.log(__filename + ": Hello world!", function(err){
    console.log("Log message sent. Error: ", err);
})




console.log("End test...")



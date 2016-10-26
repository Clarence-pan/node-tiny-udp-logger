var logger = require('./')(514, 'localhost')



console.log("Begin test: ", logger)


logger.log("Hello world!", function(err){
    console.log("Error: ", err);
})


logger.close()


console.log("End test...")

setTimeout(function () {
    console.log("End...")
}, 3000)


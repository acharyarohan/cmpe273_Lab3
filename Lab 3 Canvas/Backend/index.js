

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()

//allow cross origin request
app.use(cors());

mongoose.connect('mongodb+srv://rohan:rohan@cluster0-64nms.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open', () => {
    console.log("Connected to mongoDB ATLAS for graphql")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(3000, () => {
    console.log("Listening all requests on port 3000");
})
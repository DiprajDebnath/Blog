const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://root:example@localhost:27017/blog?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("database connected");
    })
    .catch(err => {
        console.log("Could not connect", err);
    });

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    const articles = [{
        title: "Test Article1",
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: "Test Article2",
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: "Test Article3",
        createdAt: new Date(),
        description: 'Test description'
    }]

    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)
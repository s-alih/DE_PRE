const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`Connected to the port ${port}`)
})

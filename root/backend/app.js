const connectToMongo = require('./db')
const cors = require('cors')
const express =require('express')

connectToMongo();

const app = express()
const port = 5000

//Available routes
app.use(cors({
    origin: ['http://localhost:3000'], // Allow these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow cookies and authorization headers
}));
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/admin', require('./routes/customers'))
app.use('/api/admin', require('./routes/product'))
app.use('/', require('./routes/product'))

app.get('/', (req, res)=>{
    res.send("<h1>Hello World</h1>")
})

app.get('/api/v1/login', (req, res)=>{
    res.send("<h1>Hello LOGIN</h1>")
})

app.get('/api/v1/signup', (req, res)=>{
    res.send("<h1>Hello SIGNUP</h1>")
})


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
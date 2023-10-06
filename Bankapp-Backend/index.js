//Backend for Bank app

//Create a server application using express 

//1 import express
const express= require('express');
//4 import cors
const cors= require('cors');
//import logic
const logic = require('./services/logic')
//import jsonweb token
const jwt = require('jsonwebtoken')

//2 Create a server application using express
const server = express()

//5 use cors
server.use(cors({
    origin:'http://localhost:4200'
}))
//6 
server.use(express.json())//Returns middleware that only parses json


//3 setup port for server application
server.listen(5000,()=>{
    console.log('server listening on port 5000');
})

// //API call to resolve -localhost:5000
// server.get('/',(req,res)=>{
//     res.send('Welcome to backend')
// })
// server.post('/',(req,res)=>{
//     console.log('server post');
// })


//Application -level middleware
// const appMiddleware = (req, res, next) =>{
//     console.log('Application -level middleware');
//     next();
// }
// server.use(appMiddleware)

//Router level middleware
const jwtMiddleware = (req,res,next) =>{
    console.log('Router -level middleware');

    try{
        const token =req.headers['verify-token']
        console.log(token);
        const data = jwt.verify(token,'superkey2023')
        console.log(data);//
        req.currentAcno=data.loginAcno
        next()
    }
   catch{
        res.status(401).json({message:"Please login"})
   }
}
//API CALLS 
//Register - localhost:5000/register=
server.post('/register',(req,res)=>{
    console.log('Inside register API call');
    console.log(req.body);
    //logic to resolve register request
    logic.register(req.body.username,req.body.acno,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
    

})
//login - localhost:5000/login
server.post('/login',(req, res)=>{
    console.log('Inside login API call');
    console.log(req.body);
    //logic to resolve login request
    logic.login(req.body.acno, req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})
//balance - localhost:5000/balance
server.get('/getbalance/:acno',jwtMiddleware,(req, res)=>{
    console.log('Inside balance API call');
    console.log(req.params);//http://localhost:5000/getbalance/100
    logic.getBalance(req.params.acno).then((response)=>{
        res.status(response.statusCode).json(response) 
    })
})
//fund transfer - localhost:5000/fund transfer
server.post('/fundtransfer',jwtMiddleware,(req,res)=>{
    console.log('Inside fundtransfer API call');
    console.log(req.body);
    logic.fundTransfer(req.currentAcno,req.body.password,req.body.toAcno,req.body.amount).then((response)=>{
        res.status(response.statusCode).json(response) 
    })
})

//transactions - localhost:5000/transactions
server.get('/transactions',jwtMiddleware,(req,res)=>{
    console.log('Inside transaction API call');
    logic.transactionHistory(req.currentAcno).then((response)=>{
        res.status(response.statusCode).json(response) 
    })
})

//delete account
server.delete('/deleteAccount',jwtMiddleware,(req,res)=>{
    console.log('Inside the delete API request');
    logic.deleteAccount(req.currentAcno).then((response)=>{
        res.status(response.statusCode).json(response) 
    })
})
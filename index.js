const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/product');
const app = express();

app.use(cors());  // Add this line to enable CORS
app.use(express.json());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});


app.post('/login', async (req,resp)=>{
    if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if (user) {
        resp.send(user);
    } else {
        resp.status(404).send('User Not Found');
    }}else{
        resp.status(404).send('User Not Found');
    }
}) 


app.post('/add-product', async (req, resp) => {
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

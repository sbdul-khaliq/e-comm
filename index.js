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

app.get('/products',async (req,resp)=>{
   let product = await Product.find();
   if(product.length > 0){
    resp.send(product);
   }else{
    esp.send("products : not found");
   }
})

app.delete('/prodcut/:id',async(req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
})



app.get("/updateproduct/:id", async (req, resp) => {
    // Assuming `id` is the MongoDB ObjectId; adjust query as needed
    const product = await Product.findById(req.params.id);
  
    if (product) {
        resp.json(product);
    } else {
        resp.status(404).json({ message: "No Record Found." });
    }
  });
  

  app.put('/updateproduct/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // The data to update the product

        // Find and update the product by its ID
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (product) {
            resp.json(product);
        } else {
            resp.status(404).json({ message: 'No Record Found.' });
        }
    } catch (error) {
        resp.status(500).json({ message: 'Server Error', error: error.message });
    }
});


app.get("/search/:key", async (req, resp) => {
    const searchKey = req.params.key;

    let result = await Product.find({
        "$or": [
            { name: { $regex: searchKey, $options: 'i' } },
            { company: { $regex: searchKey, $options: 'i' } },
            { category: { $regex: searchKey, $options: 'i' } },
            { price: { $regex: searchKey, $options: 'i' } }
        ]
    });

    resp.send(result);
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

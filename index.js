const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const imgData = require('./imageData.json')
app.use(cors());
require('dotenv').config()
app.use(express.json())
// toys Shop 
// eUDFPWMFuWaCTOey
console.log(process.env.DB_user)
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.ytnqryr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    const addToysCollection = client.db('addToys').collection('toys')
    const toysCollection = client.db('CarsToy').collection('cars');
    app.post('/addtoys', async (req, res) => {
      const body = req.body;
      const result = await addToysCollection.insertOne(body);
      res.send(result);

    })

    app.get('/data/:category', async (req, res) => {
      const category = req.params.category;
      if (category == 'Vintage Cars' || category == 'Off-Road Vehicles' || category == 'Sports Cars') {
        const result = await toysCollection.find({
          subcategory: category
        }).toArray();
        res.send(result)
      } else {
        res.send({
          massage: "category data not found"
        })
      }

    })
    app.get('/viewDetail/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await toysCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/addDataDetail/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await addToysCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/allToys', async (req, res) => {
      const result = await addToysCollection.find().limit(20).toArray()
      res.send(result)
    })
  
  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({
      ping: 1
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/imgData', (req, res) => {
  res.send(imgData);
})
app.get('/', (req, res) => {
  res.send('server running')
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
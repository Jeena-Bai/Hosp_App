const express = require("express")
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser")
router.use(express.json())
router.use(bodyParser.json())
router.use(express.urlencoded({ extended: true }));
const dataPath = './hosp.json'

const writeData = (data) => {                       //write to JSON using fs module
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}
const readData = () => {                           //read from JSON
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)   
}

// GET Method
router.get('/getData', (req, res) => {
  const data = readData()
  //console.log(data)
  res.send(data)
})

//POST Method
router.post('/addData', (req, res) => {
  var exist=readData()
  const newId="5";
  exist[newId]=req.body;
//exist["P5"]=user["P5"]
console.log(exist);
writeData(exist);
res.send('data added successfully')
})

//PUT Method
router.put('/updateData/:id', (req, res) => {

    var exist = readData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const Id = req.params['id'];
      exist[Id] = req.body;
      writeData(exist);
      res.send(`accounts with id ${Id} has been updated`)
    }, true);
  });


  //DELETE Method
 router.delete('/deleteData/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var exist= readData()
      const userId = req.params['id'];
      delete exist[userId]; 
    writeData(exist);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  })
 



module.exports = router;



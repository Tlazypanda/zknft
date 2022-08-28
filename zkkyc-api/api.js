const express = require('express');
const fileUpload = require('express-fileupload');
var multer  =   require('multer');  
path = require('path');

const NFT_STORAGE_KEY = 'abc';
//const { ethers } = require("hardhat");
const fs = require("fs");
const { groth16 } = require("snarkjs");
const { plonk } = require("snarkjs");

const app = express();
app.use(express.json());
// const fileUpload = require('express-fileupload');
const vision = require('@google-cloud/vision');
const { text } = require('body-parser');


// Helper function
function base64_encode(file) {
    return "data:image/jpeg;base64," + fs.readFileSync(file, 'base64');
}

function getAge(dateString) 
{
    var today = new Date();
    console.log(today);
    var parts =dobString.split('/');
    var birthDate = new Date(parts[2],parts[1]-1,parts[0]);
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
        console.log("Uploading file to path")
      callback(null, 'C:/Users/INLEDUG/Downloads/upload');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('myfile');  
    

//READ Request Handlers
app.post('/api/upload', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req);

    try{
    upload(req,res,function(err) { 
        if(err) {  
            return res.status(400).send("Error uploading file.");  
        }  
    });  

    console.log(res)
    const client = new vision.ImageAnnotatorClient({
        "keyFilename": "./google-cloud-vision-key.json"
    });
    console.log("this is client", client)

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName = './aadhar.png';

// Performs text detection on the local file
const [result] = await client.textDetection(fileName);
console.log(result);
const detections = result.textAnnotations;
console.log('Text:');
// detections.forEach(text => console.log(text));
//     console.log(description);
//     // const resObj = {
//     //     'content': content
//     // }
//     //res.send(resObj);()

//Check for aadhar, PAN, passport
//PAN

position = detections[0].description.indexOf("DOB:");
console.log(position);
dobString = detections[0].description.substring(position+5, position+16);
console.log(dobString);
var age = getAge(dobString);

const resObj = {
	'age':age,
}
res.send(resObj);
}catch(e){
console.log(e);
res.status(500);
res.send(e);
}

});

function unstringifyBigInts(o) {
    if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
        return BigInt(o);
    } else if ((typeof(o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o) ))  {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o===null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach( (k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}


//READ Request Handlers
app.get('/api/verify', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    try{
    
    const age = req.query.age;
    const ageLimit = req.query.ageLimit;
    console.log(age);
    console.log(ageLimit);
    
        //This line is making a call to create the proof using groth16
                const { proof, publicSignals } = await plonk.fullProve({"in":[age, ageLimit]}, './circuit.wasm', './circuit_final.zkey');
		console.log("gen");
                const editedPublicSignals = unstringifyBigInts(publicSignals);
                const editedProof = unstringifyBigInts(proof);
		console.log("ed");
                //Create the calldata to call the Solidity verifier contract with the edited proof and public signals
                const calldata = await plonk.exportSolidityCallData(editedProof, editedPublicSignals);

                const argv = calldata.replace(/["[\]\s]/g, "").split(',');
		console.log(argv);
                const argv2 = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
		console.log(argv2);
                        const resObj = {argv: argv, argv2: argv2}
                        res.send(resObj);
                        }
                        catch(e)
                        {
                        const errObj = {"err": e};
                        res.status(400);
                        res.send(errObj);
                        }
});



//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

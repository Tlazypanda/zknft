import React, { useEffect, useState } from "react";
import './styles/App.css';
import video from './assets/random.webm';
import twitterLogo from './assets/twitter-logo.svg';
import gratitudeGif from './assets/gratitude-thankful.gif';
import myNft from './utils/MyNft.json';
import zkabi from './utils/zkabi.json';
import zkNFT from './utils/zkNFT.json';
import myGratitude from './utils/MyGratitude.json';
import { ethers } from "ethers";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
//import { NFTStorage, File } from 'nft.storage';
import env from "react-dotenv";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StorageProvider } from '@arcana/storage/dist/standalone/storage.umd';
import { AuthProvider } from '@arcana/auth';
import { BsInfoCircle } from "react-icons/bs";
import Grid from '@mui/material/Grid';
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'

import axios from 'axios';
const fs = require("fs");
const vision = require('@google-cloud/vision');





const InputUpload = styled('input')({
  display: 'none',
});


const OPENSEA_LINK = '';
const CONTRACT_ADDRESS = "0xb18bb99c7849D39a27395dE2f412cc470f76947E";
const ZK_CONTRACT_ADDRESS = "0xd832fbBd00d73e2Bb850F1485E598f15b8Df695b";
const NFT_STORAGE_KEY = env.NFT_STORAGE_KEY;

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [mintCount, setMintCount] = useState(0);
    const [name, setName] = useState("");
    const [num, setNum] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageAadharfront, setImageAadharfront] = useState(null);
    const [imageAadharback, setImageAadharback] = useState(null);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState(null);
    const [gratitude, setGratitude] = useState(null);
    const [age, setAge] = useState(0);
    const [ageverified, isage] = useState(false);
    const [countryverified, iscountry] = useState(false);
    const [daoname, setDaoname] = useState("");
    const [shareAddress, setShareAddress] = useState("");

    const daoagelimits = {"polygon": 18, "near": 16, "biconomy": 18, "solana": 18};

    const checkIfWalletIsConnected = async() => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);

        // String, hex code of the chainId of the Rinkebey test network
        //const rinkebyChainId = "0x40405";
        // const rinkebyChainId = "0x80001";
        // if (chainId !== rinkebyChainId) {
        //     alert("You are not connected to the Mumbai Polygon Test Network!");
        // }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account)

            setupEventListener();
        } else {
            console.log("No authorized account found")
        }
    }

    const uploadArcana = async() => {
      try{
        //logic for ocr
        let resObj;
        let resStatus;
        await axios.post(`http://localhost:8080/api/upload`)
.then(res => {
resObj = res.data;
resStatus = res.status;
console.log(res);
setAge(resObj['age']);
console.log(resObj['age']);
})

        const auth = new AuthProvider('2180')

    await auth.init({
      //appMode can be 0, 1, or 2 depending upon wallet UI mode that needs to be configured
      // no ui, widget, full ui modes.
      appMode: 2,
      position: "right",
    });

    const provider = auth.getProvider();
        console.log(provider);
        const imageblob = await getExampleImage('aadhar.png');
        console.log(imageblob);
      const dAppStorageProvider = new StorageProvider({
              appId: 2180,
              provider: window.ethereum,
              email: 'itm2017004@iiita.ac.in',
      });


      const Uploader = await dAppStorageProvider.getUploader();
      debugger
	  // file: Blob format
await Uploader.upload(imageblob);
  //Uploader.upload(imageAadharback);
  console.log("Uploaded to Arcana");
  alert("Data extracted & Uploaded to Arcana");
    }
    catch(error){
      console.log(error)
    }
}

const shareArcana = async() => {
  try{
  const dAppStorageProvider = new StorageProvider({
          appId: 2180,
          provider: window.ethereum,
          email: 'itm2017004@iiita.ac.in',
  });
  let files = await dAppStorageProvider.myFiles();
  console.log(files);
  const Access = new dAppStorageProvider.getAccess();
  let did = files[0]['did'];
  let address = 0xF7d1FBc5e5ff0118B4Ddee8E62c2dA90AfEeb7d8;
  Access.share([did], [address]);
//Uploader.upload(imageAadharback);
console.log("Shared with Arcana")
}
catch(error){
  console.log(error)
}
}

const getOcrdetails = async() => {

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs text detection on the local file
const [result] = await client.textDetection(imageAadharfront);
const detections = result.textAnnotations;
console.log('Text:');
detections.forEach(text => console.log(text));
}

    /*
     * Implement your connectWallet method here
     */
    const connectWallet = async() => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            let chainId = await ethereum.request({ method: 'eth_chainId' });
            console.log("Connected to chain " + chainId);

            // String, hex code of the chainId of the Rinkebey test network
            const rinkebyChainId = "0x13881";
            if (chainId !== rinkebyChainId) {
                alert("You are not connected to the Mumbai Test Network!");
            }

            /*
             * Fancy method to request access to account.
             */
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            /*
             * Boom! This should print out public address once we authorize Metamask.
             */
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);

            setupEventListener();
        } catch (error) {
            console.log(error)
        }
    }

    const setupEventListener = async() => {
        // Most of this looks the same as our function askContractToMintNft
        try {
            const { ethereum } = window;

            if (ethereum) {
                // Same stuff again
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myNft.abi, signer);

                // THIS IS THE MAGIC SAUCE.
                // This will essentially "capture" our event when our contract throws it.
                // If you're familiar with webhooks, it's very similar to that!
                connectedContract.on("NewNFTMinted", (from, tokenId) => {
                    console.log(from, tokenId.toNumber())
                    alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
                });

                console.log("Setup event listener!")
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

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

async function getExampleImage(path) {
  const imageOriginUrl = path;
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

    const askContractToMintNft = async() => {


        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wallet_address = await signer.getAddress();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, zkNFT, signer);

		  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  console.log("Uploading to nft.storage...");
  let today = new Date();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    let timestamp = hours + ':' + minutes + ':' + seconds;

    let blob1;

    const imageblob = await getExampleImage("morflax-studio.png ");
//     fetch("morflax-studio.png",{
//           headers : {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//            }
//          }).then(response => {
//            console.log(response);
//   response.blob();
//   blob1 = response.body;
// }).then(blob => {
//   // 'blob' is the image in blob form
//   console.log(blob);
// });

  const metadata = await client.store({
    name: 'KYC Verified',
    description: "This user's age info is KYC Verified for DAO "+ daoname + ". Created at " + timestamp,
    image: imageblob,
  });
  console.log(`Upload complete! Minting token with metadata URI: ${metadata.url}`);

  // the returned metadata.url has the IPFS URI we want to add.
  // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
  const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");

                console.log("Going to pop wallet now to pay gas...")
                let nftTxn = await connectedContract.mintToken(wallet_address, metadataURI);

                console.log("Mining...please wait.")
                await nftTxn.wait();

                console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const askContractToVerify = async() => {


        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wallet_address = await signer.getAddress();
                const connectedContract = new ethers.Contract(ZK_CONTRACT_ADDRESS, zkabi, signer);

                const ageLimit = daoagelimits[daoname];

                let resObj;
                let resStatus;
                await axios.get(`http://localhost:8080/api/verify`, {
  params: {
    "age": age, "ageLimit": ageLimit
  }
})
      .then(res => {
        resObj = res.data;
        resStatus = res.status;
        console.log(res);

      })

      if(resStatus == 200){
                const argv = resObj['argv']

                const argv2 = resObj['argv2'];

                console.log("Going to pop wallet now to check proof...")
                let proof = await connectedContract.verifyProof(argv[0], [argv2[1]]);
                console.log(proof);
                  alert("Proof verified");
                isage(true);
              }
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
          console.log("Proof Failed");
          alert("Proof failed");
          isage(false);
            console.log(error)
        }
    }

    const saveSvg = (svgData) => {
      var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
      var svgUrl = URL.createObjectURL(svgBlob);
      var downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download =  name + ".svg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
}

    // Render Methods
    const renderNotConnectedContainer = () => ( <
        button onClick = { connectWallet }
        className = "cta-button connect-wallet-button" >
        Connect to Wallet <
        /button>
    );

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    useEffect(() => {
  console.log(imageAadharfront);
}, [imageAadharfront, setImageAadharfront])

    /*
     * Added a conditional render! We don't want to show Connect to Wallet if we're already conencted :).
     */
    return ( <
            div className = "App" >
            <
            div className = "container" >
            <
            div className = "header-container" >
            <
            p className = "header" > zkKYC < /p> <
            p className = "sub-text" >
            Verifying you <
            /p>
    <div>

    <Grid item xs={8}>
    <div style={{width: "25%", padding: "25px", margin: "auto"}} className="p-3 sm:w-96 flex-row justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-30 h-10 rounded-full pl--25 flex justify-center items-center">
                      {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                    {currentAccount}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      Wallet
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
            </div>


    <
    p className = "sub-text white">
    Select DAO <
    /p>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label" style={{color: "white", padding: "25px", margin: "auto"}}>DAO</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={daoname}
    label="Avatar Style"
    onChange={e => {
      console.log(e.target.value);
setDaoname(e.target.value);
}}
  >
    <MenuItem value="polygon">Polygon</MenuItem>
    <MenuItem value="near">NEAR</MenuItem>
    <MenuItem value="solana">Solana</MenuItem>
    <MenuItem value="biconomy">Biconomy</MenuItem>
  </Select>
</FormControl>
</div>

  <div className='upload-container'>
          <label htmlFor="contained-button-file">
<InputUpload accept="image/*" id="contained-button-file" type="file" onChange={(e) => {
    setImageAadharfront(e.target.files[0]);
    console.log(e.target.files[0]);
    alert("Uploaded " + e.target.files[0].name);
  ;}
  }/>
<Button className = "cta-button connect-wallet-button" style={{color: "white", marginRight: "10px"}} component="span">
  Upload Document
</Button>

</label>
<Button className = "cta-button connect-wallet-button" style={{color: "white"}} component="span" onClick={uploadArcana}>
Submit
</Button>

</div>
<Button className = "cta-button connect-wallet-button" style={{color: "white", width: "25%", padding: "25px", margin: "auto"}} component="span" onClick={shareArcana}>
  Share Document
</Button>
<div>
        <Input className='name-container' color="primary" style={{color: "white"}} placeholder="Enter address to share with" onChange={e => {
  setShareAddress(e.target.value);
}}/></div>

{
            currentAccount === "" ? (
                renderNotConnectedContainer()
            ) : (
              <div><
                button onClick = { askContractToMintNft }
                className = "cta-button connect-wallet-button" >
                Mint NFT <
                /button>
                <
                    button onClick = { askContractToVerify }
                    className = "cta-button connect-wallet-button" >
                    Verify <
                    /button>
                    </div>
            )
        }  < /
    div > < /
    div >
);
};

export default App;

import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import logo from "../../images/ZKYC-1.png";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
// import ReactDOM from "react-dom/client";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <br/>
          <br/>
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Prove your legitimacy in secrecy
          </h1>
          <p className="text-2xl mt-5 text-white font-light md:w-12/12 w-12/12 text-base">
            Multiple DAOs, Single KYC | Easy Grants. Easy Loans.
          </p>
          <br/>
          <br/>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 p-25 ">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security and Privacy</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Blockchain Agnostic
            </div>
            <div className={companyCommonStyles}>Web3</div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={companyCommonStyles}>Decentralised</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Zero-Knowledge
            </div>
            <div className={companyCommonStyles}>NFT</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Cryptographic
            </div>
          </div>
        </div>
      </div>
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex-row flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="flex-col flex-1 items-center justify-start w-48 mf:mt-0 mt-10">
              <div>
                  {!currentAccount && (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                  >
                    <AiFillPlayCircle className="text-white mr-2" />
                    <p className="text-white text-base font-semibold">
                      Connect Wallet
                    </p>
                  </button>
                )}
              </div>
              <div className="p-3 sm:w-96 flex-row justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-30 h-10 rounded-full pl--25 flex justify-center items-center">
                      {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                      {shortenAddress(currentAccount)}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      Wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 sm:w-96 w-full flex-col justify-start items-center blue-glassmorphism">
              {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} /> */}
              {/* <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}
              {/* <Input placeholder="Upload Aadhar" name="keyword" type="text" handleChange={handleChange} /> */}
              {/* <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}

              {/* <div className="h-[1px] w-full bg-gray-400 my-2" /> */}

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                    Enter App
                  </button>
                )}
            </div>
            {/* <div className="p-5 sm:w-96 w-full flex-1 flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Generate Validity Proof
                  </button>
                )}
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

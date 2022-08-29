import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ message, img }) => {
  // const gifUrl = useFetch({ keyword });

  return (
    <div className=" m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3 white-glassmorphism p-2">
        <div className="display-flex justify-start w-full mb-6 p-2">
          {/* <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a> */}
          {/* <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a> */}
          {/* <p className="text-white text-base">Amount: {amount} ETH</p> */}
        </div>
        <img
          src={img}
          className="w-52 h-52 cursor-pointer"
          alt="nature"
        />
        {message && (
            <>
              <br />
              <p className="text-white justify-start items-center"> {message}</p>
            </>
          )}
        {/* <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div> */}
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Add KYC to our partner DAOs
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to any of our partnered DAOs
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Transactions;

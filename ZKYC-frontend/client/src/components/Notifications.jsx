import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import { useState } from "react";


const Notifications = () => {
  const { currentAccount, isLoading } = useContext(TransactionContext);
  const [parsedNotification, setParsedNotifications] = useState([]);
    const  getResults = async () => {
        // define the variables required to make a request
        // const walletAddress = "0xAf1aa06FaBD863CFfe9D1DFcD2353C295a6484F5";
        // const walletAddress = "0x4B789263E1032c4C930B47cCbe72e810006531E3";
        
        const walletAddress = currentAccount;
        const pageNumber = 1;
        const itemsPerPage = 20;
        
        // fetch the notifications
        const {count, results} = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
        console.log({results});

        const parsedResponse = utils.parseApiResponse(results);
        console.log(parsedResponse);
        setParsedNotifications(parsedResponse) 

    }

  return (
    <>
    { currentAccount &&
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
      <div>
            <button
              type="button"
              onClick={getResults}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
              Get EPNS Notifications from your wallet
            </button>
      </div>
      { parsedNotification &&
        <div className="flex flex-wrap justify-center items-center mt-10">
            {parsedNotification.map(({title, message, cta, app, icon, image, url}) => {
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
                  <div key={title}>
                    <h2 className="text-white text-xl font-bold w-full mt-2 p-2 ">{title}</h2>
                    <h2 className="text-white w-full italic mt-2 p-2 ">{message}</h2>
                    {/* <h2 className="text-white w-full mt-2 p-2 ">cta: {cta}</h2> */}
                    {/* <h2>app: {app}</h2> */}
                    {/* <h2>icon: {icon}</h2> */}
                    {/* <h2>image: {image}</h2> */}
                    {/* <h2>url: {url}</h2> */}
                    {/* <hr /> */}
                    <div>
                          <button
                            type="button"
                            // onClick={getResults}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                            expand
                          </button>
                    </div>
                    </div>
                  </div>
                  </div>
                  </div>
                    
                );
            })}
        </div>
        }

        {/* <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData].reverse().map((transaction, i) => (
            <NotificationsCard key={i} {...transaction} />
          ))}
        </div> */}
      </div>
    </div>
    }
    </>
  );
};

export default Notifications;

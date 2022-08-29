import { api, utils } from "@epnsproject/frontend-sdk-staging";
import { useState } from "react";



const MainComponent =  () => {
    const [parsedNotification, setParsedNotifications] = useState([]);
    const  getResults = async () => {
        // define the variables required to make a request
        const walletAddress = "0xAf1aa06FaBD863CFfe9D1DFcD2353C295a6484F5";
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
        <div>
            <p>hoo</p>
            <button
              type="button"
              onClick={getResults}
              >
              <p> getResults </p>
            </button>
        </div>
        
        { parsedNotification &&
        <div>
            {parsedNotification.map(({title, message, cta, app, icon, image, url}) => {
                return (
                    <div key={title}>
                    <h2>title: {title}</h2>
                    <h2>message: {message}</h2>
                    <h2>cta: {cta}</h2>
                    <h2>app: {app}</h2>
                    <h2>icon: {icon}</h2>
                    <h2>image: {image}</h2>
                    <h2>url: {url}</h2>
                    <hr />
                    </div>
                );
            })}
        </div>
        }
        </>
          
        
    )
}


export default MainComponent
import { AppProps } from "next/app";
import { useEffect } from "react";


function FullPageLoader() {

 
    return (
        <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    )

}

export default FullPageLoader
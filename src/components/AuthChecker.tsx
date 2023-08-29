import { Amplify, Auth, Hub } from "aws-amplify";
import {  Router, useRouter } from "next/router";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import FullPageLoader from "./FullPageLoader";
import { useAuthenticator } from "@aws-amplify/ui-react";

function AuthChecker({children}: PropsWithChildren) {

    const auth = useAuthenticator( context => [context.authStatus]);
    
    if(auth.authStatus == "configuring" ) {
        return <FullPageLoader />
    }

    return children

}
export default AuthChecker
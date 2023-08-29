import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import AuthChecker from '../components/AuthChecker';
import { Authenticator } from '@aws-amplify/ui-react';

import "../styles/globals.css"

Amplify.configure({
    Auth: {
        region: awsExports.REGION,
        userPoolId: awsExports.USER_POOL_ID,
        userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <AuthChecker>
        <Component {...pageProps} />
      </AuthChecker>
    </Authenticator.Provider>
  ) 
}

import FullPageLoader from '@/components/FullPageLoader';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';

function Login() {

    const auth = useAuthenticator( context => [context.authStatus]);
    const router = useRouter();
    

    if(auth.authStatus == "configuring" ) {
        return <FullPageLoader />
    }
    if(auth.authStatus == "authenticated" && router.pathname == "/login") {
        router.replace("/")
        return <FullPageLoader />
    }

    return (
        <div className="flex w-full h-full absolute justify-center items-center">

            <Authenticator 
            signUpAttributes={[ 'name', 'birthdate',]}
            loginMechanisms={['email']}
            >
                {({ signOut, user }) => (
                    
                    
                    <div>

                        {JSON.stringify(user?.attributes)}

                        <p>Welcome {user?.attributes?.name}</p>
                        <button onClick={signOut}>Sign out</button>
                    </div>
                )}
            </Authenticator>
        </div>
    )
}
export default Login;
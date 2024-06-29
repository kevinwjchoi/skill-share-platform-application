import { useState } from 'react';
import LoginForm from './LoginForm';


function Login({setUser}){
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
        <body>
            {showLogin ? (
                <>
                <LoginForm setUser={setUser} />
                <p>
                    Don't have an account yet?
                    <button onClick={()=> setShowLogin(false)}>Sign up</button>
                </p>
                </>
            ):(
                <>
                <p>
                    Don't have an account yet?
                </p>
                    
                    <button onClick={() => setShowLogin(false)}>Log in</button>
                </>
            )}
        </body>    
        </>
    );

}

export default Login;
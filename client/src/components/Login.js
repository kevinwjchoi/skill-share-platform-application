import React from 'react'

import LoginForm from './LoginForm';


function Login({setUser}){


    return (
        <>
        <body>
                <>
                <LoginForm setUser={setUser} />
                <p>
                    Don't have an account yet?
                    <button>Sign up</button>
                </p>
                </>
        </body>    
        </>
    );

}

export default Login;
import React from "react"
import { signInWithGoogle } from "../../firebase/firebase.utils"

import "./login.styles.scss"
class Login extends React.Component {

    render() {

        return <div className="login">

            <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
        </div>
    }
}


export default Login;
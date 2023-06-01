import React from "react"
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../authentication/authConfig"

const Login = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e)
      })
    }

    return(
        <div id="LoginBg">
            <div id="insideBg"></div>
            <div id="libraryLoginBg">
                <div></div>
                <div>
                    <div></div>
                    <div>
                        <h1>WELCOME</h1>
                        <p>TO R.E.A.D <br/> READABLE . ELECTRONIC . ARCHIVE OF DATA</p>
                        <div onClick={handleLogin}><p></p>SIGN IN WITH YOUR STI 365 ACCOUNT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
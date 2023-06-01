import { useState } from "react"

export const useCallSearch = () => {
    const [call, setCall] = useState(false)

    const CALLSEARCH = (c) => {if(!call) {setCall(c)}}

    const offSearch = () => {if(call) {setCall(false)}}

    setTimeout(() => {
        offSearch()
    }, 200);

    return{call, CALLSEARCH}
}
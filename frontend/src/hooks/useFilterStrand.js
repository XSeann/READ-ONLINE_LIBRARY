import { useState } from "react"
import { useStrandContext } from "./useStrandContext"

export const useFilterStrand = () => {
    const [ict, setIct] = useState('')
    const [abm, setAbm] = useState('')
    const [stem, setStem] = useState('')
    const [humms, setHumms] = useState('')
    const [ca, setCa] = useState('')
    const [to, setTo] = useState('')

    const ICT = (section) => {
        if(ict === '') {setIct(section)}
        else{setIct('')}
    } 
    
    const ABM = (section) => {
        if(abm === '') {setAbm(section)}
        else{setAbm('')}
    }

    const STEM = (section) => {
        if(stem === '') {setStem(section)}
        else{setStem('')}
    }

    const HUMMS = (section) => {
        if(humms === '') {setHumms(section)}
        else{setHumms('')}
    }

    const CA = (section) => {
        if(ca === '') {setCa(section)}
        else{setCa('')}
    }

    const TO = (section) => {
        if(to === '') {setTo(section)}
        else{setTo('')}
    }

    return{ICT, ict, ABM, abm, STEM, stem, HUMMS, humms, CA, ca, TO, to}
}
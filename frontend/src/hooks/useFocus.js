import { useState, useRef } from "react"

export const useFocus = () => {
    const [showFormDiv, setShowFormDiv]= useState(false)
    const [MFormDiv, setMFormDiv]= useState(false)
    const refFoc = useRef(false)

    return{showFormDiv, setShowFormDiv, MFormDiv, setMFormDiv, refFoc}
}
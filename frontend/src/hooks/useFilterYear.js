import { useState } from "react"

export const useFilterYear = () => {
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')
    const [year3, setYear3] = useState('')
    const [year4, setYear4] = useState('')
    const [year5, setYear5] = useState('')
    const [year6, setYear6] = useState('')
    const [year7, setYear7] = useState('')
    const [year8, setYear8] = useState('')
    const [year9, setYear9] = useState('')

    const YEAR1 = (year) => {
        if(year1 === '') {setYear1(year)}
        else {setYear1('')}
    }

    const YEAR2 = (year) => {
        if(year2 === '') {setYear2(year)}
        else {setYear2('')}
    }

    const YEAR3 = (year) => {
        if(year3 === '') {setYear3(year)}
        else {setYear3('')}
    }

    const YEAR4 = (year) => {
        if(year4 === '') {setYear4(year)}
        else {setYear4('')}
    }

    const YEAR5 = (year) => {
        if(year5 === '') {setYear5(year)}
        else {setYear5('')}
    }

    const YEAR6 = (year) => {
        if(year6 === '') {setYear6(year)}
        else {setYear6('')}
    }

    const YEAR7 = (year) => {
        if(year7 === '') {setYear7(year)}
        else {setYear7('')}
    }

    const YEAR8 = (year) => {
        if(year8 === '') {setYear8(year)}
        else {setYear8('')}
    }

    const YEAR9 = (year) => {
        if(year9 === '') {setYear9(year)}
        else {setYear9('')}
    }

    return{year1, YEAR1, year2, YEAR2, year3, YEAR3, year4, YEAR4, year5, YEAR5, year6, YEAR6, year7, YEAR7, year8, YEAR8, year9, YEAR9}
}
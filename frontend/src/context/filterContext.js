import { createContext, useState } from "react"
import { useFilterStrand } from "../hooks/useFilterStrand"
import { useFilterYear } from "../hooks/useFilterYear"
import { useFilterSearch } from "../hooks/useFilterSearch"
import { useCallSearch } from "../hooks/useCallSearch"
import { useViews } from "../hooks/useViews"
import {useFocus} from "../hooks/useFocus"

export const FilterContext = createContext()

export const FilterContextProvider = ({children}) => {
    const {ICT, ict, ABM, abm, STEM, stem, HUMMS, humms, CA, ca, TO, to} = useFilterStrand()
    const {year1, YEAR1, year2, YEAR2, year3, YEAR3, year4, YEAR4, year5, YEAR5, year6, YEAR6, year7, YEAR7, year8, YEAR8, year9, YEAR9} = useFilterYear()
    const {search, SEARCH} = useFilterSearch()
    const {call, CALLSEARCH} = useCallSearch()
    const {ID} = useViews()
    const {showFormDiv, setShowFormDiv, MFormDiv, setMFormDiv, refFoc} = useFocus()

    const strands = {ICT, ict, ABM, abm, STEM, stem, HUMMS, humms, CA, ca, TO, to}
    const years = {year1, YEAR1, year2, YEAR2, year3, YEAR3, year4, YEAR4, year5, YEAR5, year6, YEAR6, year7, YEAR7, year8, YEAR8, year9, YEAR9}
    const searchEngine = {search, SEARCH}
    const callSearch = {call, CALLSEARCH}
    const focusSearch = {showFormDiv, setShowFormDiv, MFormDiv, setMFormDiv, refFoc}
    
    return(
        <FilterContext.Provider value={{strands, years, searchEngine, callSearch, ID, focusSearch}}>
            {children}
        </FilterContext.Provider>
    )
}
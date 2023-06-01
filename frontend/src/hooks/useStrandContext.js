import { useContext } from "react"
import { FilterContext } from "../context/filterContext"


export const useStrandContext = () => {
    const strand = useContext(FilterContext)

    if (!strand) {
        throw Error('useStrandContext must be used inside an WorkoutsContextProvider')
      }

    return strand
}
import { useState } from "react"

export const useFilterSearch = () => {
    const [search, setSearch] = useState('')

    const SEARCH = (text) => {
        setSearch(text)
    }

    return{search, SEARCH}
}
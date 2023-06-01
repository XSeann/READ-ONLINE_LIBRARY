import { useState } from "react"

export const usePage = () => {
    const [page, setPage] = useState('')

    const chPage = (pages) => {
        setPage(pages)
    }

    return{page, chPage}
}
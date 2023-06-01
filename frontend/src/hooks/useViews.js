import { useState } from "react"

export const useViews = () => {
    const [views, setViews] = useState(0)
    const [id, setId] = useState('')

    const ID = (view, id) => {
        setViews(view + 1)
        setId(id)
    }

    const updateViews = async () => {
        const response = await fetch(`https://read-online-library-web.onrender.com/api/file/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ views })
        })

        if(response.ok) {}
    }

    if(id !== '') {
        updateViews()
    }

    return{ID}
}
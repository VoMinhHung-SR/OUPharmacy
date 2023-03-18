import { useState } from "react"

const useCollapse = () => {

    const [open, setOpen] = useState(false)

    const handleSetOpen = () => {
        setOpen(!open);
    }

    return{
        open, handleSetOpen
    }
}

export default useCollapse
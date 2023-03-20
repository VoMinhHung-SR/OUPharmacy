import { useState } from "react"

const useListItemButton = () => {
    const [ isOpen, setIsOpen] = useState(false)
    const handleIsOpen = () => setIsOpen(!isOpen)
    return{
        isOpen, handleIsOpen
    }
}

export default useListItemButton
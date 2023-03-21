import { useState } from "react"

const useListItemButton = () => {
    const [ isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null);

    const handleIsOpen = () =>{
        setIsOpen(!isOpen)
        
    } 

    const handleSelectId = (id) => {
        setSelectedId(id);
        handleIsOpen();
    };


    return{
        selectedId, isOpen, handleIsOpen, handleSelectId
    }
}

export default useListItemButton
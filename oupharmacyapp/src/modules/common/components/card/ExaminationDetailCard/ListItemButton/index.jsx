import { Button } from "@mui/material"

const ListItemButton = ({title, arrayContent, callback}) => {
    console.log(arrayContent)
    return (
        <div>{title}: 
            {arrayContent.length !== 0 ? 
                arrayContent.map(obj => 
                <Button className="!ou-ml-2 !ou-bg-green-800 !ou-text-white" 
                    onClick={()=> callback()}>{obj.id}
                </Button>)
            : <></>}
        </div>
    
    )
}
export default ListItemButton
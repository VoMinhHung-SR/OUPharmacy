import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import useCollapse from "../hooks/useCollapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Loading from "../../Loading";

const CustomCollapseListItemButton = ({title, content, loading}) => {
    const {open, handleSetOpen} = useCollapse()
    return(
        <>
            <ListItemButton onClick={handleSetOpen} disablePadding >
                <ListItemText primary={title? title: "Title"} disablePadding/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                {loading ? <Box><Loading/></Box> 
                : <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={content? content : "Content"} />
                </ListItemButton>
                </List>
                
            }
                   
            </Collapse>
        </>
    )
}

export default CustomCollapseListItemButton;
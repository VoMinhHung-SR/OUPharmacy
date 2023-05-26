import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import clsx from "clsx"

const CustomModal = (props) => {
    const {title, content, open, onClose, actions, notClickOutside,className} = props
    
    const handleBackdropClick = notClickOutside ? (event) => event.stopPropagation() : null;

    
    return (
        <Dialog maxWidth={"md"}
          open={open} 
          BackdropProps={notClickOutside ? { onClick: handleBackdropClick } : {}}
          onClose={onClose}>
            <DialogTitle className={clsx('ou-min-w-[300px]',className)}>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    )

}
export default CustomModal
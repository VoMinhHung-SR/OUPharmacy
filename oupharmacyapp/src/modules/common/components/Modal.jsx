import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import clsx from "clsx"

const CustomModal = (props) => {
    const {title, content, open, onClose, actions, className} = props
    return (
        <Dialog maxWidth={"md"}
          open={open} 
          onClose={onClose}>
            <DialogTitle className={clsx('ou-min-w-[300px] ou-max-w-[720px]',className)}>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    )

}
export default CustomModal
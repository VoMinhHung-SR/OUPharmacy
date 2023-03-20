import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import Loading from "../../../Loading"
import useListItemButton from "../hooks/useListItemButton"
import ListItemButton from "../ListItemButton"

const MiniPrescribingCard = ({prescribing, isLoading}) => {
    const {t, tReady} = useTranslation("prescription-detail")
    const { isOpen , handleIsOpen } = useListItemButton()

    if(!tReady && isLoading)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading/>
        </Box>
    </Box>
    else{
        if(prescribing.length === 0)
            return   <Box className="ou-text-red-700">{t("errNullPrescription")}</Box>
   
        return (
            <ListItemButton title={t('prescribingExist')} 
            arrayContent={prescribing ? prescribing : []} 
            callback={handleIsOpen} />
        )
    }
    
}

export default MiniPrescribingCard
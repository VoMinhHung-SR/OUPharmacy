import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { changeLanguage } from "../i18n"


const Home = () => {
    const { t } = useTranslation()
    return (
        <>
            <Box className="mb-2" sx={{ minHeight: "700px" }}>
                {/* {import.meta.env.VITE_APIKEY} */}
                {t('hello') + t('xyz')}
                <Button onClick={()=> changeLanguage('vi')}>Tieng viet</Button>
                <Button onClick={()=> changeLanguage('en')}>English</Button>
            </Box>

        </>
    )
}
export default Home
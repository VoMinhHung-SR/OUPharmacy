import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { changeLanguage } from "../i18n"
// import useTranslation from "../lib/hooks/useTranslation"


const Home = () => {
    const { t } = useTranslation()
    return (
        <>
            <Box className="mb-2" sx={{ minHeight: "700px" }}>
                {/* {import.meta.env.VITE_APIKEY} */}
                {console.log(t('hello'))}
                {t('hello') + t('xyz')}
                <Button onClick={()=> changeLanguage('vi')}>CLick vao day</Button>
            </Box>

        </>
    )
}
export default Home
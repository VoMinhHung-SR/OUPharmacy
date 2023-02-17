import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";

const Forbidden = () => {
    const {t, ready} = useTranslation('common');
    const router = useNavigate();
    if (!ready)
        return(
            <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                <Container className="ou-text-center ou-mt-5">
                    <Loading />
                </Container>
            </Box>
        )
    return (
        <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
            <Box className='ou-absolute ou-p-5 ou-text-center 
                ou-flex-col ou-flex ou-justify-center ou-items-center
                ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                <Container className="ou-text-center ou-mt-5">
                    <h3 className="ou-text-red-600 ou-text-xl">{t('common:errForbidden')}</h3>
                    <div className="ou-text-sm">{t('common:loginValidUser')}</div>
                </Container>
            </Box>
        </Box>
    )
}
export default Forbidden
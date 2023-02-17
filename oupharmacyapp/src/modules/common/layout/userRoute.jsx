import { Box, Button, Container } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import Loading from '../components/Loading';

const ProtectedUserRoute = () => {
    const [user] = useContext(userContext);
    const router = useNavigate()
    const {t, ready} = useTranslation('common');
    //TODO: add skeletons here
        if(!ready)
        return <Box sx={{ height: "300px" }}>
            <Box className='ou-p-5'>
                <Loading/>
            </Box>
        </Box>
    if (user)
        return <Outlet/>
    return (
            <>
               <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4 className='ou-text-red-600 ou-text-xl'>{t('common:errNullUser')}</h4>
                            <Button onClick={() => { router('/login') }}>{t('common:here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )

}
export default ProtectedUserRoute
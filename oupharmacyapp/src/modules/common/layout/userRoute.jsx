import { Box, Button, Container } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';

const ProtectedUserRoute = () => {
    const [user] = useContext(userContext);
    const router = useNavigate()
    const {t, ready} = useTranslation('common');
    if (!ready)
        return <div>Loading content...</div>
    if (user)
        return <Outlet/>
    return (
            <>
               <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4>{t('common:errNullUser')}</h4>
                            <Button onClick={() => { router('/login') }}>{t('common:here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )

}
export default ProtectedUserRoute
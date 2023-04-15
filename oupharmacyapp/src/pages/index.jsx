import { Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import MapGL from "../modules/common/components/Mapbox";
import { useNavigate } from "react-router";
import useConversationList from "../modules/pages/ConversationListComponents/hooks/useConversationList";
import { useSelector } from 'react-redux'; 
import { Link } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';


const Home = () => {
  const { t } = useTranslation(["common"]);
  const { user } = useConversationList();

  const router = useNavigate();
  const [viewport, setViewport] = useState({
    latitude: 10.816800580111298,
    longitude: 106.67855666909755,
    zoom: 16,
  });

  const { allConfig } = useSelector((state) => state.config);

  return (
    <>
      <Box>
        <Box className="!ou-relative">
          <img className="!ou-w-[100vw]"  
          src="https://res.cloudinary.com/dl6artkyb/image/upload/v1681561779/OUPharmacy/bg_3.jpg_fj95tb.webp" alt="banner">


          </img>
          <div className="ou-absolute ou-top-1/2 ou-left-[20%] -ou-translate-y-1/2 ou-max-w-[500px]">
            <p className="ou-text-blue-600 ou-font-semibold ou-text-sm">WELCOME TO OUPharmacy</p>
            <h1 className="ou-text-7xl ou-font-bold">We are here for your Care</h1>
            <p className="ou-mt-3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
           
              <Link to='/booking'>
            <button className="ou-mt-3 ou-bg-blue-600 ou-px-5 ou-py-2 ou-rounded-full ou-text-white">
                Make an appointment
            </button>
              </Link>

          </div>
          

        </Box>

      </Box>
      {/* Contact area */}
      <Box className="ou-text-center ou-py-10" component={Container}>
          <h3>Contact Us</h3>
          <p className="ou-py-3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
          <Grid container justifyContent="flex" gridAutoRows="max" className="ou-mt-4 ">

              <Grid item xs={3} className="ou-p-5 ou-h-full ou-text-center">
                <Box className="ou-bg-slate-100  ou-w-full ou-p-5">
                  <p className="ou-my-5">
                    <span className="ou-p-5 ou-rounded-full ou-bg-white">
                      <PhoneIcon className="ou-text-blue-600"  sx={{width:"24px", height:"24px"}}/>
                    </span>
                  </p>  
                  <h3 className="ou-my-5 ou-mt-8">ADDRESS</h3>
                  <span className="ou-text-slate-400 !ou-mb-4">371 Nguyễn Kiệm, Gò Vấp, Thành phố Hồ Chí Minh</span>
                </Box>
                  
              </Grid>

              <Grid item xs={3} className="ou-p-5 ou-h-full ou-text-center ">
                <Box className="ou-bg-slate-100  ou-w-full ou-p-5">
                  <p className="ou-my-5">
                    <span className="ou-p-5 ou-rounded-full ou-bg-white">
                      <PhoneIcon className="ou-text-blue-600"  sx={{width:"24px", height:"24px"}}/>
                    </span>
                  </p>  
                  <h3 className="ou-my-5 ou-mt-8">CONTACT NUMBER</h3>
                  <span className="ou-text-slate-400">0382 590 839</span>
                </Box>
                  
              </Grid>
                  
              <Grid item xs={3} className="ou-p-5 ">
                <Box className="ou-bg-slate-100  ou-w-full ou-p-5">
                  <p className="ou-my-5">
                    <span className="ou-p-5 ou-rounded-full ou-bg-white">
                      <PhoneIcon className="ou-text-blue-600"  sx={{width:"24px", height:"24px"}}/>
                    </span>
                  </p>  
                  <h3 className="ou-my-5 ou-mt-8">EMAIL ADDRESS</h3>
                  <span className="ou-text-slate-400"><a href="mailto:oupharmacymanagement@gmail.com" className="ou-break-words">oupharmacymanagement@gmail.com</a></span>
                </Box>
                  
              </Grid>
              <Grid item xs={3} className="ou-p-5 ">
                <Box className="ou-bg-slate-100  ou-w-full ou-p-5">
                  <p className="ou-my-5">
                    <span className="ou-p-5 ou-rounded-full ou-bg-white">
                      <PhoneIcon className="ou-text-blue-600"  sx={{width:"24px", height:"24px"}}/>
                    </span>
                  </p>  
                  <h3 className="ou-my-5 ou-mt-8">WEBSITE</h3>
                  <span className="ou-text-slate-400"><a href="https://www.facebook.com/Shiray.h/" target="_blank" className="ou-break-words">OUPharmacy</a></span>
                </Box>
                  
              </Grid>
                  
          </Grid>
      </Box>

      <Box
        sx={{ minHeight: "600px" }}
        className="ou-flex ou-container ou-m-auto max-[600px]:ou-block"
      >
        <Box
          className="ou-w-[50%] 
                max-[600px]:ou-w-[354px] max-[600px]:ou-m-auto ou-rounded
                ou-m-5 ou-border-solid  ou-border-2 ou-border-black ou-min-w-[354px]"
        >
          <MapGL longitude={viewport.longitude} latitude={viewport.latitude} zoom={viewport.zoom}/>
        </Box>
        <Box
          className="ou-w-[50%] ou-items-center ou-justify-center 
                    max-[600px]:ou-m-auto ou-grid place-content-center"
        >
          <Button
            className="!ou-p-2 !ou-px-5 !ou-bg-blue-600 !ou-text-white ou-max-w-[200px]"
            onClick={() => router("/booking")}
          >
            {t("common:bookingNow")}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Home;

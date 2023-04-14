import { Box, Button, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useState } from "react";
import MapGL from "../modules/common/components/Mapbox";
import { useNavigate } from "react-router";
import useConversationList from "../modules/pages/ConversationListComponents/hooks/useConversationList";
import useCustomModal from "../lib/hooks/useCustomModal";
import CustomModal from "../modules/common/components/Modal";
import createToastMessage from "../lib/utils/createToastMessage";
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "../lib/constants";
import { QueueStateContext } from "../lib/context/QueueStateContext";
import { useSelector } from 'react-redux'; 

const Home = () => {
  const { t } = useTranslation(["common"]);
  const { user } = useConversationList();
  const { handleCloseModal, isOpen, handleOpenModal } = useCustomModal();

  const router = useNavigate();
  const [viewport, setViewport] = useState({
    latitude: 10.816800580111298,
    longitude: 106.67855666909755,
    zoom: 16,
  });

  const queue = useContext(QueueStateContext)
  {console.log(queue.items)}
  const notify = () =>{
    handleCloseModal();
    return createToastMessage({message:"oke", type:TOAST_SUCCESS});
  } 

  const { allConfig } = useSelector((state) => state.config);

  return (
    <>
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

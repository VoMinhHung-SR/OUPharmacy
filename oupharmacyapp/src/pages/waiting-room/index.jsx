import { Box, Container } from "@mui/material"
import CountDownExam from "../../modules/pages/WaittingRoomComponents/CountDownExam"

const WaitingRoom = () => {
    return <>
        <Container>
            
            <Box className="ou-text-center ou-py-4">
                <CountDownExam/>
            </Box>
        </Container>
    </>
}
export default WaitingRoom
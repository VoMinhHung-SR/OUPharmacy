import { Button } from "@mui/material"
import APIs, { endpoints } from "../../config/APIs"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../config/sweetAlert2"

const ExaminationsConfirm = () =>{
    // const mailFunction = (examinationId) => {
    //     const sendingMailHandle = async () => {

    //         const res = await APIs.post(endpoints['send-mail'](examinationId))
    //         if (res.status === 200) {
    //             // console.log("Mail was sent")
    //             SuccessfulAlert("Gửi email hoàn tất", "OK")
    //             setFlag(!flag)
    //         }
    //     }

    //     confirm({
    //         title: "Xác nhận gửi duyệt đơn.",
    //         description: "Hành động nay sẽ không thể hoàn tác!",
    //         confirmationText: "Có",
    //         cancellationText: "Không",
    //     }).then(() => {

    //         sendingMailHandle()

    //     }).catch((err) => {
    //         console.log("Fail to send email")

    //     });
    // }

    return (
        <>
            <h1>Day la trang confirm</h1>
            {/* <Button onClick={() => SuccessfulAlert('hihi', 'ok')}>SUCCESS</Button>
            <Button onClick={() => ConfirmAlert('hihi', 'ok',"OK","cancel")}>confirm</Button>
            <Button onClick={() => ErrorAlert('hihi', 'ok',"OKe")}>Error</Button> */}
        </>
    )
}
export default ExaminationsConfirm
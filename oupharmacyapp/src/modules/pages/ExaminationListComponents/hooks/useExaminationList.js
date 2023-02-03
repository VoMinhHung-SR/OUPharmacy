import { useContext, useEffect, useState } from "react"
import { userContext } from "../../../../App"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../config/sweetAlert2"
import { fetchDeleteAnExamination, fetchExaminationList } from "../services"

const useExaminationList = () => {
    const [user] = useContext(userContext)
    const [isLoading, setIsLoading] = useState(true)
    const [flag, setFlag] = useState(false)
    const [examinationList, setExaminationList] = useState([])

   
    useEffect(()=> {
        const loadExaminations = async (userID) =>{
            try{
                const res = await fetchExaminationList(userID)
                if (res.status === 200) {
                    setExaminationList(res.data)
                    setIsLoading(false)
                    console.log(res.data)
                }
            }catch (err) {
                setIsLoading(false)
                setExaminationList([])
                console.log(err)
            }
            
        }
        if(user){
            loadExaminations(user.id)
        }
    }, [user, flag])

    const handleDeleteExamination = (examinationID) =>{

        const deleteExamination = async () =>{
            console.log("da xoa", examinationID)
            const res = await fetchDeleteAnExamination(examinationID)
            if (res.status === 204){
                SuccessfulAlert("Xóa thành công", "OK")
                setFlag(!flag)
            }else{
                ErrorAlert("Xóa thất bại", "Đã có lỗi xảy ra", "OK")
            }
        }
        return ConfirmAlert("Xác nhận xóa phiếu đặt lịch","Hành động nay sẽ không thể hoàn tác, tiếp tục xóa.","Yes","Cancel",
        // this is callback function when user confirmed "Yes"
        ()=>{
            deleteExamination()
        },()=>{console.log("NO")})
    }

    return {
        user,
        examinationList,
        isLoading,
        setExaminationList,
        handleDeleteExamination,
        
    }
}

export default useExaminationList
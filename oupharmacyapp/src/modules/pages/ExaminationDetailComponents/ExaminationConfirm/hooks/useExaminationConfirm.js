import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { userContext } from "../../../../../App"
import SuccessfulAlert, { ConfirmAlert } from "../../../../../config/sweetAlert2"
import { fetchExaminationListConfirm, fetchSendEmailConfirmExamination } from "../services"

const useExaminationConfirm = () =>{
    // ====== QuerySet ======
    const [q] = useSearchParams();

    // ====== Pagination ======
    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    };


    const [user] = useContext(userContext)
    const [flag, setFlag] = useState(false)
    const [isLoadingExamination, setIsLoadingExamination] = useState(true)
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [examinationList, setExaminationList] = useState([])

    useEffect(()=>{
        const loadExamination = async () => {
            try{
                let query = q.toString();
                query === "" ? (query += `page=${page}`) : (query += `&page=${page}`);
                const res = await fetchExaminationListConfirm(query);

                if (res.status === 200) {
                    const data = await res.data;
                    setExaminationList(data.results)
                    setIsLoadingExamination(false)
                    setPagination({
                        count: data.count,
                        // data show number: x = 30
                        sizeNumber: Math.ceil(data.count / 10),
                    });
                    console.log(data.results)
                }
            }catch (err){
                setIsLoadingExamination(false)
                setExaminationList([])
            }
        }
        if(user)
            loadExamination()
    }, [user, flag])

    const handleSendEmailConfirm = (examinationID)=>{
        const sendEmail = async ()=>{
            const res = await fetchSendEmailConfirmExamination(examinationID)
            if (res.status === 200){
                SuccessfulAlert("Gửi email hoàn tất", "OK")
                setFlag(!flag)
            }
            setIsLoadingButton(false)
        }
        return ConfirmAlert("Xác nhận gửi thư xác nhận","Hành động nay sẽ không thể hoàn tác, tiếp tục gửi.","Yes","Cancel",
            // this is callback function when user confirmed "Yes"
            ()=>{
                setIsLoadingButton(true)
                sendEmail()
        })
    }
    return{
        user,
        page,
        isLoadingButton,
        isLoadingExamination,
        pagination,
        examinationList,
        handleChangePage,
        handleSendEmailConfirm
    }
}
export default useExaminationConfirm
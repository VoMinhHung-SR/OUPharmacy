import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { userContext } from "../../../../../App"
import { db } from "../../../../../config/firebase"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../config/sweetAlert2"
import { STATUS_BOOKING_CONFIRMED } from "../../../../../lib/constants"
import { fetchExaminationListConfirm, fetchSendEmailConfirmExamination } from "../services"

const useExaminationConfirm = () =>{
    const {t} = useTranslation(['examinations','modal'])
    // ====== QuerySet ======
    const [q] = useSearchParams();

    const [paramsFilter, setParamsFilter] = useState({
        id: 0,
        mailStatus:0,
        createdDate:0,
        kw: ''
    })

    // ====== Pagination ======
    const [isLoadingExamination, setIsLoadingExamination] = useState(true)

    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    
    const handleChangePage = (event, value) => {
        setIsLoadingExamination(true);
        setExaminationList([]);
        setPage(value);
    };

    const handleOnSubmitFilter = (value) => {
        console.log("changes" + "page:", page, "data:", value)
        setParamsFilter(value)
    }

    const [user] = useContext(userContext)
    const [flag, setFlag] = useState(false)
    const [examinationList, setExaminationList] = useState([])

    const handleChangeFlag = () => {
        setFlag(!flag)
    }

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
    }, [user, flag, page])

   
    return{
        user,
        page,
        isLoadingExamination,
        pagination,
        examinationList,
        handleChangePage,
        handleChangeFlag,
        handleOnSubmitFilter
    }
}
export default useExaminationConfirm
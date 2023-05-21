import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { userContext } from "../../../../../App"
import { db } from "../../../../../config/firebase"

import { APP_ENV, STATUS_BOOKING_CONFIRMED, TOAST_SUCCESS } from "../../../../../lib/constants"

import { fetchExaminationListConfirm, fetchSendEmailConfirmExamination } from "../services"
import createToastMessage from "../../../../../lib/utils/createToastMessage"
import { ConfirmAlert, ErrorAlert } from "../../../../../config/sweetAlert2"
import { goToTop } from "../../../../../lib/utils/helper"

const useExaminationConfirm = () =>{
    const {t} = useTranslation(['examinations','modal'])
    // ====== QuerySet ======
    const [q] = useSearchParams();
    
    const [filterCount, setFilterCount] = useState(0);
    const [paramsFilter, setParamsFilter] = useState({
        // id: 0,
        mailStatus:0,
        createdDate:0,
        kw: ''
    })
    
    // ====== Pagination ======
    const [isLoadingExamination, setIsLoadingExamination] = useState(true)
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(true);

    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    
    const handleChangePage = (event, value) => {
        goToTop();
        setIsLoadingExamination(true);
        setExaminationList([]);
        setPage(value);
    };

    const handleOnSubmitFilter = (value) => {
        setIsLoadingExamination(true);
        // setExaminationList([]);
        setParamsFilter(value)
        setFilterCount(Object.values(value).filter(v => v !== 0 && v !== '').length);
        setPage(1);
        setFlag(!flag)
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
                
                let querySample = query 
                querySample === "" ? (querySample += `page=${page}&kw=${paramsFilter.kw === '' ? '' : paramsFilter.kw }&status=${paramsFilter.mailStatus === 1 ? 'true' : (paramsFilter.mailStatus === -1 ? "false" : "")}&ordering=${paramsFilter.createdDate === 0 ? "-created_date": "created_date"}`): 

                (querySample += `&page=${page}&kw=${paramsFilter.kw === '' ? '' : paramsFilter.kw }&status=${paramsFilter.mailStatus === 1 ? 'true' : paramsFilter.mailStatus === -1 ? "false" : ""}}&ordering=${paramsFilter.createdDate === 0 ? "created_date": "-created_date"}`);

  
                const res = await fetchExaminationListConfirm(querySample);
                if (res.status === 200) {
                    const data = await res.data;
                    setExaminationList(data.results)
                    setIsLoadingExamination(false)
                    setPagination({
                        count: data.count,
                        sizeNumber: Math.ceil(data.count / 10),
                    });
                    setIsRequestSuccessful(true);
                }
            }catch (err){
                setIsLoadingExamination(false)
                setIsRequestSuccessful(false);
                setExaminationList([])
            }
        }
        if(user)
            loadExamination()
    }, [user, flag, page])


    // Handle on children elements

    const [loadingState, setLoadingState] = useState({});
    const [disableOtherCards, setDisableOtherCards] = useState(false);

    const withLoadingAndDisableCards = (userID, examinationID, avatar, callback) => {
        return async () => {
          setDisableOtherCards(true); // disable other cards
          setLoadingState((prevState) => ({ ...prevState, [examinationID]: true })); // set loading state for this card
          console.log("handle Send email confirm")
          try {
            const res = await fetchSendEmailConfirmExamination(examinationID);
            if (res.status === 200) {
              createNotificationRealtime(userID, examinationID, avatar);
              createToastMessage({ message: t('sendMailSuccessed'), type: TOAST_SUCCESS });
              setFlag(!flag)
            } else if (res.status === 400) {
              ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
            }
          } catch (err) {
            console.log(err);
          } finally {
            setLoadingState((prevState) => ({ ...prevState, [examinationID]: false })); // set loading state for this card
            setDisableOtherCards(false); // enable other cards
            // callback(); // call the original callback function
          }
        };
      };

      const handleSendEmailConfirm = (userID, examinationID, avatar, callback) => {
        return ConfirmAlert(
          t('confirmSendEmail'),
          t('modal:noThrowBack'),
          t('modal:yes'),
          t('modal:cancel'),
          withLoadingAndDisableCards(userID, examinationID, avatar, callback),
          () => { return; }
        );
      };
      

      const createNotificationRealtime  = async (userID, examinationID, avatar) => {
        console.log("create notification")
        try{
            await setDoc(doc(db,`${APP_ENV}_notifications`, examinationID.toString()),{
                "is_commit": false,
                "is_active": true,
                "booking_id": examinationID,
                'content': STATUS_BOOKING_CONFIRMED,
                "recipient_id": userID,
                "avatar": avatar,
                "sent_at" : serverTimestamp()
            },{merge:true})
        }catch(err){
            console.log(err)
        }
    }
   
    return{
        user,
        page,
        pagination,
        filterCount,
        paramsFilter,
        examinationList,
        isRequestSuccessful,
        isLoadingExamination,
        loadingState, disableOtherCards,
        handleChangePage,
        handleChangeFlag,
        handleOnSubmitFilter, handleSendEmailConfirm,
    }
}
export default useExaminationConfirm
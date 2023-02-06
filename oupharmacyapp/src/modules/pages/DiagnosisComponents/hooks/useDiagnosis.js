import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../../../App";
import { authApi, endpoints } from "../../../../config/APIs";
import * as Yup from "yup";

export const diagnosisSchema = Yup.object().shape({
    sign: Yup.string()
        .required("Triệu chứng không được phép trống")
        .max(254, "Triệu chứng vượt quá độ dài cho phép"),
    diagnosed: Yup.string()
        .required("Chẩn đoán không được phép trống")
        .max(254, "Chẩn đoán vượt quá độ dài cho phép"),

});

const useDiagnosis = () => {
    const { examinationId } = useParams();
    const [user] = useContext(userContext)
    const [examinationDetail, setExaminationDetail] = useState([])
    const [isLoadingExamination, setIsLoadingExamination] = useState(true)
    const [prescriptionId, setPrescriptionId] = useState(-1)
    const [prescription, setPrescription] = useState({})
    const [flag, setFlag] = useState(false)

    const handleChangeFlag = () => {
        setFlag(!flag)
    }

    useEffect(()=>{
       const loadExaminationDetail = async () => {
            try {
                const res = await authApi().get(endpoints['examination-detail'](examinationId))
                if (res.status === 200) {
                    setIsLoadingExamination(false)
                    setExaminationDetail(res.data)
                    console.log(res.data)
                }

            } catch (err) {
                if (err.response.status === 404) {
                    setIsLoadingExamination(false)
                    setExaminationDetail([])
                }
                console.log(err);
            }
       }
       const loadPrescription = async () => {
        try {
            const res = await authApi().get(endpoints['get-prescription-by-examinationId'](examinationId))
            if (res.status === 200) {
                console.log(res.data)
                setPrescriptionId(res.data.id)
                setPrescription(res.data)
            }
        } catch (err) {
            setPrescriptionId(-1)
            setPrescription({
                "sign":"",
                "diagnosed":"",
            })
            console.log(err);
        }
    }
       if(user){
           loadExaminationDetail()
            loadPrescription()
       }
    },[flag,user])

    return{
        user,
        isLoadingExamination,
        examinationDetail,
        examinationId,
        prescriptionId,
        prescription,
        handleChangeFlag
    }
}
export default useDiagnosis
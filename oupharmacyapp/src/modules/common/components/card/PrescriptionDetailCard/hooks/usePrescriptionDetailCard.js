import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { userContext } from "../../../../../../App";
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2";
import * as Yup from 'yup';
import { fetchAddPrescriptionDetail, fetchMedicinesUnit } from "../services";

export const prescrtionDetailSchema = Yup.object().shape({
    uses: Yup.string()
        .required("Lần sử dụng được phép trống"),
    quantity: Yup.string()
        .required("Số lượng được phép trống"),

});

const usePrescriptionDetailCard = () => {
    const {prescriptionId} = useParams();
    const [user] = useContext(userContext)
    const [flag, setFlag] = useState(false)
    const {router} = useNavigate();
    const [openBackdrop, setOpenBackdop] = useState(false)
    const [medicine, setMedicine] = useState({
        "medicineName": '',
        "medicineUnitId": -1
    })
    const [medicineUnits, setMedicineUnits] = useState([])
    const [medicinesSubmit, setMedicineSubmit] = useState([])

    const addMedicine = (medicineUnitId, medicineName, uses, quantity) => {
        const newItem = {
            'id': medicineUnitId,
            'medicineName': medicineName,
            'uses': uses,
            'quantity': parseInt(quantity)
        };

        setMedicineSubmit((pre) => {
            return [...pre, newItem];
        });
    }


    const handleDeleteItem = (itemId) => {
        const deleteItem = () => {
            if (medicinesSubmit.length !== 0) {
                medicinesSubmit.forEach((medicineUnit, i) => {
                    if (medicineUnit.id === itemId) {
                        SuccessfulAlert("Xóa thành công", "OK")
                        medicinesSubmit.splice(i, 1)
                        setFlag(!flag)
                    }
                })
            }
        }
        return ConfirmAlert("Xác nhận xóa đơn vị thuốc này","Hành động nay sẽ không thể hoàn tác, tiếp tục tạo.","Yes","Cancel",
        // this is callback function when user confirmed "Yes"
        ()=>{
            deleteItem()
        }, () => { return; })
    }

    const handleAddPrescriptionDetail = () => {
        const addPrescriptionDetail = () => {
            if (medicinesSubmit.length !== 0) {
                medicinesSubmit.forEach( async (m) => {
                    try {
                        let formData = {
                            'quantity': m.quantity,
                            'uses': m.uses,
                            'prescription': prescriptionId,
                            'medicine_unit': m.id
                        }
                        const res = await fetchAddPrescriptionDetail(formData)
                        if(res.status === 201)
                            return SuccessfulAlert("Thêm thành công", "OK", () => router('/'))
                            
                    } catch (err) {
                        setOpenBackdop(false)
                        ErrorAlert("Thêm thất bại", "Vui lòng xem kĩ lại thông tin ở biểu mẫu", "OK")
                    }
                })
            } else {
                ErrorAlert("Thêm thất bại", "Vui lòng xem kĩ lại thông tin ở biểu mẫu", "OK")
            }
            setOpenBackdop(false)
        }
        return ConfirmAlert("Xác nhận tạo phiếu kê toa","Hành động nay sẽ không thể hoàn tác, tiếp tục tạo.","Yes","Cancel",
        // this is callback function when user confirmed "Yes"
        ()=>{
            setOpenBackdop(true)
            addPrescriptionDetail()
        },() => { return; })
    }

    const onSubmit = (data, resetForm) => {
        const addMedicinesUnit = async () => {
            try {
                console.log("Xử lí submit")
                console.log(medicine)
                if (medicine.medicineUnitId === -1)
                    return ErrorAlert("Thêm thất bại", "Vui lòng xem kĩ lại thông tin ở biểu mẫu", "OK")
                else {
                    resetForm
                    if (medicinesSubmit.length !== 0) {
                        for (let i = 0; i < medicinesSubmit.length; i++) {
                            // Update items in dynamic table
                            if (medicinesSubmit[i].id === medicine.medicineUnitId) {
                                console.log("UPDATE")
                                medicinesSubmit[i].uses = data.uses
                                medicinesSubmit[i].quantity = medicinesSubmit[i].quantity + parseInt(data.quantity)
                                console.log(medicinesSubmit)
                                return medicinesSubmit
                            } else
                            // Add new lineItems
                                if (medicinesSubmit[i].id !== medicine.medicineUnitId
                                    && i === medicinesSubmit.length - 1)
                                    addMedicine(medicine.medicineUnitId, medicine.medicineName,
                                        data.uses, data.quantity);
                        }
                        console.log(medicinesSubmit)
                    } else
                        addMedicine(medicine.medicineUnitId, medicine.medicineName,
                            data.uses, data.quantity);
                }
            } catch (err) {
                ErrorAlert("Thêm thất bại", "Vui lòng xem kĩ lại thông tin ở biểu mẫu", "OK");
            }
        }
        addMedicinesUnit();
    }

    useEffect(() => {
        const loadMedicineUnits = async () => {
            try {
                const res = await fetchMedicinesUnit()
                if (res.status === 200) {
                    const data = await res.data;
                    setMedicineUnits(data.results)
                }
            } catch (err) {
                setMedicineUnits([])
            }
        }
        if(user){
            loadMedicineUnits()
        }
    }, [flag, medicinesSubmit])
    return {
        user,
        medicinesSubmit,
        medicineUnits,
        openBackdrop,
        setMedicine,
        onSubmit,
        handleDeleteItem,handleAddPrescriptionDetail
    }
}
export default usePrescriptionDetailCard
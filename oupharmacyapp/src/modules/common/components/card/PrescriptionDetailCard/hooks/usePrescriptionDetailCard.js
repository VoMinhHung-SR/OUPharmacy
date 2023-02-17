import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { userContext } from "../../../../../../App";
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2";
import * as Yup from 'yup';
import { fetchAddPrescriptionDetail, fetchMedicinesUnit } from "../services";
import { useTranslation } from "react-i18next";
import { REGEX_ADDRESS, REGEX_NUMBER999 } from "../../../../../../lib/constants";

const usePrescriptionDetailCard = () => {
    const {t} = useTranslation(['yup-validate', 'modal', 'prescription-detail'])
    const {prescriptionId} = useParams();
    const [user] = useContext(userContext)
    const [flag, setFlag] = useState(false)
    const router = useNavigate();
    const [openBackdrop, setOpenBackdop] = useState(false)
    const [medicine, setMedicine] = useState({
        "medicineName": '',
        "medicineUnitId": -1
    })
    const [medicineUnits, setMedicineUnits] = useState([])
    const [medicinesSubmit, setMedicineSubmit] = useState([])


    const prescrtionDetailSchema = Yup.object().shape({
        uses: Yup.string().trim()
            .required(t('yupUsesRequired'))
            .max(100, t('yupUsesMaxLenght'))
            .matches(REGEX_ADDRESS,t('yupUsesInvalid')),
        quantity: Yup.string(t('yupQuantityNumber')).trim()
            .max(3, t('yupQuantityMax'))
            .required(t('yupQuantityRequired'))
            .matches(REGEX_NUMBER999,t('yupQuantityInvalid')),
    });

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
                        SuccessfulAlert(t('modal:deleteCompleted'),t('modal:ok'))
                        medicinesSubmit.splice(i, 1)
                        setFlag(!flag)
                    }
                })
            }
        }
        return ConfirmAlert(t('prescription-detail:confirmDeleteMedicine'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
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
                            return SuccessfulAlert(t('modal:createSuccessed'), t('modal:ok'), () => router('/'))
                            
                    } catch (err) {
                        setOpenBackdop(false)
                        ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'))
                    }
                })
            } else {
                ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'))
            }
            setOpenBackdop(false)
        }
        return ConfirmAlert(t('prescription-detail:confirmAddPrescription'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            setOpenBackdop(true)
            addPrescriptionDetail()
        },() => { return; })
    }

    const onSubmit = (data, resetForm) => {
        const addMedicinesUnit = async () => {
            try {
                if (medicine.medicineUnitId === -1)
                    return ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'))
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
                ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'))
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
        handleDeleteItem,
        handleAddPrescriptionDetail,
        prescrtionDetailSchema
    }
}
export default usePrescriptionDetailCard
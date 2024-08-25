import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../config/sweetAlert2";
import { fetchAddPrescriptionDetail, fetchCreatePrescribing } from "../../modules/common/components/card/PrescriptionDetailCard/services";

const PrescribingContext = createContext();

export default PrescribingContext;

export const PrescribingProvider = ({children}) => {
    const {t} = useTranslation(['yup-validate', 'modal', 'prescription-detail']);

    const [medicinesSubmit, setMedicinesSubmit] = useState([]);
    const router = useNavigate();
    const [flag, setFlag] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false)
 
    const addMedicine = (medicineUnitId, medicineName, uses, quantity, inStock) => { 
        const newItem = {
            id: medicineUnitId,
            medicineName: medicineName,
            uses: uses,
            quantity: parseInt(quantity),
            inStock: inStock
        };
        setMedicinesSubmit( prevMedicinesSubmit => {
            const updatedState = [...prevMedicinesSubmit, newItem];
            return updatedState;
        });
    };

    const resetMedicineStore = () => {
        setMedicinesSubmit([]);
    };

    const handleUpdateMedicinesSubmit = (updatedData) => {
        const updatedMedicinesSubmit = medicinesSubmit.map(medicine => {
            const updatedMedicine = updatedData.find(item => item.medicineName === medicine.medicineName);
            return updatedMedicine ? { ...medicine, ...updatedMedicine } : null;
        }).filter(Boolean);
        setMedicinesSubmit(updatedMedicinesSubmit);
    };
    
    const handleAddMedicineSubmit = (medicineUnit, data) => {
        const addMedicinesUnit = async () => {
            try {
                if (!medicineUnit.id || !data)
                    return ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'));
                
                if (medicineUnit.id === -1)
                    return ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'));

                // Flag to check if medicine is updated
                let medicineUpdated = false;

                if (medicinesSubmit.length !== 0) {  
                    const updatedMedicinesSubmit = medicinesSubmit.map((medicine) => {
                        if (medicine.id === medicineUnit.id) {
                            medicineUpdated = true

                            return {
                                ...medicine,
                                uses: data.uses,
                                inStock: medicineUnit.in_stock,
                                quantity: parseInt(medicine.quantity) + parseInt(data.quantity)
                            };
                        }
                        return medicine;
                    });
                    if (medicineUpdated)
                        handleUpdateMedicinesSubmit(updatedMedicinesSubmit);
                    else 
                        addMedicine(medicineUnit.id, medicineUnit.medicine.name, data.uses, data.quantity, medicineUnit.in_stock); 
                }else 
                    addMedicine(medicineUnit.id, medicineUnit.medicine.name, data.uses, data.quantity, medicineUnit.in_stock);  
            } catch (err) {
                console.log(err);
                ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'));
            } finally {
                setFlag(!flag);
            }
        };
        addMedicinesUnit();
    };

    useEffect(() => {
        // Add any necessary side effects here
    }, [medicinesSubmit, flag]);

    const handleAddPrescriptionDetail = async (userID, prescribingID) => {
        const handleOnSubmit = async () => {
            try {
                if (medicinesSubmit.length === 0) {
                    return ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'));
                }
    
                const prescribingData = { user: userID, diagnosis: parseInt(prescribingID) };
                const res = await fetchCreatePrescribing(prescribingData);
                if (res.status === 201) {
                    await Promise.all(
                        medicinesSubmit.map(async (m) => {
                            const formData = {
                                quantity: m.quantity,
                                uses: m.uses,
                                prescribing: res.data.id,
                                medicine_unit: m.id
                            };
                            await fetchAddPrescriptionDetail(formData);
                        })
                    );
                    resetMedicineStore();
                    SuccessfulAlert(t('modal:createSuccessed'), t('modal:ok'), () => router('/dashboard/prescribing'));
                } else {
                    ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
                }
            } catch (err) {
                console.error(err);
                ErrorAlert(t('modal:createFailed'), t('modal:pleaseDoubleCheck'), t('modal:ok'));
            } finally {
                setIsLoadingButton(false)
            }

        }
        return ConfirmAlert(t('prescription-detail:confirmAddPrescription'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            setIsLoadingButton(true)
            handleOnSubmit()
        }, () => { return; })
    };

    return (
        <PrescribingContext.Provider
            value={{
                isLoadingButton: isLoadingButton,
                medicinesSubmit: medicinesSubmit,
                addMedicine: handleAddMedicineSubmit,
                handleUpdateMedicinesSubmit: handleUpdateMedicinesSubmit,
                handleAddPrescriptionDetail: handleAddPrescriptionDetail
            }}
        >
            {children}
        </PrescribingContext.Provider>
    );
};

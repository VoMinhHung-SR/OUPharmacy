import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
import {REGEX_NUMBER999, REGEX_ADDRESS} from "../lib/constants"


const SchemaModels = () => {
    const {t} = useTranslation(['yup-validate', 'modal', 'prescription-detail'])


    // const medicineSubmitUpdateSchema = Yup.array().of(
    //     Yup.object().shape({
    //         uses: Yup.string().trim()
    //             .required(t('yupUsesRequired'))
    //             .max(100, t('yupUsesMaxLenght'))
    //             .matches(REGEX_ADDRESS, t('yupUsesInvalid')),
    //         quantity: Yup.string(t('yupQuantityNumber')).trim()
    //             .max(3, t('yupQuantityMax'))
    //             .required(t('yupQuantityRequired'))
    //             .matches(REGEX_NUMBER999, t('yupQuantityInvalid')),
    //     })
    // );
    const medicineSubmitUpdateSchema = Yup.object({
        medicineSubmit: Yup.array().of(
            Yup.object().shape({
                uses: Yup.string().trim()
                    .required(t('yupUsesRequired'))
                    .max(100, t('yupUsesMaxLenght'))
                    .matches(REGEX_ADDRESS, t('yupUsesInvalid')),
                quantity: Yup.string(t('yupQuantityNumber')).trim()
                    .max(3, t('yupQuantityMax'))
                    .required(t('yupQuantityRequired'))
                    .matches(REGEX_NUMBER999, t('yupQuantityInvalid')),
            })
        ).required(t('yupArrayRequired')).nullable()
    });


    return {
        medicineSubmitUpdateSchema
    }
}

export default SchemaModels
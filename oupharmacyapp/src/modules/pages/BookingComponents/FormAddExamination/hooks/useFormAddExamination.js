import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from '../../../../../config/sweetAlert2';
import { REGEX_ADDRESS, REGEX_EMAIL, REGEX_NAME, REGEX_NOTE, REGEX_PHONE_NUMBER } from '../../../../../lib/constants';
import { featchCreateExamination, fetchCreateOrUpdatePatient, fetchExamDateData } from '../services';
import moment from 'moment';
import useDebounce from '../../../../../lib/hooks/useDebounce';


const useFormAddExamination = () => {
    const {t} = useTranslation(['yup-validate','modal', 'booking']);

    const [openBackdrop, setOpenBackdrop] = useState(false)

    const [date, setDate] = useState('');
    const [examinations, setExaminations] = useState([]);


    const formAddExaminationSchema = Yup.object().shape({
        firstName: Yup.string().trim()
            .required(t('yupFirstNameRequired'))
            .max(150, t('yupFirstNameMaxLenght'))
            .matches(REGEX_NAME, t('yupFirstNameInvalid')),

        lastName: Yup.string().trim()
            .required(t('yupLastNameRequired'))
            .max(150, t('yupLastNameMaxLenght'))
            .matches(REGEX_NAME, t('yupLastNameInvalid')),

        email: Yup.string().trim()
            .required(t('yupEmailRequired'))
            .max(254, t('yupEmailMaxLenght'))
            .matches(REGEX_EMAIL, t('yupEmailInvalid')),

        phoneNumber: Yup.string().trim()
            .required(t('yupPhoneNumberRequired'))
            .matches(REGEX_PHONE_NUMBER, t('yupPhoneNumberInvalid')),
            
        address: Yup.string().trim()
            .required(t('yupAddressRequired'))
            .matches(REGEX_ADDRESS, t('yupAddressInvalid')),

        dateOfBirth: Yup.string()
            .required(t('yupDOBRequired')),

        gender: Yup.string()
        .required(t('yupGenderRequired')),
    
        description: Yup.string().trim()
            .required(t('yupDescriptionRequired'))
            .max(254, t('yupDescriptionMaxLenght'))
            .matches(REGEX_NOTE, t('yupDescriptionInvalid')),

        doctor: Yup.string()
        .required(t('required')),
        
        selectedTime: Yup.string()
            .required(t('yupCreatedTimeRequired'))
            .test('is-valid-time', t('yupTimeDivisibleBy20'), (value) => {
                const time = new Date(value);
                const minutes = moment(time, 'HH:mm:ss').minutes();
                return minutes === 0 || minutes === 20 || minutes === 40;
              }),

        selectedDate: Yup.string()
            .required(t('yupCreatedDateRequired'))
           
    });


    const debouncedValue = useDebounce(date,500)

    useEffect(() => {
        const getExaminationData = async (date) => {
          try {
            const res = await fetchExamDateData(date);
            if (res.status === 200) {
              setExaminations(res.data.examinations);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setOpenBackdrop(false)
          }
        };
    
        if (debouncedValue) {
            setOpenBackdrop(true)
          getExaminationData(debouncedValue);
        }
      }, [debouncedValue]);


    


    const shouldDisableTime = (time) => {
        const selectedDate = moment(debouncedValue).format('YYYY-MM-DD');
        const disabledTimesFromData = examinations
            .filter((e) => e.created_date.includes(selectedDate))
            .map((e) => moment(e.created_date).format('HH:mm:ss'));

        const isDisabledRange = (time.hour() >= 0 && time.hour() < 7) || (time.hour() > 17 && time.hour() <= 23);

        return (
            disabledTimesFromData.includes(time.format('HH:mm:ss')) || isDisabledRange
        );
    };


    const handleTimeChange = (date, time) => {

        const timeFormatted = new Date(time);
        
        const selectedDate = moment(date).format('YYYY-MM-DD');
        const selectedTime = moment(timeFormatted).format('HH:mm:ss');

        return new Date(`${selectedDate}T${selectedTime}`)
    };
    


    const onSubmit = async (patientID, data, callback, setError) => {
        if(data === undefined)
            return ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
    
    
        const createdDate = handleTimeChange(data.selectedDate, data.selectedTime);
    
        const patientData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone_number: data.phoneNumber,
            date_of_birth: data.dateOfBirth,
            address: data.address,
            gender: data.gender
        }
        const handleOnSubmit = async () => {
            setOpenBackdrop(true)
            // const res = await fetchCreateOrUpdatePatient(patientID, patientData);
            // // Update done or created patient info
            // if(res.status === 200 || res.status === 201){
            //     console.log(res)
            //     const examinationData = {
            //         patient: res.data.id,
            //         description: data.description,
            //         // created_date: data.createdDate
            //         created_date: createdDate
            //     }
            //     const resExamination = await featchCreateExamination(examinationData);
            //     if(resExamination.status === 201){
            //         SuccessfulAlert(t('modal:createSuccessed'),t('modal:ok'))
            //         callback();
            //     }
            //     else{
            //         setOpenBackdrop(false)
            //         return ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
            //     }
            //     if(resExamination.status === 500){
            //         setOpenBackdrop(false)
            //         return ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
            //     }
            // }
            // else{
            //     setOpenBackdrop(false)
            //     return ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
            // }
            setOpenBackdrop(false)
        }
        
        return ConfirmAlert(t('booking:confirmBooking'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            handleOnSubmit()
        }, () => { return; })
    }

    return {
        openBackdrop, examinations, setDate, date, setDate,
        onSubmit,
        formAddExaminationSchema, handleTimeChange, shouldDisableTime, examinations
    }
}
export default useFormAddExamination;
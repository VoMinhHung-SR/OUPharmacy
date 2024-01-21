
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import usePrescriptionDetailCard from "../../../common/components/card/PrescriptionDetailCard/hooks/usePrescriptionDetailCard"
import { useTranslation } from "react-i18next"


const PrescribingMedicine = ({medicine, onAddToPrescription, schema}) => {
    const {t, ready} = useTranslation(['prescription-detail', 'yup-validate', 'modal'])
   
    const { register, control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema),
      });

      const onSubmit = (data) => {
        if (parseInt(data.quantity) > parseInt(medicine.in_stock))
            return setError('quantity', {
                type: 'custom',
                message: 'Quantity exceeds the allowed limit',
            });
            
        else
            // Process the medicine data
            console.log('Medicine data:', data);
        
            // Reset the form after submission

            reset();
        
            // Add the medicine to the prescription
            onAddToPrescription(medicine, data);
      };

    return (
        <>
       
         
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <Box item xs={4} style={{"display":"flex"}}>
                        <div key={medicine.id} className="ou-w-[100%] ou-px-2  hover:ou-border-blue-600 
                        hover:ou-border-[2px] ou-rounded-lg ou-m-2 ou-flex  ou-items-center">
                            <div className="ou-w-[50%]">
                                <div className="ou-flex ou-items-center ">
                                    <img 
                                        className="ou-object-contain"
                                        width={100} height={100} 
                                        src={medicine.image_path} 
                                        alt={medicine.medicine.name}/>
                                    <div className="ou-flex ou-px-2 ou-flex-col ou-justify-center">
                                        <p className="ou-list-item-2-text-container ">{medicine.medicine.name}</p>

                                        <p className="ou-text-xs">(SL: {medicine.in_stock})</p>
                                    </div>
                                </div>
                                
                                    <Box>
                                    <p className="ou-pl-4 ou-text-red-600 ou-text-sm">{errors.uses ? errors.uses.message : ""}</p>
                                    <p className="ou-pl-4 ou-text-red-600 ou-text-sm">{errors.quantity ? errors.quantity.message : ""}</p>
                                 </Box>
                             

                            </div>
                            <div className="ou-w-[20%]">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    id="uses"
                                    name="uses"
                                    type="text"
                                    {...register('uses')}
                                />
                            </div>

                            <div className="ou-ml-2 ou-w-[10%]">
                                <TextField
                                fullWidth
                                id="outlined-number"
                                type="number"
                                name="quantity"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('quantity')}
                                />
                    
                            </div>

                            <div className="ou-ml-auto">                 
                                <Button variant="contained" color="success" type="submit" >{t('addMedicine')}</Button>
                            </div>
                            
                        </div>
                                
                    </Box>
                </form>
    
    </>
    )
}
export default PrescribingMedicine
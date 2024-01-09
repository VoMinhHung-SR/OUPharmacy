import { Box, Grid, Pagination, Paper, Stack, Button } from "@mui/material"
import useMedicine from "../../../../lib/hooks/useMedicine";
import Loading from "../../../common/components/Loading";
import { formatNumberCurrency } from "../../../../lib/utils/helper";

const ProductHomeRight = ({callback}) => {

    const { medicines, page, handleChangePage, pagination, medicineLoading } = useMedicine();

    if(!medicines)
        return <div>khong co san pham</div>
    
    if (medicineLoading)
        return <div className="ou-h-[500px] ou-flex ou-items-center"><Loading/></div>

        
    return (
        <>
            <Grid container>
                {medicines && medicines.map(product => (
                    <Grid item xs={4} style={{"display":"flex"}}>
                        <div key={product.id} className="ou-w-[100%] ou-px-2  hover:ou-border-blue-600 
                        hover:ou-border-[2px] ou-rounded-lg ou-m-2 ou-flex ou-flex-col">
                            <img 
                                className="ou-object-contain"
                                width={180} height={180} 
                                src={product.image_path} 
                                alt={product.medicine.name}/>
                            <p className="ou-px-2 ou-my-2 ou-list-item-2-text-container">{product.medicine.name}</p>
                            
                            <div className="ou-mt-auto ou-my-2">
                                <p className="ou-px-2 ou-mt-2 ou-mb-4 ou-font-bold">{formatNumberCurrency(product.price)}vnd / {product.packaging ?  product.packaging : "default"}</p>
                                <Button fullWidth className="!ou-p-3 !ou-bg-blue-600 !ou-text-white"> Button </Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>

            {pagination.sizeNumber >= 2 && (
                <Box sx={{ pt: 5, pb: 2 }}>
                    <Stack>
                        <Pagination
                        count={pagination.sizeNumber}
                        variant="outlined"
                        sx={{ margin: "0 auto" }}
                        page={page}
                        onChange={handleChangePage}
                        />
                    </Stack>
                </Box>
            )}
        </>
       
        
    
    )
}
export default ProductHomeRight
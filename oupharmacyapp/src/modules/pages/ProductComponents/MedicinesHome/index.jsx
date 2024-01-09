
import { useSelector } from "react-redux";
import useMedicine from "../../../../lib/hooks/useMedicine"
import { Box, Container, Grid } from "@mui/material";
import ProductHomeLeft from "../LeftSide";
import ProductHomeRight from "../RightSide";
import { useTranslation } from "react-i18next";

const MedicinesHome = () => {
   
    const { t, tReady } = useTranslation(['product'])
    const { allConfig } = useSelector((state) => state.config);

    if(!allConfig.categories)
        return  <Container><div>{t('errNullCate')}</div></Container>

    return (
        <Box>
            <Grid container>
            
                {/* Product Left Bar is for categories */}
                <Grid item xs={3}>
                        <h2 className="ou-text-center ou-font-bold">{t('categories')}</h2>
                    <Box>
                        <ProductHomeLeft cates={allConfig.categories}/>
                    </Box>
                </Grid>


                {/* Product Right Bar is for products */}
                <Grid item xs={9}>
                <h2 className="ou-text-center ou-font-bold">{t('products')}</h2>
                    <Box>  
                        <ProductHomeRight/>
                    </Box>
                </Grid>
        
            </Grid>
        </Box>
        )
}

export default MedicinesHome
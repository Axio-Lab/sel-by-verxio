import {
  Box,
  Grid,
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';




const MyItems = () => {
  
  return (

    <Box sx={{ marginTop: 4 }}>
    <MainCard title="Purchased Items 🛄">
      <Grid container spacing={gridSpacing}>
      
      </Grid>
    </MainCard>
    </Box>
    
  );
};

export default MyItems;



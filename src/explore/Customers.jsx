import {
    Box,
    Grid,
  } from '@mui/material';
  
  import MainCard from 'ui-component/cards/MainCard';
  import { gridSpacing } from 'store/constant';
  import { useParams } from 'react-router-dom';
  
  
  
  const Customers = () => {
    const { productId, productName } = useParams();

    return (
  
      <Box sx={{ marginTop: 4 }}>
      <MainCard title={`Customers for ${productName} 🛄`}>
        <Grid container spacing={gridSpacing}>
        
        </Grid>
      </MainCard>
      </Box>
      
    );
  };
  
  export default Customers;
  
  
  
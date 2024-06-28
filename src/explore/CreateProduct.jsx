import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ProductDetail from './ProductDetail';
import PreviewProduct from './PreviewProduct';

const steps = ['Product Details', 'Preview Product'];

const CreateProduct = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      productImage: null,
      description: '',
      productType: '',
      amount: '',
      category: '',
      quantity: '',
      file: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      productType: Yup.string().required('Required'),
      amount: Yup.number()
        .min(0, 'Amount must be above 0')
        .when('isFreeProduct', {
          is: false,
          then: Yup.number().min(0.01, 'Amount must be above 0')
        }),
      category: Yup.string().required('Required'),
      quantity: Yup.number()
        .min(0, 'Quantity must be 0 or above')
        .integer('Quantity must be an integer'),
      productImage: Yup.mixed().required('Product image is required'),
      file: Yup.mixed().required('File upload is required')
    }),
    onSubmit: () => {
      if (activeStep === steps.length - 1) {
        console.log('last step');
        // Handle final submission here
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  });

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <ProductDetail formik={formik} />;
      case 1:
        return <PreviewProduct formik={formik} />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (

    <Box sx={{ marginTop: 4 }}>
    <MainCard title="Create Product 🏷️">
      <Grid container spacing={gridSpacing}>
      <Box
          sx={{
            maxWidth: '600px',
            padding: 2
          }}
        >
      <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((label, index) => (
              <Step 
              key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container>
            <Grid item xs={12} sx={{ padding: '20px' }}>
              {formContent(activeStep)}
            </Grid>
            {formik.errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button onClick={formik.handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={formik.handleSubmit}>Next</Button>
              )}
            </Grid>
          </Grid>
          </Box>
      </Grid>
    </MainCard>
    </Box>
    
  );
};

export default CreateProduct;



import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button,
  CircularProgress
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ProductDetail from './ProductDetail';
import PreviewProduct from './PreviewProduct';
import { toast } from "react-toastify";

const steps = ['Product Details', 'Preview Product'];

const CreateProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { publicKey, connected} = useWallet();
  const navigate = useNavigate();

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        Object.keys(formik.values).forEach(key => {
          formik.setFieldTouched(key, true);
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      productImage: '',
      description: '',
      productType: '',
      amount: '',
      category: '',
      quantity: '',
      productFile: '',
      payAnyAmount: false
    },

    validationSchema:  Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      productType: Yup.string().required('Required'),
      amount: Yup.number()
        .when('payAnyAmount', {
          is: false,
          then: (schema) => schema.min(0.01, 'Price must be above 0').required('Required'),
          otherwise: (schema) => schema.nullable()
        }),
      category: Yup.string().required('Required'),
      quantity: Yup.number()
        .min(0, 'Quantity must be 0 or above')
        .integer('Quantity must be an integer'),
      productImage: Yup.mixed().required('Product image is required'),
      productFile: Yup.mixed().required('File upload is required'),
      payAnyAmount: Yup.boolean()
    }),

    onSubmit: async (values) => {

    console.log("Submitting....")
    console.log(values)
      const userId = publicKey?.toBase58();
      console.log("Stats", connected)
      if (!connected) {
        toast.info("Connect your wallet to proceed 😏")
      }
      else{

        setIsSubmitting(true);

        try {
          const response = await axios.post(`https://usesel.online/api/v1/product/${userId}`, 
            {
            name: values.name,
            type: values.productType,
            image: values.productImage,
            description: values.description,
            category: values.category,
            payAnyPrice: values.payAnyAmount,
            price: values.amount,
            quantity: values.quantity,
            productFile: values.productFile
          }
        );
  
          console.log('Response:', response.data);
          toast.success('Product created successfully 🎉');
          setIsSubmitting(false)
          navigate('/explore/products');
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Failed to create product');
        } finally {
          setIsSubmitting(false);
        }

      }
    },
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
                <Step key={index}>
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
                <Button
                  variant="contained"
                  onClick={formik.handleSubmit}
                >
                 {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Submit'
                    )}
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
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

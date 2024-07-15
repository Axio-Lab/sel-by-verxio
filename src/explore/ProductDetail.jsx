import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress
} from '@mui/material';
import { PhotoCamera, UploadFile } from '@mui/icons-material';

const productTypes = ['📚 Ebook', '🎫 Ticket', '👩🏾‍🏫 Course', '🤝🏼 Service', '🎁 Love Gift', '😶‍🌫️ Others'];
const categories = ['👔 Business', '👩‍❤️‍👨 Relationship', '🔮 Spirituality', '🎭 Arts and Entertainment', '🏋🏽 Health and Fitness', '😶‍🌫️ Others'];

const ProductDetail = ({ formik }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const handleFreeProductChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      formik.setFieldValue('amount', 0);
    } else {
      formik.setFieldValue('amount', formik.values.amount || '');
    }
    formik.setFieldValue('payAnyAmount', checked);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue('quantity', value);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoadingImage(true);
    await getImageDataUrl(file);
    setLoadingImage(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoadingFile(true);
    await getFileDataUrl(file);
    setLoadingFile(false);
  };

  const getImageDataUrl = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ibelachi_Test_Run');
    formData.append('api_key', '968631257356497');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/verxioaventor/image/upload', {
        method: 'POST',
        body: formData
      });
      const results = await response.json();
      formik.setFieldValue('productImage', results.url);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const getFileDataUrl = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ibelachi_Test_Run');
    formData.append('api_key', '968631257356497');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/verxioaventor/raw/upload', {
        method: 'POST',
        body: formData
      });
      const results = await response.json();
      formik.setFieldValue('productFile', results.url);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Product Name"
            variant="outlined"
            fullWidth
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" startIcon={!loadingImage && <PhotoCamera />}>
            {loadingImage ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              'Upload Product Image'
            )}
            <input
              name="productImage"
              type="file"
              capture="environment"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {formik.values.productImage && (
            <Typography variant="body2" component="p">
              {formik.values.productImage}
            </Typography>
          )}
            {formik.touched.productImage && formik.errors.productImage && (
              <FormHelperText error>{formik.errors.productImage}</FormHelperText>
            )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Product Description"
            variant="outlined"
            fullWidth
            size="small"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.description && formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel>Product Type</InputLabel>
            <Select
              name="productType"
              value={formik.values.productType}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.productType && formik.errors.productType)}
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={Boolean(formik.touched.productType && formik.errors.productType)}>
              {formik.touched.productType && formik.errors.productType}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.category && formik.errors.category)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={Boolean(formik.touched.category && formik.errors.category)}>
              {formik.touched.category && formik.errors.category}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="amount"
            label="Amount (SOL)"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.amount && formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            disabled={formik.values.payAnyAmount}
          />
          <FormControlLabel
            control={<Checkbox checked={formik.values.payAnyAmount} onChange={handleFreeProductChange} name="payAnyAmount" />}
            label="Enable Custom Amount"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={formik.values.quantity}
            onChange={handleQuantityChange}
            error={Boolean(formik.touched.quantity && formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          {formik.values.quantity === '0' && (
            <Typography variant="body2" color="textSecondary">
              Quantity available: Unlimited
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" startIcon={!loadingFile && <UploadFile />}>
            {loadingFile ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              'Upload Product File'
            )}
            <input
              name="productFile"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {formik.values.productFile && (
            <Typography variant="body2" component="p">
              {formik.values.productFile}
            </Typography>
          )}
            {formik.touched.productFile && formik.errors.productFile && (
              <FormHelperText error>{formik.errors.productFile}</FormHelperText>
            )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductDetail;

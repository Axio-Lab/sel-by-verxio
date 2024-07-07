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
  Typography
} from '@mui/material';
import { PhotoCamera, UploadFile } from '@mui/icons-material';

const productTypes = ['📚 Ebook', '🎫 Ticket', '👩🏾‍🏫 Course', '🤝🏼 Service', '🎁 Love Gift', '😶‍🌫️ Others'];
const categories = ['👔 Business', '👩‍❤️‍👨 Relationship', '🔮 Spirituality', '🎭 Arts and Entertainment', '🏋🏽 Health and Fitness', '😶‍🌫️ Others'];

const ProductDetail = ({ formik }) => {
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null)

  const handleFreeProductChange = (event) => {
    const checked = event.target.checked;
    setIsCustomAmount(checked);
    if (checked) {
      formik.setFieldValue('amount', '');
    } else {
      formik.setFieldValue('amount', formik.values.amount || '');
    }
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue('quantity', value);
  };

  const handleImageChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;

    // setSelectedImage(URL.createObjectURL(file));
    await getImageDataUrl(file, setFieldValue);
  };

  const getImageDataUrl = async (file, setFieldValue) => {
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
      setFieldValue('bannerImg', results.url);
    } catch (error) {
      console.log('Error uploading image:', error);
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
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Upload Product Image
            <input
              name="productImage"
              type="file"
              capture="environment"
              hidden
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e, setFieldValue);
              }}
            />
          </Button>
          {formik.values.productImage && (
            <Typography variant="body2" component="p">
              {formik.values.productImage.name}
            </Typography>
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
            label="Amount ($)"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={isCustomAmount ? '' : formik.values.amount}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.amount && formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            disabled={isCustomAmount}
          />
          <FormControlLabel
            control={<Checkbox checked={isCustomAmount} onChange={handleFreeProductChange} name="isCustomAmount" />}
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
          <Button variant="contained" component="label" startIcon={<UploadFile />}>
            Upload Product File
            <input type="file" hidden onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])} />
          </Button>
          {formik.values.file && (
            <Typography variant="body2" component="p">
              {formik.values.file.name}
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductDetail;

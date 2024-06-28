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

const productTypes = ['Ticket', 'Course', 'Service', 'Love Gift'];
const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

const ProductDetail = ({ formik }) => {
  const [isFreeProduct, setIsFreeProduct] = useState(false);

  const handleFreeProductChange = (event) => {
    const checked = event.target.checked;
    setIsFreeProduct(checked);
    if (checked) {
      formik.setFieldValue('amount', 0);
    } else {
      formik.setFieldValue('amount', '');
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
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Product Image
            <input
              type="file"
              hidden
              onChange={(event) => formik.setFieldValue('productImage', event.currentTarget.files[0])}
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
          <TextField
            name="amount"
            label="Amount"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.amount && formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            disabled={isFreeProduct}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isFreeProduct}
                onChange={handleFreeProductChange}
                name="isFreeProduct"
              />
            }
            label="Free Product"
          />
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
            name="quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.quantity && formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </Grid>
        <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFile />}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
              />
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

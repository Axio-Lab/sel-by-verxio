import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const PreviewProduct = ({ formik }) => {
  const { values } = formik;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Product Preview
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={values.name} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Product Image" secondary={values.productImage ? values.productImage : 'No product image uploaded'} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Description" secondary={values.description} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Product Type" secondary={values.productType} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Amount in SOL" secondary={values.payAnyAmount ? 'Pay any amount' : values.amount} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Category" secondary={values.category} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Quantity" secondary={values.quantity === '0' ? 'Unlimited' : values.quantity} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="File" secondary={values.productFile ? values.productFile : 'No file uploaded'} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default PreviewProduct;
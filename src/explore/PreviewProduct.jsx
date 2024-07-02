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

  console.log("showing Values", values)

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
            <ListItemText primary="Product Image" secondary={values.productImage ? values.productImage.name : 'No product image uploaded'} />
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
            <ListItemText primary="Amount" secondary={values.amount} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Category" secondary={values.category} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Quantity" secondary={values.quantity === '0' ? 'Unlimited' : values.quantity}  />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="File" secondary={values.file ? values.file.name : 'No file uploaded'} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default PreviewProduct;

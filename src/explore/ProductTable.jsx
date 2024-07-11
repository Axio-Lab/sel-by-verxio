import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import { useWallet } from '@solana/wallet-adapter-react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const getStatusProps = (statusText) => {
  let statusColor = { light: '', dark: '' };

  switch (statusText.toLowerCase()) {
    case 'ebook':
      statusColor = { light: 'primary.light', dark: 'primary.dark' };
      break;
    case 'ticket':
      statusColor = { light: 'orange.light', dark: 'orange.dark' };
      break;
    case 'others':
      statusColor = { light: 'success.light', dark: 'success.dark' };
      break;
    case 'course':
      statusColor = { light: 'secondary.light', dark: 'secondary.dark' };
      break;
    case 'love gift':
      statusColor = { light: 'warning.light', dark: 'warning.dark' };
      break;
    case 'service':
      statusColor = { light: 'warning.light', dark: 'warning.dark' };
      break;
    default:
      statusColor = { light: 'success.light', dark: 'success.dark' };
  }

  return { statusColor};
};

const shortenURL = (url) => {
  if (!url) return '';
  const baseUrl = url.split('/').slice(0, 3).join('/'); 
  const lastPart = url.split('/').pop().slice(0, 5);

  // Create a shortened URL
  return `${baseUrl}.....${lastPart}`;
};

// Create data function
function createData(name, type, category, inStock, amount, link, createdAt, sales, totalEarning, product, customers) {
  return {
    name,
    type,
    category,
    inStock,
    amount,
    link,
    createdAt,
    sales,
    totalEarning,
    product,
    customers,
  };
}

// Row component
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { statusColor } = getStatusProps(row.type);

  const handleCopy = () => {
    toast.info("URL has been copied!");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ color: statusColor.dark }}>{row.type}</TableCell>
        <TableCell align="center">{row.category}</TableCell>
        <TableCell align="center">{row.inStock}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="right">
        <CopyToClipboard text={row.link} onCopy={handleCopy}>
            <IconButton aria-label="copy link" size="small">
              <Typography variant="body2" sx={{ marginRight: 1 }}>{shortenURL(row.link)}</Typography>
              <ContentCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Created At</TableCell>
                    <TableCell align='center'>Sales</TableCell>
                    <TableCell align="center">Total Earning</TableCell>
                    <TableCell align="center">Product Link</TableCell>
                    <TableCell align="center">Customers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell align='center'>{row.sales}</TableCell>
                    <TableCell align="center">{row.totalEarning}</TableCell>
                    <TableCell align="center">
                    <CopyToClipboard text={row.product} onCopy={handleCopy}>
                      <IconButton aria-label="copy link" size="small">
                        <Typography variant="body2" sx={{ marginRight: 1 }}>{shortenURL(row.product)}</Typography>
                        <ContentCopyIcon />
                      </IconButton>
                    </CopyToClipboard>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/explore/customers/${row.name}`}>View Customers</Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    inStock: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalEarning: PropTypes.number.isRequired,
    customers: PropTypes.string.isRequired,
  }).isRequired,
};

// Fetch product details and set rows
export default function ProductTable() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { publicKey, connected } = useWallet();

  const userId = publicKey?.toBase58();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(`https://sel-by-verxio.onrender.com/api/v1/product/user/${productId}`);
      // Convert the API response to rows
      const fetchedRows = response.data.products.map(product => createData(
        product.name,
        product.type,
        product.category,
        product.quantity,
        product.price,
        product.blink,
        product.createdAt,
        product.sales,
        product.revenue,
        product.productFile,
        product.customers
      ));

      setRows(fetchedRows);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  React.useEffect(() => {
    if (userId) {
      getProductDetails(userId);
    } else {
      setRows([]); 
    }
  }, [ userId]);

  if (!connected) {
    return (
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="body1">Please connect your wallet to view products.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <MainCard title="All Products 🛒">
        <Grid container spacing={gridSpacing}>
        {rows.length === 0 ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">No records found.</Typography>
            </Box>
          ) : (
            <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">In Stock</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="right">Blink URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          </>
          )}
        </Grid>
      </MainCard>
    </Box>
  );
}

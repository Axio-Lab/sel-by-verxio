import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainCard from 'ui-component/cards/MainCard';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

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


// Create data function
function createData(name, type, sales, revenue, link, createdAt, inStock, totalEarning, customers) {
  return {
    name,
    type,
    sales,
    revenue,
    link,
    createdAt,
    inStock,
    totalEarning,
    customers,
  };
}

// Row component
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { statusColor } = getStatusProps(row.type);

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
        <TableCell align="center">{row.sales}</TableCell>
        <TableCell align="center">{row.revenue}</TableCell>
        <TableCell align="right">
          {row.link}
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
                    <TableCell align='center'>In Stock</TableCell>
                    <TableCell align="center">Total Earning</TableCell>
                    <TableCell align="center">Customers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell align='center'>{row.inStock}</TableCell>
                    <TableCell align="center">{row.totalEarning}</TableCell>
                    <TableCell align="center">
                      {/* <a href={row.customers} target="_blank" rel="noopener noreferrer">
                        View Customers
                      </a> */}
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
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    inStock: PropTypes.number.isRequired,
    totalEarning: PropTypes.string.isRequired,
    customers: PropTypes.string.isRequired,
  }).isRequired,
};

// Data rows
const rows = [
  createData('Business Mastery Mentorship', 'Ticket', 20, '$997', 'https://verxio.xyz/product/66f4223550d95f50f', '2023-01-05', 24, '$5,700', 'https://verxio.xyz/customers/66f4223550d95f50f'),
  createData('Bonk Collections', 'Ebook', 15, '$27', 'https://verxio.xyz/product/6669845678gvbh', '2023-02-15', 15, '$405', 'https://verxio.xyz/customers/6669845678gvbh'),
  createData('Reliance Academy', 'Course', 20, '$1,150', 'https://verxio.xyz/product/bfvgbhnjktyu6', '2023-03-10', 20, '$23,000', 'https://verxio.xyz/customers/bfvgbhnjktyu6'),
  createData('1-0n-1 Fireside Chat', 'Service', 10, '$900', 'https://verxio.xyz/product/bfvgbh67yktyu6', '2023-04-20', 10, '$9,000', 'https://verxio.xyz/customers/bfvgbh67yktyu6'),
  createData('Social Media Mastery for Businesses', 'Others', 50, '$50', 'https://verxio.xyz/product/bfvfghtktyu6', '2023-05-30', 50, '$2,500', 'https://verxio.xyz/customers/bfvfghtktyu6'),
];

export default function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <MainCard title="All Products 🛒">
        <Grid container spacing={gridSpacing}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Sales</TableCell>
                  <TableCell align="center">Revenue</TableCell>
                  <TableCell align="right">Product Link</TableCell>
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
        </Grid>
      </MainCard>
    </Box>
  );
}

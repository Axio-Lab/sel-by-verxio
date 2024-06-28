import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

// Helper function to determine color and icon based on status text
const getStatusProps = (statusText) => {
  let statusColor = { light: '', dark: '' };
  let statusIcon = <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />;

  switch (statusText.toLowerCase()) {
    case 'ebook':
      statusColor = { light: 'primary.light', dark: 'primary.dark' };
      break;
    case 'ticket':
      statusColor = { light: 'orange.light', dark: 'orange.dark' };
      break;
    case 'membership':
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

  return { statusColor, statusIcon };
};

const salesData = [
  { title: 'Business Mastery Mentorship', amount: '$997', statusText: 'Ticket' },
  { title: 'Bonk Collections', amount: '$47', statusText: 'Ebook' },
  { title: 'Reliance Academy', amount: '$200', statusText: 'Membership' },
  { title: '1-0n-1 Fireside Chat', amount: '$1,997', statusText: 'Service' },
  { title: 'Social Media Mastery for Businesses', amount: '$197', statusText: 'Course' },
];

const SalesItem = ({ title, amount, statusText }) => {
  const { statusColor, statusIcon } = getStatusProps(statusText);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" color="inherit">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" color="inherit">
                  {amount}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '5px',
                    bgcolor: statusColor.light,
                    color: statusColor.dark,
                    ml: 2,
                  }}
                >
                  {statusIcon}
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" sx={{ color: statusColor.dark }}>
          {statusText}
        </Typography>
      </Grid>
      <Divider sx={{ my: 1.5 }} />
    </Grid>
  );
};

SalesItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
};

const TransactionCard = ({ isLoading }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Transaction History</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: 'primary.200',
                        cursor: 'pointer',
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}>Today</MenuItem>
                      <MenuItem onClick={handleClose}>This Month</MenuItem>
                      <MenuItem onClick={handleClose}>This Year</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {salesData.map((item, index) => (
                  <SalesItem
                    key={index}
                    title={item.title}
                    amount={item.amount}
                    statusText={item.statusText}
                  />
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

TransactionCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TransactionCard;

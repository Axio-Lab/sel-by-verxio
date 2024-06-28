// material-ui
import { useTheme } from '@mui/material/styles';
import seLogo from '../assets/images/seLogo.svg'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={seLogo} alt="Berry" width="75" />
  );
};

export default Logo;

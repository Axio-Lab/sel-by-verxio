// material-ui
import { useTheme } from '@mui/material/styles';
import seLogo from '../assets/images/seLogo.svg'

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={seLogo} alt="SEL" width="75" />
  );
};

export default Logo;

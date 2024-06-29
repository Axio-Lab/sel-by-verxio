import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// solana wallet adapter
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  ParticleAdapter 
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import '@solana/wallet-adapter-react-ui/styles.css';

// ==============================|| APP ||============================== //

const App = () => {
    const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        // new ParticleAdapter({
        //   config: {
        //     projectId: import.meta.env.VITE_APP_PROJECT_ID,
        //     clientKey: import.meta.env.VITE_APP_CLIENT_KEY,
        //     appId: import.meta.env.VITE_APP_APP_ID,
        //   },
        //   preferredAuthType: {
        //     type: 'google', setAsDisplay: true
        //   }
        // })
      ],
      []
    );

    
  const customization = useSelector((state) => state.customization);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <RouterProvider router={router} />
                </WalletModalProvider>
              </WalletProvider>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </ConnectionProvider>
  );
};

export default App;

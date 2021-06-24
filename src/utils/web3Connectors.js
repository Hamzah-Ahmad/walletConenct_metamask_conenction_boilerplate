import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { FortmaticConnector } from "@web3-react/fortmatic-connector";
// import { PortisConnector } from "@web3-react/portis-connector";
import { isMobile } from "react-device-detect";

// import coinbaseLogo from "../Assets/wallets/coinbase.png";
// import fortmaticLogo from "../Assets/wallets/fortmatic.png";
import injectedLogo from "../assets/wallets/injected.png";
import metamaskLogo from "../assets/wallets/metamask.png";
// import portisLogo from "../Assets/wallets/portis.png";
import walletconnectLogo from "../assets/wallets/walletconnect.png";

// const REACT_APP_NETWORK_URL1 = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
// const REACT_APP_NETWORK_URL4 = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;

const POLLING_INTERVAL = 12000;

// const RPC_URLS = {
//   1: REACT_APP_NETWORK_URL1,
//   4: REACT_APP_NETWORK_URL4,
// };

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    4: "https://rinkeby.infura.io/v3/637a6ab08bce4397a29cbc97b4c83abf",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[4],
//   appName: "PolkaLokr",
// });

// const fortmaticKey =
//   process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
//     ? process.env.REACT_APP_FORTMATIC_PRODUCTION_KEY
//     : process.env.REACT_APP_FORTMATIC_DEVELOPMENT_KEY;

// export const fortmatic = new FortmaticConnector({
//   apiKey: fortmaticKey,
//   chainId: 4,
// });

// export const portis = new PortisConnector({
//   dAppId: process.env.REACT_APP_PORTIS_ID,
//   networks: [4],
// });

export const injectedConnectorList = [
  {
    name: "Metamask",
    connector: injected,
    connectorType: InjectedConnector,
    logo: metamaskLogo,
  },
  {
    name: "Injected",
    connector: injected,
    connectorType: InjectedConnector,
    logo: injectedLogo,
  },
];

export const desktopWalletList = [
  {
    name: "Metamask",
    connector: injected,
    connectorType: InjectedConnector,
    logo: metamaskLogo,
  },
  {
    name: "WalletConnect",
    connector: walletconnect,
    connectorType: WalletConnectConnector,
    logo: walletconnectLogo,
  },
  // {
  //   name: "Coinbase",
  //   connector: walletlink,
  //   connectorType: WalletLinkConnector,
  //   logo: coinbaseLogo,
  // },
  // {
  //   name: "Fortmatic",
  //   connector: fortmatic,
  //   connectorType: FortmaticConnector,
  //   logo: fortmaticLogo,
  // },
  // {
  //   name: "Portis",
  //   connector: portis,
  //   connectorType: PortisConnector,
  //   logo: portisLogo,
  // },
];

export const mobileWalletList = [
  {
    name: "WalletConnect",
    connector: walletconnect,
    connectorType: WalletConnectConnector,
    logo: walletconnectLogo,
  },

  // {
  //   name: "Fortmatic",
  //   connector: fortmatic,
  //   connectorType: FortmaticConnector,
  //   logo: fortmaticLogo,
  // },
  // {
  //   name: "Portis",
  //   connector: portis,
  //   connectorType: PortisConnector,
  //   logo: portisLogo,
  // },
];

export const walletList = isMobile
  ? window?.ethereum
    ? [
        window?.ethereum?.isMetaMask
          ? injectedConnectorList[0]
          : injectedConnectorList[1],
      ]
    : mobileWalletList
  : desktopWalletList;

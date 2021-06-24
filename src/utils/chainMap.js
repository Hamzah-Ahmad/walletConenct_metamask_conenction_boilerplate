// import BinanceLogo from "../Assets/BinanceLogoNew.svg";
// import EthereumLogo from "../Assets/ethereumSVG.svg";
// import MaticLogo from "../Assets/MaticLogo.svg";
import BinanceLogo from "../assets/svgs/binance.svg";
import EthereumLogo from "../assets/svgs/ethereum.svg";
import MaticLogo from "../assets/svgs/matic.svg";
import links from "../contract/constants/links";
import {
  ERC_BRIDGE_TEST,
  BEP_BRIDGE_TEST,
  MAT_BRIDGE_TEST,
  polkaLokrERC_TEST,
  polkalokrBEP_TEST,
  polkaLokrMAT_TEST,
} from "../contract/constants";

export const chainMap = {
  // 1: {
  //   chain: "ETH_CHAIN_MAIN",
  //   name: "ERC20",
  //   logo: EthereumLogo,
  //   token: "",
  //   bridge: "",
  // },
  4: {
    chain: "ETH_CHAIN_TEST",
    name: "ERC20",
    logo: EthereumLogo,
    token: polkaLokrERC_TEST,
    bridge: ERC_BRIDGE_TEST,
    // scan: "https://rinkeby.etherscan.io/tx/",
    scan: links.ETHERSCAN_TX,
  },
  // 56: {
  //   chain: "BEP_CHAIN_MAIN",
  //   name: "BEP20",
  //   logo: BinanceLogo,
  //   token: "",
  //   bridge: "",
  // },
  97: {
    chain: "BEP_CHAIN_TEST",
    name: "BEP20",
    logo: BinanceLogo,
    token: polkalokrBEP_TEST,
    bridge: BEP_BRIDGE_TEST,
    // scan: "https://testnet.bscscan.com/tx/",
    scan: links.BSC_SCAN_TX,
  },
  // 137: {
  //   chain: "MAT_CHAIN_MAIN",
  //   name: "MAT",
  //   logo: MaticLogo,
  //   token: "",
  //   bridge: "",
  // },
  80001: {
    chain: "MAT_CHAIN_TEST",
    name: "Polygon",
    logo: MaticLogo,
    token: polkaLokrMAT_TEST,
    bridge: MAT_BRIDGE_TEST,
    // scan: "https://explorer-mumbai.maticvigil.com/tx/",
    scan: links.MAINNET_EXPLORER_TX,
  },
};

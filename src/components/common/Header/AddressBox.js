import React, { useState, useContext } from "react";
// import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

import ModalList from "../../Modals/ModalList";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useWeb3React } from "@web3-react/core";

import EthereumLogo from "../../../assets/svgs/ethereum.svg";
import BinanceLogo from "../../../assets/svgs/binance.svg";

import { chainMap } from "../../../utils/chainMap";

import { walletList } from "../../../utils/web3Connectors";
import { conciseAddress } from "../../../utils/formattingFunctions";
import {
  useEagerConnect,
  useActivateWallet,
  useInactiveListener,
} from "../../../hooks/walletConnectHooks";

// import { PendingTxContext } from "../../../../context/PendingTxContext";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#E6007A",
    fontSize: "13px",
    fontFamily: "Montserrat, sans-serif",
    margin: "0px",
    padding: "0px",
    // padding: "14px 32px",
    // "@media only screen and (max-width:400px)": {
    //   fontSize: "12px",
    //   padding: "4px 8px",
    // },
    // "@media only screen and (max-width:280px)": {
    //   fontSize: "10px",
    //   padding: "2px 6px",
    // },
    cursor: "default",
  },
  AddBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "#3A2B36",
    background: "#292929",
    // borderRadius: "60px",
    borderRadius: "5px",
    padding: "4px 12px",
    // paddingLeft: "5px",
    "@media only screen and (max-width:420px)": {
      padding: "6px 8px",
      // display: "none",
    },
    "@media only screen and (max-width:280px)": {
      padding: "0px",
    },
  },
  OuterBox: {
    display: "flex",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  innerItems: {
    margin: "auto",
  },
  tokenLogo: {
    width: 30,
    height: 30,
    paddingTop: "3px",
    paddingRight: "6px",
    "@media only screen and (max-width:400px)": {
      width: 25,
      height: 25,
    },
    "@media only screen and (max-width:310px)": {
      display: "none",
    },
  },
}));
const AddresBox = ({ disconnectWallet }) => {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [openModal, setOpenModal] = useState();

  //   const { pendingTransactions, setPendingTransactions } =
  //     useContext(PendingTxContext);

  // Wallet Connect
  const [open, setOpen] = useState(false);
  const [loadingValue, setLoadingValue] = useState(walletList || []);

  const [activatingConnector, setActivatingConnector] = React.useState();

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  const activateWallet = useActivateWallet();

  const toggleModal = () => {
    setOpen((_val) => !_val);
  };

  const onClickWalletConnector = async ({ connector, name }) => {
    // console.log("connecting wallet", connector, name);
    setActivatingConnector(connector);
    setLoadingValue(name);
    await activateWallet(connector, toggleModal);
    setLoadingValue("");
    setOpen(false);
  };
  //*********************//

  return (
    <>
      <div className={classes.OuterBox} onClick={toggleModal}>
        <div
          className={classes.AddBox}
          // style={matches ? { width: "100%" } : { width: "100%" }}
        >
          <div className={classes.innerItems}>
            {account && (
              <img
                src={chainMap[chainId]?.logo}
                className={classes.tokenLogo}
              />
            )}
          </div>
          <div className={classes.innerItems}>
            {/* <WalletConnect /> */}{" "}
            <Button className={classes.btn}>
              {account ? (
                conciseAddress(account)
              ) : (
                <span className={classes.connectText}>Connect Wallet</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <ModalList
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        heading="Select Connector"
        list={walletList}
        objectPropToRender="name"
        iconPropToRender="logo"
        onClick={onClickWalletConnector}
        showLoading={true}
        loadingValue={loadingValue}
        loadingPropToCompare="name"
        disconnectWallet={disconnectWallet}
      />
    </>
  );
};
export default AddresBox;

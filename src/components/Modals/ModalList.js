import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "../Button";
import { useWeb3React } from "@web3-react/core";

import {
  Dialog,
  Typography,
  Container,
  Box,
  IconButton,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
// import { debounce } from "../utils/debounce";
import { debounce } from "../../utils/debounce";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { InjectedConnector } from "@web3-react/injected-connector";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
  },
  container: {
    background: "#18181a",
    color: "#fff",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderRadius: "24px",
  },
  dialog: {
    background: "#000000B3",
  },
  listItem: {
    cursor: "pointer",
    minWidth: "80%",
    margin: "auto",
    marginBottom: "3vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 25px",
    border: "0.2px solid #FEFEFE80",
    borderRadius: "16px",
  },
  activeListItem: {
    "&::before": {
      content: '"●"',
      color: "green",
      // fontWeight: "bold",
      marginRight: "5px",
      fontSize: "20px",
    },
  },
  list: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
  },
}));

const ModalList = ({
  heading = "Select",
  list = [],
  objectPropToRender = "",
  iconPropToRender = "",
  open = false,
  showLoading = false,
  loadingPropToCompare = "",
  loadingValue = "",
  onClose = () => {},
  onClick = () => {},
  disconnectWallet,
}) => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");
  const [localList, setLocalList] = useState([]);
  const { deactivate, connector, active } = useWeb3React();

  const isMobile = useMediaQuery("(max-width:550px)");

  const filterAndUpdateList = (_list, _searchInput, _objectPropToRender) => {
    const __searchInput = _searchInput?.toLowerCase() || "";
    setLocalList(
      _list.filter((_item) =>
        (typeof _item === "object"
          ? _item[_objectPropToRender] || "-"
          : _item || "-"
        )
          ?.toLowerCase()
          .includes(__searchInput)
      )
    );
  };

  const debouncedFilterAndUpdateList = useCallback(
    debounce(filterAndUpdateList, 500),
    []
  );

  useEffect(() => {
    debouncedFilterAndUpdateList(list, searchInput, objectPropToRender);
  }, [list, searchInput, objectPropToRender]);

  // useEffect(() => console.log(connector instanceof InjectedConnector, list));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick
      className={classes.dialog}
      PaperProps={{
        style: { background: "transparent" },
      }}
    >
      <Container className={classes.container}>
        <Box className={classes.box}>
          <div></div>
          <div>Connect to a wallet</div>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" style={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <div className={classes.list} style={isMobile ? { width: "70vw" } : {}}>
          {/* {console.log(localList)} */}
          {localList?.length > 0 ? (
            localList.map((_listItem, index) => {
              let key =
                typeof _listItem === "object"
                  ? _listItem[objectPropToRender] || "-"
                  : _listItem || "-";
              return (
                <div
                  key={`modalList${key}${index}`}
                  onClick={() => onClick(_listItem)}
                  className={[classes.listItem].join(" ")}
                >
                  {typeof _listItem === "object" &&
                  showLoading &&
                  _listItem[loadingPropToCompare] === loadingValue ? (
                    <CircularProgress size={12} />
                  ) : null}
                  <Typography
                    variant="body1"
                    className={
                      connector instanceof _listItem.connectorType
                        ? classes.activeListItem
                        : ""
                    }
                  >
                    {key}
                  </Typography>
                  {typeof _listItem === "object" && iconPropToRender ? (
                    <img
                      src={_listItem[iconPropToRender]}
                      alt={`logo-${key}`}
                      width="16px"
                    />
                  ) : null}
                </div>
              );
            })
          ) : (
            <ListItem>
              <Typography variant="body2">Nothing to show</Typography>
            </ListItem>
          )}
          {active && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                outlined
                onClick={() => disconnectWallet()}
                style={{
                  background: "#292929",
                  borderRadius: "5px",
                  fontSize: "13px",
                  color: "#E6007A",
                  fontFamily: "Montserrat, sans-serif",
                  padding: "10px 25px",
                  width: !isMobile ? "92.5%" : "98%",
                }}
              >
                Disconnect Wallet
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Dialog>
  );
};

export default ModalList;

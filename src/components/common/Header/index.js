import AddressBox from "./AddressBox";
import { useWeb3React } from "@web3-react/core";
const Header = () => {
  const { deactivate, connector } = useWeb3React();

  const disconnectWallet = async () => {
    if (connector && connector.close) connector.close();
    deactivate();
    localStorage.clear("walletconnect");
  };

  return (
    <div>
      <AddressBox disconnectWallet={disconnectWallet} />
    </div>
  );
};

export default Header;

import AddressBox from "./AddressBox";

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

import "./App.css";
import Create from "./components/Pages/Create";
import Layout from "./components/Layout/Layout";

import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/walletConnectFunctions";
function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Create />
        </Layout>
      </Web3ReactProvider>
    </div>
  );
}

export default App;

import "./App.css";
import {
  ChainId,
  Config,
  DAppProvider,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import Button from "@mui/material/Button";
import { Container, Grid, Paper, Typography } from "@mui/material";
import {
  contractAddress,
  useDeveloperDaoTokenId,
  useDeveloperDaoTokenURI,
} from "./developer-dao";
import React from "react";

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://eth-mainnet.alchemyapi.io/v2/HtaCo8wgBQ6cIso2BBico7FYqazoFmZf",
  },
};

export const App = () => {
  return (
    <Grid spacing={2} padding="50px">
      <Container maxWidth="sm">
        <DAppProvider config={config}>
          <Paper sx={{ padding: "50px" }}>
            <ConnectButton />
            <AccountBasicInfo />
          </Paper>
        </DAppProvider>
      </Container>
    </Grid>
  );
};

const AccountBasicInfo = () => {
  const { activateBrowserWallet, account } = useEthers();

  const userTokenBalance = formatUnits(
    useTokenBalance(contractAddress, account) || 0,
    0
  );

  return (
    <>
      {account && <p>Account: {account}</p>}
      {account && (
        <p>
          You have: {userTokenBalance && userTokenBalance} of Developer Dao
          Token(s);
        </p>
      )}
      <Tokens numberOfTokens={parseInt(userTokenBalance)} />
    </>
  );
};

const Tokens: React.FC<{ numberOfTokens: number }> = ({ numberOfTokens }) => {
  let tokens = [];
  for (let i = 0; i < numberOfTokens; i++) {
    tokens.push(<TokenData usersTokenIndex={i} />);
  }

  return <>{tokens}</>;
};

const TokenData: React.FC<{ usersTokenIndex: number }> = ({
  usersTokenIndex,
}) => {
  const { activateBrowserWallet, account } = useEthers();
  const tokenId = useDeveloperDaoTokenId(usersTokenIndex, account || "");

  const tokenURIbased = useDeveloperDaoTokenURI(tokenId);

  let tokenURI;
  try {
    tokenURI = JSON.parse(atob(tokenURIbased.substring(29)));
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      Token name:{" "}
      <span style={{ fontWeight: "bolder" }}>{tokenURI?.name || "n/a"}</span>
      <Typography style={{ marginTop: "10px" }}>
        Token description: {tokenURI?.description || "n/a"}
      </Typography>
      {tokenURI?.image ? (
        <img
          style={{ marginTop: "10px", border: "1px solid gray" }}
          src={tokenURI?.image}
        ></img>
      ) : (
        "image n/a"
      )}
    </>
  );
};

const ConnectButton = () => {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <Button variant="contained" onClick={() => activateBrowserWallet()}>
      Metamask Connect
    </Button>
  );
};

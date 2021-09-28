import { Interface, JsonFragment } from "@ethersproject/abi";
import { useContractCall } from "@usedapp/core";

export const contractAddress = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";

const abiFragments: { [key: string]: JsonFragment } = {
  tokenOfOwnerByIndex: {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  tokenURI: {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
};

export const useDeveloperDaoTokenId = (
  index: number,
  address: string
): number => {
  const getTokenOfOwnerByIndexContractCall = {
    abi: new Interface([abiFragments.tokenOfOwnerByIndex]),
    address: contractAddress,
    args: [address, index],
    method: "tokenOfOwnerByIndex",
  };

  const [token] = useContractCall(getTokenOfOwnerByIndexContractCall) || [];
  return token ? token : null;
};

export const useDeveloperDaoTokenURI = (tokenId: number) => {
  const getTokenURIContractCall = {
    abi: new Interface([abiFragments.tokenURI]),
    address: contractAddress,
    args: [tokenId],
    method: "tokenURI",
  };
  const [tokenURIbased] = useContractCall(getTokenURIContractCall) || [];
  return tokenURIbased;
};

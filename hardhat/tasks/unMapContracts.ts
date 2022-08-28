/* eslint-disable prettier/prettier */
/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TASK_UNMAP_CONTRACT } from "./task-names";

// chainid = Chain IDs defined by Router. Eg: Polygon, Fantom and BSC are assigned chain IDs 1, 2, 3.
// nchainid = Actual Chain IDs
task(TASK_UNMAP_CONTRACT, "Unmap Contracts")
  .addParam<string>(
    "chainid",
    "Remote ChainID (Router Specs)",
    "",
    types.string
  )
  .addParam<string>("nchainid", "Remote ChainID", "", types.string)
  .setAction(async (taskArgs, hre): Promise<null> => {
    const deployments = require("../deployments/deployments.json");
    const handlerABI = require("../build/contracts/genericHandler.json");
    const network = await hre.ethers.provider.getNetwork();
    const lchainID = network.chainId.toString();

    const handlerContract: Contract = await hre.ethers.getContractAt(
      handlerABI,
      deployments[lchainID].handler
    );

    await handlerContract.UnMapContract([
      deployments[lchainID].greeter,
      taskArgs.chainid,
      deployments[taskArgs.nchainid].greeter,
    ]);
    console.log("Greeter Un-Mapping Done");
    return null;
  });

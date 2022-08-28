/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { task, types } from "hardhat/config";
import { TASK_STORE_DEPLOYMENTS } from "./task-names";
import fs from "fs";

task(TASK_STORE_DEPLOYMENTS, "store deployments")
  .addParam<string>("contractName", "Contract Name", "", types.string)
  .addParam<string>("contractAddress", "Contract Address", "", types.string)
  .setAction(async (taskArgs, { ethers }): Promise<null> => {
    const network = await ethers.provider.getNetwork();
    const networkID = network.chainId;

    const deployedContracts = require("../deployments/deployments.json");

    if (typeof deployedContracts[networkID] === "undefined") {
      deployedContracts[networkID] = {};
    }

    deployedContracts[networkID][taskArgs.contractName] =
      taskArgs.contractAddress;

    fs.writeFileSync(
      "deployments/deployments.json",
      JSON.stringify(deployedContracts)
    );

    return null;
  });

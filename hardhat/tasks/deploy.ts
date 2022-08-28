/* eslint-disable prettier/prettier */
/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";
import {
  TASK_APPROVE_FEES,
  TASK_DEPLOY,
  TASK_SET_FEES_TOKEN,
  TASK_SET_LINKER,
  TASK_STORE_DEPLOYMENTS,
} from "./task-names";

task(TASK_DEPLOY, "Deploys the project").setAction(
  async (taskArgs, hre): Promise<null> => {
    const deployment = require("../deployments/deployments.json");

    const network = await hre.ethers.provider.getNetwork();
    const chainId = network.chainId;

    const handler = deployment[chainId].handler;
    const feeToken = deployment[chainId].feeToken;
    const linker = deployment[chainId].linker;

    const contract = await hre.ethers.getContractFactory("Greeter");

    const greeter = await contract.deploy(handler);
    await greeter.deployed();
    console.log(`Greeter deployed to: `, greeter.address);

    await hre.run(TASK_STORE_DEPLOYMENTS, {
      contractName: "greeter",
      contractAddress: greeter.address,
    });

    await hre.run(TASK_SET_LINKER, {
      contractAdd: greeter.address,
      linkerAdd: linker,
    });

    await hre.run(TASK_SET_FEES_TOKEN, {
      contractAdd: greeter.address,
      feeToken: feeToken,
    });

    await hre.run(TASK_APPROVE_FEES, {
      contractAdd: greeter.address,
      feeToken: feeToken,
    });

    return null;
  }
);

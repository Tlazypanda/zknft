/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { TASK_SET_GAS_PRICE } from "./task-names";
import { task, types } from "hardhat/config";

task(TASK_SET_GAS_PRICE, "Sets the gas price")
  .addParam(
    "contractAdd",
    "address of the cross-chain contract",
    "",
    types.string
  )
  .addParam("gasPrice", "price of the gas", "", types.string)
  .setAction(async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("Greeter");
    const greeter = await contract.attach(taskArgs.contractAdd);
    await greeter.setCrossChainGasPrice(taskArgs.gasPrice, { gasLimit: 2000000 });
    console.log(`Gas Price set`);
    return null;
  });

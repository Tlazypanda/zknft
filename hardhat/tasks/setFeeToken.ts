/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { TASK_SET_FEES_TOKEN } from "./task-names";
import { task, types } from "hardhat/config";

task(TASK_SET_FEES_TOKEN, "Sets the fee token address")
  .addParam(
    "contractAdd",
    "address of the cross-chain contract",
    "",
    types.string
  )
  .addParam("feeToken", "address of the fee token", "", types.string)
  .setAction(async (taskArgs, hre): Promise<null> => {
    const contract = await hre.ethers.getContractFactory("Greeter");
    const greeter = await contract.attach(taskArgs.contractAdd);
    await greeter.setFeesToken(taskArgs.feeToken, { gasLimit: 2000000 });
    console.log(`Fee token address set`);
    return null;
  });

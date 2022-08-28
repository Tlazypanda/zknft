/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { TASK_APPROVE_FEES } from "./task-names";
import { task, types } from "hardhat/config";

task(TASK_APPROVE_FEES, "Approves the fees")
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
    await greeter._approveFees(taskArgs.feeToken, "1000000000000000000000000", {
      gasLimit: 2000000,
    });
    console.log(`Fee approved`);
    return null;
  });

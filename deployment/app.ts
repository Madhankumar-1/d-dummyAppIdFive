#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import fs from "fs";
import { TYPES } from "@cny-common/aws.cdk.ts";
import { ApiGenStack } from "./ApiGenStack";
import { generateResourceName } from "@cny-helpers/nodejs";

const app = new cdk.App();

// const extendedGroupEndpoints: TYPES.ExtendedGroupEndpoints = JSON.parse(fs.readFileSync("../inputs/inputs.json", "utf-8"));

export function deploy(extendedGroupEndpoints: TYPES.ExtendedGroupEndpoints) {

     for (const [deploymentGroup, deploymentGroupObj] of Object.entries(extendedGroupEndpoints)) {
          const gatewayName = Object.keys(deploymentGroupObj)[0];
          const { stage, productShortName, orgShortName } = deploymentGroupObj[gatewayName];
          const stackName = generateResourceName({
               stage,
               productShortName,
               orgShortName,
               resourceConstant: `${deploymentGroup}`,
          });

          const stack = new ApiGenStack(app, stackName, extendedGroupEndpoints);
          stack.deploy();
     }
     
}

import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ApiStack from "../stacks/ApiStack";

//TODO. 테스트 코드 구성필요 TEST
test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new ApiStack(app, "test-stack");
  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::Lambda::Function", 1);
});

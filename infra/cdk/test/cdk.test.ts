import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Cdk from "../lib/github-oidc-stack";

describe("test cdk stack", () => {
  const app = new cdk.App();
  const projectName = "aws-gh-oidc";
  const allowedBranchPatternToPush =
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main";

  const stack = new Cdk.GithubOIDCStack(app, "MyTestStack", {
    projectName,
    allowedBranchPatternToPush,
  });

  test("SSM Parameter created", () => {
    // THEN
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::SSM::Parameter", {
      Name: `hello_${projectName}`,
      Value: "Hi from aws :wave:",
    });
  });

  test("OIDC Provider created", () => {
    // THEN
    const template = Template.fromStack(stack);

    template.hasResourceProperties("Custom::AWSCDKOpenIdConnectProvider", {
      Url: "https://token.actions.githubusercontent.com",
      ClientIDList: ["sts.amazonaws.com"],
    });
  });
});

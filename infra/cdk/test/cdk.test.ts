import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Cdk from "../lib/github-oidc-stack";

test("SSM Parameter created", () => {
  const app = new cdk.App();
  const projectName = "aws-gh-oidc";
  // WHEN
  const stack = new Cdk.GithubOIDCStack(app, "MyTestStack", {
    projectName,
  });
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::SSM::Parameter", {
    Name: `hello_${projectName}`,
    Value: "Hi from aws :wave:",
  });
});

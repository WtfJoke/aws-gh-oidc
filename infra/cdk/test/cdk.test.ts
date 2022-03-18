import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { GithubOIDCStack } from "../lib/github-oidc-stack";

describe("test cdk stack", () => {
  const app = new cdk.App();
  const projectName = "aws-gh-oidc";
  const allowedBranchPatternToPush: string[] = [
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/develop",
  ];
  const audience = "sts.amazonaws.com";

  const stack = new GithubOIDCStack(app, "MyTestStack", {
    projectName,
    allowedBranchPatternToPush,
    audience,
  });

  const stackWithSingleBranchPattern = new GithubOIDCStack(
    app,
    "MyTestStackWithOnlyOneBranchPattern",
    {
      projectName,
      allowedBranchPatternToPush: [
        "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
      ],
      audience,
    }
  );

  test("SSM Parameter created", () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::SSM::Parameter", {
      Name: `hello_${projectName}`,
      Value: "Hi from aws :wave:",
    });
  });

  test("OIDC Provider created", () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties("Custom::AWSCDKOpenIdConnectProvider", {
      Url: "https://token.actions.githubusercontent.com",
      ClientIDList: ["sts.amazonaws.com"],
    });
  });

  test("IAM role with multiple branch patterns exists", () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::IAM::Role", {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
              StringEquals: {
                "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
                "token.actions.githubusercontent.com:sub": [
                  "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
                  "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/develop",
                ],
              },
            },
            Effect: "Allow",
          },
        ],
      },
    });
  });

  test("IAM role with single branch pattern exists", () => {
    const template = Template.fromStack(stackWithSingleBranchPattern);

    template.hasResourceProperties("AWS::IAM::Role", {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
              StringEquals: {
                "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
                "token.actions.githubusercontent.com:sub": [
                  "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
                ],
              },
            },
            Effect: "Allow",
          },
        ],
      },
    });
  });
});

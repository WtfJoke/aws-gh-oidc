import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ssm from "aws-cdk-lib/aws-ssm";

export interface GithubOIDCStackProps extends StackProps {
  projectName: string;
}

export class GithubOIDCStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOIDCStackProps) {
    super(scope, id, props);
    const { projectName } = props;

    const githubOIDCProvider = new iam.OpenIdConnectProvider(
      this,
      "GithubActions",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    const helloParameter = new ssm.StringParameter(this, "HelloParameter", {
      description: `Sample value for demo purpose of project ${projectName}`,
      parameterName: `hello_${projectName}`,
      stringValue: "Hi from aws :wave:",
    });
  }
}

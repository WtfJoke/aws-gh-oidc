import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ssm from "aws-cdk-lib/aws-ssm";

export interface GithubOIDCStackProps extends StackProps {
  projectName: string;
  allowedBranchPatternToPush: string[];
  audience: string;
}

export class GithubOIDCStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOIDCStackProps) {
    super(scope, id, props);
    const { projectName, allowedBranchPatternToPush, audience } = props;

    const githubOIDCProvider = new iam.OpenIdConnectProvider(
      this,
      "GithubActions",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    // Something to read for the pipeline :)
    const helloParameter = new ssm.StringParameter(this, "HelloParameter", {
      description: `Sample value for demo purpose of project ${projectName}`,
      parameterName: `hello_${projectName}`,
      stringValue: "Hi from aws :wave:",
    });

    const githubActionsRole = new iam.Role(this, "GithubActionsRole", {
      // Trust policy
      assumedBy: new iam.WebIdentityPrincipal(
        githubOIDCProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            // Only allow tokens issued by aws-actions/configure-aws-credentials
            "token.actions.githubusercontent.com:aud": audience,
            // Only allow specified branches to assume this role
            "token.actions.githubusercontent.com:sub":
              allowedBranchPatternToPush,
          },
        }
      ),
      roleName: "aws-gh-oidc", // same as in .github/workflows/hello.yml
      description: `Role to assume from github actions pipeline of ${projectName}`,
    });

    // Permission policy
    helloParameter.grantRead(githubActionsRole);
  }
}

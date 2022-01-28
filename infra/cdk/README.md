# AWS Github OIDC Connection

This is a cdk project to deploy Github OIDC Provider in order to have access to aws resources from Github Actions using the official `aws-actions/configure-aws-credentials@v1` action. In this example an SSM Parameter with the name `hello_aws-gh-oidc` is created.

## Initialize project

1. `npm install`
2. If you have never used cdk, please run `cdk bootstrap`
3. Deploy it using `cdk deploy`

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

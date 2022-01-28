# AWS Github OIDC Connection

This is a cdk project to deploy Github OIDC Provider in order to have access to aws resources from Github Actions using the official `aws-actions/configure-aws-credentials@v1` action. In this example an SSM Parameter with the name `hello_aws-gh-oidc` is created.

## Initialize project / Setup Infrastructure

1. Change to this folder
2. `npm install`
3. If you have never used cdk, please run `cdk bootstrap`
4. Deploy it using `cdk deploy`

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Destroy infrastructure

1. Run `cdk destroy` in this folder

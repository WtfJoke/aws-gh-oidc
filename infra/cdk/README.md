# Aws Github Oidc Connection

This is a cdk project to deploy Github OIDC Provider including policies in order to have access from Github Actions using the official `aws-actions/configure-aws-credentials@v1` action.

## Initialize project

1. `npm install`
2. Adjust aws account id in `cdk.ts`
3. If you have never used cdk, please run `cdk bootstrap`
4. Deploy it using `cdk deploy`

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

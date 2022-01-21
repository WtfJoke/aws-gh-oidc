# Infrastructure

Following infrastructure is created:

- Github as Identity Provider in AWS (To allow a secure communication between Github and AWS)
- A parameter (`hello_aws-gh-oidc`) in the AWS Parameter Store for demo purpose to print during the build/greeting job
- A role to be assumed by the [github action](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role) `aws-actions/configure-aws-credentials@v1`
  - Permission-Policy to allow reading the above mentioned parameter
  - Trust-Policy to allow assuming the role only from a certain set of branches (e.g main)

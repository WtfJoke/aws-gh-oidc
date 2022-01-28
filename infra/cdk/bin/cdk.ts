#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GithubOIDCStack } from "../lib/github-oidc-stack";

const app = new cdk.App();
const projectName = "aws-gh-oidc";
new GithubOIDCStack(app, "GithubOIDCStack", {
  projectName,
  // What matches this rule can assume the role - Be careful and make sure you include your repositories name
  allowedBranchPatternToPush: "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
  env: {
    region: "eu-central-1",
  },
  tags: {
    project: projectName,
    repoLink: "https://github.com/WtfJoke/aws-gh-oidc",
  },
});

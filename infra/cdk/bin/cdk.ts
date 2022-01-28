#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GithubOIDCStack } from "../lib/github-oidc-stack";

const app = new cdk.App();
new GithubOIDCStack(app, "GithubOIDCStack", {
  projectName: "aws-gh-oidc",
  env: {
    account: "589918074230",
    region: "eu-central-1",
  },
});

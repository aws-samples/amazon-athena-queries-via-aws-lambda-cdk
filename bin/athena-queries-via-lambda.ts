#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AthenaQueriesViaLambdaStack } from '../lib/athena-queries-via-lambda-stack';

const app = new cdk.App();
new AthenaQueriesViaLambdaStack(app, 'AthenaQueriesViaLambdaStack');
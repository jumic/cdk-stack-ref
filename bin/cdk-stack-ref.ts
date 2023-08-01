#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Stack1 } from '../lib/stack1';
import { Stack2 } from '../lib/stack2';

const app = new cdk.App();
const stack1 = new Stack1(app, 'Stack1', {
});

new Stack2(app, 'Stack2', {
  role: stack1.role,
});
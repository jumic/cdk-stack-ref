import * as cdk from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface MyStackProps extends cdk.StackProps {
  role: Role;
}

export class Stack2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MyStackProps) {
    super(scope, id, props);

    const table = new Table(this, 'MyTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    const myFunction = new NodejsFunction(this, 'MyFunction', {
      role: props.role,
      runtime: Runtime.NODEJS_18_X,
      entry: 'lib/dummy-handler.ts',
    })
    
    table.grantReadData(myFunction);
    // Error: 'Stack2' depends on 'Stack1' ({Stack2/MyFunction/Resource}.addDependency({Stack1/Role/Resource}),
    // {Stack2/MyFunction/Resource}.addDependency({Stack1/Role/DefaultPolicy/Resource})).
    // Adding this dependency (Stack1 -> Stack2/MyTable/Resource.Arn) would create a cyclic reference.

  }
}

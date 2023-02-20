import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_iam } from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda';
 

export class AthenaQueriesViaLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const REGION = cdk.Stack.of(this).region
    const ACCOUNT = cdk.Stack.of(this).account
    
    const INPUT_S3_BUCKET = "pizza-sfo" //TODO (name of input S3 bucket)
    const S3_INPUT_PATH = "pizza_sales" //TODO (name of parent S3 folder within INPUT_S3_BUCKET containing data files)
    const OUTPUT_S3_BUCKET = "pizza-sfo" //TODO (name of output S3 bucket)
    const S3_OUTPUT_PATH = "athena_output" //TODO (name of S3 folder within OUTPUT_S3_BUCKET to save output query files)
    const GLUE_DATABASE_NAME = "output_crawler" //TODO
    const ATHENA_WORKGROUP = "primary" //TODO
    const EXAMPLE_SQL_QUERY = "SELECT * FROM order_details" //TODO

    const lambda_queryAthena = new lambda.Function(this, 'queryAthena', {
      runtime: lambda.Runtime.PYTHON_3_8,    
      code: lambda.Code.fromAsset('resources/lambda'),
      handler: 'queryAthena.lambda_handler',
      environment: { 
        'OUTPUT_S3_BUCKET': `s3://${OUTPUT_S3_BUCKET}/${S3_OUTPUT_PATH}/`,
        'DATABASE': GLUE_DATABASE_NAME,
        'ATHENA_WORKGROUP': ATHENA_WORKGROUP,
        "QUERY_STRING": EXAMPLE_SQL_QUERY
      }
    });

    lambda_queryAthena.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: [
          "athena:StartQueryExecution",
           "athena:GetQueryExecution",
           "glue:GetTable",
           "s3:ListBucket",
           "s3:GetObject",
           "s3:PutObject",
           "s3:GetBucketLocation",
           "s3:ListMultipartUploadParts",
           "logs:CreateLogGroup",
           "logs:CreateLogStream",
           "logs:PutLogEvents",
        ],
        resources: [
          `arn:aws:s3:::${INPUT_S3_BUCKET}`,
          `arn:aws:s3:::${OUTPUT_S3_BUCKET}`,
          `arn:aws:s3:::${INPUT_S3_BUCKET}/${S3_INPUT_PATH}/*`,
          `arn:aws:s3:::${OUTPUT_S3_BUCKET}/${S3_OUTPUT_PATH}/*`,
          `arn:aws:athena:${REGION}:${ACCOUNT}:workgroup/${ATHENA_WORKGROUP}`,
          `arn:aws:glue:${REGION}:${ACCOUNT}:table/${GLUE_DATABASE_NAME}/*`,
          `arn:aws:glue:${REGION}:${ACCOUNT}:catalog`,
          `arn:aws:glue:${REGION}:${ACCOUNT}:database/${GLUE_DATABASE_NAME}`,
          `arn:aws:logs:${REGION}:${ACCOUNT}:*`,
          `arn:aws:logs:${REGION}:${ACCOUNT}:log-group:/aws/lambda/queryathena:*`,
        ]
      }));
  }
}

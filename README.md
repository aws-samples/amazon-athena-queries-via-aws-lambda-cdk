## Amazon Athena Queries via AWS Lambda CDK

This architecture showcases how Amazon Athena SQL queries can be executed via AWS Lambda using the Boto3 API. Additionally, this architecture can be fully deployed using AWS CDK and is designed to fit into a larger serverless architecture. The CDK stack configures and deploys a Lambda function with the appropriate IAM permissions to make Athena SQL queries on an S3 bucket. The query results can then be found in an S3 output bucket specified by the user. This architecture can be used if Athena queries need to be run on a regular, scheduled basis.

## Prerequistes and limitations

### Prerequistes
- An active AWS account
- An Amazon Simple Storage Service (Amazon S3) with pre-existing data
  - Data to be queried by Athena should be available in an S3 bucket.
- Amazon S3 data is cataloged via AWS Glue
  - This can be done using a Glue crawler. For more information regarding this, refer to [Using AWS Glue to connect to data sources in Amazon S3](https://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html) from the Amazon Athena documentation.
- Default output S3 bucket for Amazon Athena has been set
  - Before running any queries in Athena, an output S3 bucket location in the same region must be set in Athena settings. For more information regarding this, refer to [Specifying a query result location](https://docs.aws.amazon.com/athena/latest/ug/querying.html#query-results-specify-location) from the Amazon Athena documentation.
- Amazon Athena workgroup
  - If you do not have an existing Athena workgroup to use for querying, follow [Setting up workgroups](https://docs.aws.amazon.com/athena/latest/ug/workgroups-procedure.html) from the Amazon Athena documentation. We recommend using a workgroup that only has access to the tables used in the query.
- Familiarity with deploying AWS resources using AWS CDK.
  - For more information regarding this, refer to the [AWS CDK Workshop](https://cdkworkshop.com/).
  
## Architecture

### Target technology stack
- **S3 bucket (prerequisite)** — contains data to be queries
- **Lambda function** — executes Athena SQL queries via Boto3 API
- **IAM role for Lambda function** — Lambda execution role with the proper permissions to query S3 via Athena and save results to specified S3 location. This role contains an access policy that follows the principal of least-privilege

### Target architecture
![Architecture Diagram](/architecture_diagram.png "Architecture Diagram")

- **Note:** For simplicity, the input and output buckets are configured to be the same in this pattern. However, the user can optionally specify separate input and output buckets in the CDK code.

### Automation and scale
AWS Lambda can be run on-demand or can be configured to [run on a schedule using CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html).

## Getting started

### Step 1. Clone Github repository
Clone this repo and configure the `//TODO` portions of the code found in *lib/athena-queries-via-lambda-stack.ts* with proper variables from your AWS environment

### Step 2. Build the CDK app
Navigate to the root folder of the code files and run the following:

  ```
  npm install -g aws-cdk
  npm install
  npm run build
  ```

This will install the necessary AWS CDK, then this example's dependencies, and then build your TypeScript files and your CloudFormation template.

**Note:** The root folder should contain the `cdk.json` file

### Step 3. Deploy the CDK app
This stack uses assets, so the toolkit stack must be deployed to the environment. This can be done by running the following command:


## Tools
- [Amazon Simple Storage Service (Amazon S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) — used for data storage
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) — serverless compute service, makes the API call to Athena
- [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) — software development framework used to provision cloud resource
- [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html) (indirectly) — serverless, interactive analytics service, executes SQL query on S3
- [AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html) (prerequisite) — data catalog of available data, contains metadata for tables queried by Athena


## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.


#!/usr/bin/python3.7

import json
import boto3
import os

client = boto3.client('athena')

OUTPUT_S3_BUCKET = os.environ.get('OUTPUT_S3_BUCKET')
ATHENA_DATABASE = os.environ.get('DATABASE')
ATHENA_WORKGROUP = os.environ.get('ATHENA_WORKGROUP')
QUERY_STRING = os.environ.get('QUERY_STRING')

def lambda_handler(event, context):
    queryStart = client.start_query_execution(
        QueryString = QUERY_STRING,
        QueryExecutionContext = {'Database': ATHENA_DATABASE}, 
        ResultConfiguration = { 'OutputLocation': OUTPUT_S3_BUCKET},
        WorkGroup = ATHENA_WORKGROUP
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps(f'Successfully ran query and saved to {OUTPUT_S3_BUCKET}!')
    }

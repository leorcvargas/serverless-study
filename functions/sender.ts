import { APIGatewayProxyHandler } from 'aws-lambda';
import { SQS } from 'aws-sdk';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const sqs = new SQS();

  const accountId = context.invokedFunctionArn.split(':')[4];
  const queueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/StudyQueue`;
  const queueParams = {
    MessageBody: event.body,
    QueueUrl: queueUrl,
  };

  try {
    const data = await sqs.sendMessage(queueParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sent to ${queueUrl}`,
        messageId: data.MessageId,
      }),
    };
  } catch (error) {
    console.log(`Failed to send message: ${error}`);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
}
import { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event, _context) => {
  console.log(`Event: ${JSON.stringify(event)}`);

  const body = event.Records[0].body;

  console.log(`Text: ${JSON.parse(body).text}`);
};
import handler from './util/handler';
import dynamoDb from './util/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME!,
    // 'Key' 삭제할 데이터의 키값 정의
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id, // 노트 ID
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});

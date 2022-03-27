import handler from './util/handler';
import dynamoDb from './util/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME!,
    // 'Key' 수정하기 위해 수정해야 할 데이터의 Key를 정의
    Key: {
      userId: '123', // 사용자 ID
      noteId: event.pathParameters.id, // 노트 ID
    },
    // 'UpdateExpression' 업데이트 할 필드 정의
    // 'ExpressionAttributeValues' 업데이트할 값을 정의
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    // 'ReturnValues' 이 설정에 따라 업데이트된 후 어떤 값을 돌려줄 지 설정가능
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});

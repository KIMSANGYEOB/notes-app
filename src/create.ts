import * as uuid from 'uuid';
import handler from './util/handler';
import dynamoDb from './util/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(), // 메모를 생성할 때 생성되는 고유ID (uuid 라이브러리 사용)
      content: data.content, // event.body 쪽에서 받은 정보
      attachment: data.attachment, // event.body 쪽에서 받은 정보
      createdAt: Date.now(), // 생성된 시간
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

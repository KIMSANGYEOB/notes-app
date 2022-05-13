import * as sst from '@serverless-stack/resources';
import { ApiAuthorizationType } from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope: sst.App, id: string, props?: any) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, 'api-sykim', {
      defaultAuthorizationType: ApiAuthorizationType.AWS_IAM,
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      cors: true,
      routes: {
        'POST /notes': 'src/create.main', // 메모 생성 API
        'GET /notes/{id}': 'src/get.main', // 메모 조회 API
        'GET /notes': 'src/list.main', // 메모 목록 조회 API
        'PUT /notes/{id}': 'src/update.main', // 메모 수정 API
        'DELETE /notes/{id}': 'src/delete.main', // 메모 삭제 API
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}

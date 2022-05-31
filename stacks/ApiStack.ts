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
        'POST /notes': 'src/create.main',
        'GET /notes/{id}': 'src/get.main',
        'GET /notes': 'src/list.main',
        'PUT /notes/{id}': 'src/update.main',
        'DELETE /notes/{id}': 'src/delete.main',
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}

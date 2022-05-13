import * as sst from '@serverless-stack/resources';
import StorageStack from './StorageStack';
import ApiStack from './ApiStack';
import AuthStack from './AuthStack';
import FrontendStack from './FrontendStack';

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, 'storage-sykim');

  const apiStack = new ApiStack(app, 'api-sykim', {
    table: storageStack.table,
  });

  const authStack = new AuthStack(app, 'auth', {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });

  new FrontendStack(app, 'frontend-sykim', {
    api: apiStack.api,
    auth: authStack.auth,
    bucket: storageStack.bucket,
  });
}

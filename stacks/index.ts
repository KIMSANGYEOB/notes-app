// stacks/index.ts
import * as sst from '@serverless-stack/resources';
import StorageStack from './StorageStack';
import ApiStack from './ApiStack';
import AuthStack from './AuthStack';

export default function main(app: sst.App): void {
  // 두번째 인자에 본인 이름이나 이니셜로 생성해주자
  // ex) storage-sykim
  const storageStack = new StorageStack(app, 'storage-sykim');

  // 두번째 인자에 본인 이름이나 이니셜로 생성해주자
  // ex) api-sykim
  const apiStack = new ApiStack(app, 'api-sykim', {
    table: storageStack.table,
  });

  // 두번째 인자에 본인 이름이나 이니셜로 생성해주자
  // ex) auth-sykim
  new AuthStack(app, 'auth', {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
}

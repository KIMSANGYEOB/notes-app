// stacks/index.ts
import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app: sst.App): void {
  // 두번째 인자에 본인 이름이나 이니셜로 생성해주자
  // ex) storage-sykim
  const storageStack = new StorageStack(app, "storage-sykim");

  // 두번째 인자에 본인 이름이나 이니셜로 생성해주자
  // ex) api-sykim
  new ApiStack(app, "api-sykim", {
    table: storageStack.table,
  });
}
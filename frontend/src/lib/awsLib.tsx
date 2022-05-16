import { Storage } from "aws-amplify";

export async function s3Upload(file: any): Promise<string> {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function s3Delete(key: any): Promise<void> {
  await Storage.vault.remove(key, { level: 'private' });
}
import fs from 'fs';
import path from 'path';

export class Helpers {
  static async saveFile(fileBlob: any, fileContentType: any): Promise<string> {
    // const uploadDir = path.join(os.homedir(), 'uploads', 'asmarya');
    const uploadDir = '/mnt/hqa-files/';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(fileBlob, 'base64');
    const extension = fileContentType.split('/')[1];
    const fileName = `${Date.now()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return fileName;
  }
}

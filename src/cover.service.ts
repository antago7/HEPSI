import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

const execPromise = promisify(exec);

@Injectable()
export class CoverService {
  private s3 = new AWS.S3();

  async generateCover(bookKey: string): Promise<string> {
    try {
      const localPdfPath = `/tmp/${bookKey}`;
      const localCoverPath = `/tmp/${bookKey.split('.')[0]}_cover.jpg`;

      const pdfData = await this.s3.getObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: bookKey,
      }).promise();
      fs.writeFileSync(localPdfPath, pdfData.Body as Buffer);

      await execPromise(`pdftoppm -f 1 -l 1 -jpeg ${localPdfPath} ${localCoverPath.replace('.jpg', '')}`);

      const coverData = fs.readFileSync(localCoverPath);
      const coverKey = `${bookKey.split('.')[0]}_cover.jpg`;
      await this.s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: coverKey,
        Body: coverData,
        ContentType: 'image/jpeg',
      }).promise();

      fs.unlinkSync(localPdfPath);
      fs.unlinkSync(localCoverPath);

      return this.s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: coverKey,
        Expires: 60 * 60,
      });
    } catch (error) {
      console.error('Error generating cover:', error);
      throw new InternalServerErrorException('Error generating cover');
    }
  }
}

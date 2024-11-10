import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const execPromise = promisify(exec);

@Injectable()
export class CoverService {
  private s3 = new AWS.S3();

  async generateCover(bookKey: string): Promise<string> {
    // Объявляем переменные на уровне метода
    const tempDir = os.tmpdir();
    const localPdfPath = path.join(tempDir, bookKey);
    const localCoverPath = path.join(tempDir, `${bookKey.split('.')[0]}_cover.jpg`);

    try {
      // Шаг 1: Скачать PDF с S3
      const pdfData = await this.s3.getObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: bookKey,
      }).promise();

      if (!pdfData.Body) {
        throw new NotFoundException('PDF file not found in S3.');
      }

      // Шаг 2: Сохранить PDF на локальном диске
      fs.writeFileSync(localPdfPath, pdfData.Body as Buffer);

      // Шаг 3: Сгенерировать обложку с помощью pdftoppm
      const command = `pdftoppm -f 1 -l 1 -jpeg ${localPdfPath} ${localCoverPath.replace('.jpg', '')}`;
      await execPromise(command);

      // Шаг 4: Проверить, была ли сгенерирована обложка
      if (!fs.existsSync(localCoverPath)) {
        throw new InternalServerErrorException('Error generating cover image.');
      }

      // Шаг 5: Загрузить обложку на S3
      const coverData = fs.readFileSync(localCoverPath);
      const coverKey = `${bookKey.split('.')[0]}_cover.jpg`;

      await this.s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: coverKey,
        Body: coverData,
        ContentType: 'image/jpeg',
      }).promise();

      // Шаг 6: Очистить локальные файлы
      fs.unlinkSync(localPdfPath);
      fs.unlinkSync(localCoverPath);

      // Шаг 7: Вернуть подписанный URL для обложки
      return this.s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: coverKey,
        Expires: 60 * 60, // URL истекает через 1 час
      });
    } catch (error) {
      console.error('Error generating cover:', error);
      // Убедимся, что файлы удаляются даже в случае ошибки
      if (fs.existsSync(localPdfPath)) fs.unlinkSync(localPdfPath);
      if (fs.existsSync(localCoverPath)) fs.unlinkSync(localCoverPath);
      throw new InternalServerErrorException('Error generating cover');
    }
  }
}

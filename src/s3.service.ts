import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';


@Injectable()
export class S3Service {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async getBook(bookKey: string): Promise<Buffer> {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: bookKey,
            };
            const command = new GetObjectCommand(params);
            const data = await this.s3.send(command);

            const chunks: Uint8Array[] = [];
            const stream = data.Body as ReadableStream;
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('Error fetching book:', error);
            throw new InternalServerErrorException('Error fetching book');
        }
    }

    async listBooks(): Promise<string[]> {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
            };
            const command = new ListObjectsV2Command(params);
            const data = await this.s3.send(command);

            return data.Contents?.map(item => item.Key) ?? [];
        } catch (error) {
            console.error('Error listing books:', error);
            throw new InternalServerErrorException('Error listing books');
        }
    }
}

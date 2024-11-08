import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service { 
    private s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    async getBook(bookKey: string): Promise<Buffer> {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: bookKey,
            };
            const data = await this.s3.getObject(params).promise();
            return data.Body as Buffer;
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
            const data = await this.s3.listObjectsV2(params).promise();
            return data.Contents.map((item) => item.Key);
        } catch (error) {
            console.error('Error listing books:', error);
            throw new InternalServerErrorException('Error listing books');
        }
    }
}

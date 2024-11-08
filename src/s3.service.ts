import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk" ;

@Injectable()
export class S3service{ 
    private s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    async getBook(bookKey: string): Promise<Buffer> {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: bookKey,
        };
        const data = await this.s3.getObject(params).promise();
        return data.Body as Buffer;
    }
    async listBook(): Promise<string[]> {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
        };
        const data = await this.s3.listObjectsV2(params).promise();
        return data.Contents.map((item) => item.Key);
    }
}

import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { S3Service } from '../s3.service'; 
import { CoverService } from '../cover.service'; 

@Module({
  controllers: [BookController], 
  providers: [S3Service, CoverService], 
})
export class BookModule {}

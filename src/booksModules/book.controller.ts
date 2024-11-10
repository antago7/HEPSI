import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { S3Service } from '../single-services/s3.service'; 
import { CoverService } from '../single-services/cover.service'; 
import { Response } from 'express'; 

@Controller('books')
export class BookController {
  constructor(
    private readonly s3Service: S3Service, 
    private readonly coverService: CoverService, 
  ) {}

  @Get()
  async listBooks() {
    try {
      const books = await this.s3Service.listBooks(); 
      return books;
    } catch (error) {
      throw new HttpException('Error listing books', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':bookKey')
  async getBook(@Param('bookKey') bookKey: string, @Res() res: Response) {
    try {
      const decodedKey = decodeURIComponent(bookKey); 
      const data = await this.s3Service.getBook(decodedKey);
      res.set({
        'Content-Type': data.ContentType || 'application/octet-stream', 
        'Content-Disposition': `inline; filename="${decodedKey.split('/').pop()}"`, 
      });
      res.send(data.Body); 
    } catch (error) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND); 
    }
  }

  @Get(':bookKey/cover')
  async getBookCover(@Param('bookKey') bookKey: string, @Res() res: Response) {
    try {
      const coverUrl = await this.coverService.generateCover(bookKey);
      res.json({ coverUrl });
    } catch (error) {
      throw new HttpException('Error generating cover', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }
}

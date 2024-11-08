import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly s3Service: S3Service) {}

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
      const bookBuffer = await this.s3Service.getBook(bookKey);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${bookKey}"`,
      });
      res.send(bookBuffer);
    } catch (error) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }
}

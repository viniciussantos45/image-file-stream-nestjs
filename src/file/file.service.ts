import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import mime from 'mime-types';
import { join } from 'path';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private repository: Repository<File>,
  ) {}

  async upload(file: Express.Multer.File): Promise<File> {
    const extension = mime.extension(file.mimetype) as string;

    if (!['png', 'jpg'].includes(extension)) {
      throw new HttpException(
        'É permitido apenas upload de imagens .jpg ou .png !',
        HttpStatus.BAD_REQUEST,
      );
    }

    const file_created = this.repository.create({
      filename: file.filename,
    });

    return await this.repository.save(file_created);
  }

  getImage(filename: string): string {
    return join(process.cwd(), 'userfiles', filename);
  }
}

import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { File } from './file.entity';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'userfiles' }))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.filesService.upload(file);
  }

  @Get('image/:filename')
  @Header('Content-Type', 'image')
  getImage(@Param('filename') filename: string): StreamableFile {
    const file = this.filesService.getImage(filename);

    return new StreamableFile(createReadStream(file));
  }
}

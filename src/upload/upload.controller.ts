import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';

@ApiTags('Upload-Image')
@Controller('upload')
export class UploadController {
  @ApiOperation({ summary: 'Upload a files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        },

        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { file: file.filename };
  }
}
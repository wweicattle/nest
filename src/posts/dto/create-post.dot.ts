import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// dto/create-post.dot.ts

export class CreatePostDto {

  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '缺少文章标题必填' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}

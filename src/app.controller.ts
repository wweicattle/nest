import { Controller, Get, Redirect, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '基本获取文章!' })
  @Get()
  @Redirect('https://nestjs.com', 301)
  getHello(): string {
    return this.appService.getHello();
  }

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post('list')
  create(): string {
    return 'list';
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser(app) {
    console.log(app);

    return 'getUser';
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }
}

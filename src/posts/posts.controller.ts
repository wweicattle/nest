import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dot';
import * as nodemail from 'nodemailer';
import EMAIL from './config';
const EMAILs = EMAIL.EMAIL;

export class Email {
  // ...
  private transporter = null;
  constructor() {
    this.transporter = nodemail.createTransport({
      host: EMAILs.host,
      port: EMAILs.port,
      secure: EMAILs.secure,
      auth: {
        user: EMAILs.user,
        pass: EMAILs.pass,
      },
    });
    // ...
  }
  // 发送验证码的方法
  send({ email, subject = 'WEBXUE', html }) {
    const code = Math.random().toString().slice(-6);
    const options = {
      from: `${EMAILs.alias}<${EMAILs.user}>`,
      to: email,
      subject,
      text: `验证码为${code}`,
      html: html + `验证码为${code}`,
    };
    console.log(this.transporter, 344);

    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log('邮件发送失败');
        console.log(error);
      } else {
        console.log('邮件发送成功');
        console.log(info);
      }
    });
  }
}
@Controller('posts')
export class PostsController {
  @ApiOperation({ summary: '创建文章' })
  @Post('list')
  create(@Body() post: CreatePostDto): Record<string, any> {
    return { code: 200, data: [] };
  }

  @Get('requestMail')
  getHello(): string {
    new Email().send({
      email: 'wuwei@taqu.cn',
      subject: 'wwcattle - 欢迎注册',
      html: '这是一条注册的信息<p>测试</p>',
    });
    return 'get';
  }
}

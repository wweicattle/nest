import { CreatePostDto } from './dto/create-post.dot';
export declare class Email {
    private transporter;
    constructor();
    send({ email, subject, html }: {
        email: any;
        subject?: string;
        html: any;
    }): void;
}
export declare class PostsController {
    create(post: CreatePostDto): Record<string, any>;
    getHello(): string;
}

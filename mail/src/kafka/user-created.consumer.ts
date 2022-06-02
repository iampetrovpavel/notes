import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import * as nodeMailer from 'nodemailer/lib/nodemailer'

@Injectable()
export class UserCreatedConsumer implements OnModuleInit {
    constructor(
        private  readonly consumerService: ConsumerService
    ) {}

    async onModuleInit() {
        await this.consumerService.consume({ topic: 'user.created'}, {
            autoCommit: true,
            eachMessage: async ({topic, partition, message})=>{
                const user = JSON.parse(message.value.toString())
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                let mailOptions = {
                    from: '"Test User" <iampetrovpavel@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: 'Wellcome!', // Subject line
                    text: 'Wellcome to awesome Notes App!', // plain text body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                console.log("CREATED USER ", user)
            }
        })
    }
}
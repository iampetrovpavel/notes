import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { ConsumerService } from './consumer.service';

@Injectable()
export class UserCreatedConsumer implements OnModuleInit {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private  readonly consumerService: ConsumerService
    ) {}

    async onModuleInit() {
        await this.consumerService.consume({ topic: 'user.created'}, {
            eachMessage: async ({topic, partition, message})=>{
                const user = JSON.parse(message.value.toString())
                const createdUser = await this.userModel.create(user)
                console.log("CREATED USER ", createdUser)
            },
            autoCommit: true,
        })
    }
}
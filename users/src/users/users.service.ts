import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/dto/user.dto';
import { ProducerServise } from 'src/kafka/producer.servise';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        // private producerService: ProducerServise
    ){}

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findOne({where: { id }});
    }

    async create(user: UserDto): Promise<User> {
        return await this.userModel.create<User>({...user});
    }

    async update(id: string, user: UserDto): Promise<any> {
        const [numberOfAffectedRows, [updatedPost]] = await this.userModel.update({ ...user }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await  this.userModel.findOne<User>({ where: { id } });
    }
}

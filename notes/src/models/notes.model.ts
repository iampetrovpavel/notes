import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Note extends Model {
    @Column
    title: string;

    @Column
    body: string;

    // @Column
    // userId: number;
}
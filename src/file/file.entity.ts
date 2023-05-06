import { IsString } from 'class-validator';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @IsString()
  url: string;

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  imageUrl(): void {
    this.url = `http://localhost:3000/file/image/${this.filename}`;
  }
}

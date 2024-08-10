import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ unique: true, nullable: true })
  username!: string;

  @Column({ unique: true, nullable: true })
  googleId!: string;  // Nuevo campo para almacenar el ID de Google
}

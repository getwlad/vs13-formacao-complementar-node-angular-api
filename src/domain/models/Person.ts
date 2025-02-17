import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import { Teacher } from "./";
import { Student } from "./";

@Table({
  tableName: "Person",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Person extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;
  @Column({
    type: DataType.ENUM("masculino", "feminino", "outros"),
    allowNull: false,
  })
  gender!: "masculino" | "feminino" | "outros";

  @HasOne(() => Teacher)
  teacher!: Teacher;

  @HasOne(() => Student)
  student!: Student;
}

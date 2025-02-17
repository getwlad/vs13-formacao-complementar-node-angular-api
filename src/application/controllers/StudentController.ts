import { Request, Response } from "express";
import { StudentService } from "../services/student/StudentService";
import { StudentDTO } from "../dto/student/StudentDTO";
import { StudentResponseDTO } from "../dto/student/StudentResponseDTO";
import { StudentRequestDTO } from "../dto/student/StudentRequestDTO";
import { StudentUpdateDTO } from "../dto/student/StudentUpdateDTO";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const matriculated = req.query.matriculate === "true";
      const active = req.query.active === "true";
      let params = {};
      if (!matriculated && req.query.matriculate) {
        params = { ...params, matriculated };
      } else if (matriculated && req.query.matriculate) {
        params = { ...params, matriculated };
      }
      if (req.query.active != undefined) {
        params = { ...params, active };
      }
      const students: StudentDTO[] =
        await this.studentService.getAllStudents(params);
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const student: StudentResponseDTO =
        await this.studentService.getStudentById(id);
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const studentData: StudentRequestDTO = req.body;
      const student: StudentResponseDTO =
        await this.studentService.createStudent(studentData);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      const student: StudentUpdateDTO = req.body;
      const updatedStudent: StudentResponseDTO =
        await this.studentService.updateStudent(id, student);
      res.json(updatedStudent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      await this.studentService.deleteStudent(id);
      res.json().sendStatus(200);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

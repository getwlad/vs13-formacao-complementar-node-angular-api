import { Router } from "express";
import { AuthenticationController } from "../../../application/controllers/AuthenticationController";
import UserValidationService from "../../../application/services/user/UserSchemaService";

const router = Router();
const authenticationController = new AuthenticationController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Autentica um usuário e gera um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida. Retorna o usuário e um token JWT.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post(
  "/login",
  UserValidationService.validateUserCreate,
  authenticationController.authenticate.bind(authenticationController)
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Cria um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
router.post(
  "/register",
  UserValidationService.validateUserCreate,
  authenticationController.createUser.bind(authenticationController)
);

export default router;

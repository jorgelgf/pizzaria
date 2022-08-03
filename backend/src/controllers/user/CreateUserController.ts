import { Request, Response } from "express";
import { CreateUSerService } from "../../services/user/CreateUserService";
class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUSerService = new CreateUSerService();
    const user = await createUSerService.execute({ name, email, password });
    return res.json(user);
  }
}

export { CreateUserController };

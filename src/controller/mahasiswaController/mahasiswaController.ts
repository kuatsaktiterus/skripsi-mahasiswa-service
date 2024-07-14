import { Request, Response } from "express";
import { ErrorHandler } from "../../error.handler";
import { MahasiswaService } from "../../service/mahasiswa.service";
import { ResponseController } from "../response.controller";

export class MahasiswaController {
  static async get(req: Request, res: Response) {
    try {
      const result = await MahasiswaService.get(req);
      res.status(200).send(ResponseController.response(res, result))
    } catch (error) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await MahasiswaService.getById(req)
      res.status(200).send(ResponseController.response(res, result))
    } catch (error: any) {
      if (error.message == "404") return ErrorHandler.catch(res, error, "Mata Kuliah not found", 404);
      return ErrorHandler.catch(res, error);
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const result = await MahasiswaService.post(req)
      res.status(201).send(ResponseController.response(res, result))
    } catch (error) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async put(req: Request, res: Response) {
    try {
      const result = await MahasiswaService.put(req)
      res.status(200).send(ResponseController.response(res, result))
    } catch (error) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async patch(req: Request, res: Response) {
    try {
      const result = await MahasiswaService.patch(req, res);
      res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      if (error.message == "password") return ErrorHandler.catch(res, error, "password is wrong", 400);
      return ErrorHandler.catch(res);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await MahasiswaService.delete(req)
      res.status(200).send(ResponseController.response(res, {
        message: "Success to delete data mahasiswa"
      }));
    } catch (error) {
      return ErrorHandler.catch(res, error);
    }
  }


}

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma-client";
import Jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  try {
    const decoded = Jwt.verify(
      String(token.replace("Bearer ", "")),
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        role: true,
        Mahasiswa: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      user &&
      (user.role === "ADMIN" ||
        (user.Mahasiswa &&
          user.Mahasiswa.id ===
            (req.body.id_mahasiswa || req.params.id_mahasiswa)))
    ) {
      return next();
    }

    return res.status(403).send({ message: "Unauthorized!" });
  } catch (error: any) {
    return res.status(401).send({ message: error.message || "Unauthorized!" });
  }
};

export default AuthMiddleware;

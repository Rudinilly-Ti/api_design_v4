import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {

  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username: username,
        password: await hashPassword(password),
      },
    });


    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    err.type = 'input'
    next(err)
  }


};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username
    },
  });

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'Invalid username or password' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
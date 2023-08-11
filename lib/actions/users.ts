import {prisma} from "../db";

interface CreateUserParams {
  email: string;
  name: string;
  age: number;
  isAdmin: boolean;
}

interface UpdateUserParams extends CreateUserParams {
  id: number;
}

export const createUser = async (data: CreateUserParams) => {
  return await prisma.user.create({
    data: {
      ...data,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({where: {id}});
};

export const updateUser = async (data: UpdateUserParams) => {
  const {id, ...rest} = data;
  return await prisma.user.update({where: {id}, data: rest});
};

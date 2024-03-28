import { prisma } from "../server";

export const findUserByEmail = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email_isDeleted: {
        email,
        isDeleted: false,
      },
    },
  });

export const getCollectionById = async (id: number) =>
  await prisma.collection.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

export const deleteColelctionById = async (id: number) =>
  await prisma.collection.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

export const deleteItemsByCollectionId = async (collectionId: number) => {
  await prisma.item.updateMany({
    where: {
      collectionId,
    },
    data: {
      isDeleted: true,
    },
  });
};

export const getSingleItem = async (id: number, tags: boolean) =>
  await prisma.item.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      tags: tags
        ? {
            select: {
              id: true,
              name: true,
            },
          }
        : false,
    },
  });

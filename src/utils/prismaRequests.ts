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
      collection: {
        select: {
          id: true,
          name: true,
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

export const getLikedItems = async (userId: number) =>
  await prisma.like.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      item: true,
    },
  });

export const getLikeItem = async (userId: number, itemId: number) =>
  await prisma.like.findFirst({
    where: {
      userId,
      itemId,
    },
  });

export const setItemLike = async (userId: number, itemId: number) => {
  await prisma.like.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      item: {
        connect: {
          id: itemId,
        },
      },
    },
  });
};

export const removeItemLike = async (userId: number, itemId: number) =>
  await prisma.like.deleteMany({
    where: {
      userId,
      itemId,
    },
  });

export const incrementItemLikes = async (itemId: number) =>
  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      likeCount: {
        increment: 1,
      },
    },
  });

export const decrementItemLikes = async (itemId: number) =>
  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      likeCount: {
        decrement: 1,
      },
    },
  });

import { Request, Response } from "express";

import { prisma } from "../../server";

const getTotalDbItems = async (tags: string[]) => {
  return prisma.item.count({
    where: {
      tags: tags.length
        ? {
            some: {
              name: {
                in: tags,
              },
            },
          }
        : undefined,
    },
  });
};

export const getItems = async (req: Request, res: Response) => {
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  const orderBy = req.query.order_by ? req.query.order_by : "createdAt";
  const orderDirection = req.query.order_direction ? req.query.order_direction : "desc";
  const quantity = req.query.quantity ? Number(req.query.quantity) : 15;
  const page = req.query.page ? Number(req.query.page) : 1;
  const collectionId = req.query.collection_id ? Number(req.query.collection_id) : undefined;

  const skip = (page - 1) * quantity;

  try {
    const totalDbItems = await getTotalDbItems(tags);
    const items = await prisma.item.findMany({
      where: {
        tags: tags.length
          ? {
              some: {
                name: {
                  in: tags,
                },
              },
            }
          : undefined,
        collectionId: collectionId ? collectionId : undefined,
        isDeleted: false,
      },
      orderBy: {
        [orderBy as keyof typeof prisma.item]: orderDirection,
      },
      take: quantity,
      skip: skip,
      include: {
        tags: true,
        author: {
          select: {
            username: true,
          },
        },
        collection: {
          select: {
            name: true,
          },
        },
        fields: true,
      },
    });

    res.status(200).json({
      status: req.__("success"),
      data: items,
      meta: {
        total: totalDbItems,
        last_page: Math.ceil(totalDbItems / quantity),
        current_page: page,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

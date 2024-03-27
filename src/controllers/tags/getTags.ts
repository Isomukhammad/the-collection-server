import { Request, Response } from "express";

import { prisma } from "../../server";

type Tag = {
  id: number;
  name: string;
};

const getTotalDbTags = async (name: string) =>
  prisma.tag.count({
    where: {
      name: {
        contains: name,
      },
    },
  });

const getDbTags = async (name: string, quantity: number, page: number) => {
  const skip = (page - 1) * quantity;

  return prisma.tag.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    take: quantity,
    skip: skip,
  });
};

export const getTags = async (req: Request, res: Response) => {
  const tags = req.query.name as string;
  const quantity = req.query.quantity ? Number(req.query.quantity) : 15;
  const page = req.query.page ? Number(req.query.page) : 1;
  const isUnique = req.query.is_unique ? req.query.is_unique : 0;

  const dbTags = await getDbTags(tags, quantity, page);
  const totalDbTags = await getTotalDbTags(tags);
  const lastPage = Math.ceil(totalDbTags / quantity);

  const uniqueTags = isUnique
    ? dbTags.reduce((acc: Tag[], tag) => {
        if (!acc.some((obj) => obj.name === tag.name)) {
          acc.push(tag);
        }
        return acc;
      }, [])
    : dbTags;

  res.status(200).json({
    data: uniqueTags,
    meta: {
      total: totalDbTags,
      last_page: lastPage,
      current_page: page,
    },
  });
};

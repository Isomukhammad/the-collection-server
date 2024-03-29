import { Request, Response } from "express";

import { prisma } from "../../server";
import { getSingleItem } from "../../utils/prismaRequests";

export const editItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, tags } = req.body as {
    name: string;
    tags: string[];
  };

  try {
    const item = await getSingleItem(Number(id), true);
    if (!item) return res.status(404).json({ error: req.__("not-found") });

    const itemTags = item.tags.map((tag) => tag.name);
    const tagsToRemove = itemTags.filter((tag) => !tags.includes(tag));
    const tagsToAdd = tags.filter((tag) => !itemTags.includes(tag));

    const tagsToConnect = [];
    for (const tagName of tagsToAdd) {
      let tag = await prisma.tag.findUnique({ where: { name: tagName } });
      if (!tag) {
        tag = await prisma.tag.create({ data: { name: tagName } });
      }
      tagsToConnect.push(tag);
    }

    if (tagsToRemove.length > 0 || tagsToConnect.length > 0) {
      await prisma.item.update({
        where: { id: Number(id) },
        data: {
          tags: {
            disconnect: tagsToRemove.length > 0 ? tagsToRemove.map((tag) => ({ name: tag })) : undefined,
            connect: tagsToConnect.length > 0 ? tagsToConnect.map((tag) => ({ id: tag.id })) : undefined,
          },
        },
      });
    } else {
      await prisma.item.update({
        where: { id: Number(id) },
        data: {
          name,
        },
      });
    }

    res.status(200).json({ status: req.__("success") });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

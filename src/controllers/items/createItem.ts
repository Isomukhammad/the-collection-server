import { Request, Response } from "express";

import { prisma } from "../../server";
import { IToken } from "../../types";
import { convertToType } from "../../utils/convertToType";
import { createTags } from "../../utils/createTags";
import { decodeJwt } from "../../utils/decodeJwt";

export const createItem = async (req: Request, res: Response) => {
  const { collection_id, name, tags, fields } = req.body as {
    collection_id: number;
    name: string;
    tags: string[];
    fields: { name: string; type: string; value: string }[];
  };

  const user = decodeJwt<IToken>(req.token as string);

  try {
    const newItem = await prisma.item.create({
      data: {
        collectionId: collection_id,
        name: name,
        authorId: user.id,
      },
    });

    if (fields && fields.length > 0) {
      for (const field of fields) {
        await prisma.field.create({
          data: {
            itemId: newItem.id,
            name: field.name,
            type: convertToType(field.type),
            value: field.value,
          },
        });
      }
    }

    if (!tags)
      res.status(201).json({
        status: req.__("success"),
        data: newItem,
      });

    const allTags = await createTags(tags);
    await prisma.item.update({
      where: { id: newItem.id },
      data: { tags: { connect: allTags.map((tag) => ({ id: tag.id })) } },
    });

    res.status(201).json({
      status: req.__("success"),
      data: newItem,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

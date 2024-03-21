import { Tag } from "@prisma/client";

import { prisma } from "../server";

const searchTagsInDb = async (tags: string[]): Promise<Tag[]> =>
  await prisma.tag.findMany({
    where: {
      name: {
        in: tags.map((tag) => tag),
      },
    },
  });

const createTagsInDb = async (tags: string[]) => {
  const newTags = [];
  for (const tagName of tags) {
    const newTag = await prisma.tag.create({
      data: { name: tagName },
    });
    newTags.push(newTag);
  }
  return newTags;
};

export const createTags = async (tags: string[]): Promise<Tag[]> => {
  const trimmedTags = tags.map((tag) => tag.trim());

  const existingTags = await searchTagsInDb(trimmedTags);
  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tags.filter((tag) => !existingTagNames.includes(tag));
  const newTags = await createTagsInDb(newTagNames);
  return [...existingTags, ...newTags];
};

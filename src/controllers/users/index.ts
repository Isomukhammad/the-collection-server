import { blockUsers } from "./blockUsers";
import { deleteUsers } from "./deleteUsers";
import { editPassword } from "./editPassword";
import { editUser } from "./editUser";
import { getAllUsers } from "./getAllUsers";
import { getUser } from "./getUser";
import { unblockUsers } from "./unblockUsers";

export const UsersController = {
  blockUsers,
  deleteUsers,
  editUser,
  editPassword,
  getAllUsers,
  getUser,
  unblockUsers,
};

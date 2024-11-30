import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user: User) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  return user;
});

export { removeUser };

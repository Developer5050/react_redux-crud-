import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create an action of createUser
export const createUser = createAsyncThunk(
  "createuser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://67a1138a5bcfff4fabe19973.mockapi.io/curd/Curd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Read an user action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://67a1138a5bcfff4fabe19973.mockapi.io/curd/Curd"
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://67a1138a5bcfff4fabe19973.mockapi.io/curd/Curd/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an updateUser
// export const updateUser = createAsyncThunk(
//   "updateUser",
//   async (data, { rejectWithValue }) => {
//     console.log("update data", data);

//     try {
//       const response = await fetch(
//         `https://67a1138a5bcfff4fabe19973.mockapi.io/curd/Curd/${data.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create user");
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://67a1138a5bcfff4fabe19973.mockapi.io/curd/Curd/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Fixed: Send actual data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],

    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const { id } = action.payload;

        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }

        console.log("delete action", action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the state
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;

import { auth, db } from '@/firebase/firebase';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


interface UserDataProps {
  id: string;
  email: string | null;
  username: string;
}

interface AuthState {
  user: UserDataProps | null;
  status: string;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

interface registerDataProps {
  email: string;
  password: string;
  username: string;
}

export const registerService = createAsyncThunk(
  "user/register",
  async (data: registerDataProps, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const user = userCredential.user;

      const userData: UserDataProps = {
        id: user.uid,
        email: user.email,
        username: data.username,
      };

      const userRef = doc(db,"users", user.uid)

      await setDoc(userRef,userData)

      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const loginService = createAsyncThunk("user/login", async(data: {email: string, password: string}, {rejectWithValue}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    const userData: UserDataProps = {
      id: user.uid,
      email: user.email,
      username: user.displayName || "",
    };

    return userData;
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed");
  }
})



const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataProps | null>) => {
      state.user = action.payload;
    },
    setLoading : (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerService.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerService.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    });
    builder.addCase(registerService.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(loginService.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginService.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    });
    builder.addCase(loginService.rejected, (state) => {
      state.status = 'failed';
    });
  },
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;

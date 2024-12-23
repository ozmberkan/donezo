import { db } from "@/firebase/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

interface NoteDataProps {
  id: string;
  title: string;
  description: string;
}

interface NoteState {
  notes: NoteDataProps[];
  note: NoteDataProps | null;
  status: string;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  note: null,
  status: "idle",
  error: null,
};

export const getAllNotes = createAsyncThunk("note/all", async (_, { rejectWithValue }) => {
  try {
    
    const notesRef = collection(db, "notes");

    const notesDoc = await getDocs(notesRef);

    const notesSnap = notesDoc.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notesSnap as NoteDataProps[];

  } catch (error:any) {
    return rejectWithValue(error.message || "Failed to fetch notes");
  }
})

export const getNoteDetailById = createAsyncThunk(
  "note/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const noteRef = doc(db, "notes", id);
      const noteSnap = await getDoc(noteRef);
      if (!noteSnap.exists()) {
        throw new Error("Note not found");
      }
      const noteData = noteSnap.data();

      return { id, ...noteData } as NoteDataProps;
    } catch (error: any) {
      return rejectWithValue(error.message || "Note not found");
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoteDetailById.pending, (state) => {
      state.status = "loading";
      state.error = null; 
    });
    builder.addCase(getNoteDetailById.fulfilled, (state, action) => {
      state.status = "success";
      state.note = action.payload;
      state.error = null; 
    });
    builder.addCase(getNoteDetailById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string; 
    });
    builder.addCase(getAllNotes.pending, (state) => {
      state.status = "loading";
      state.error = null; 
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.status = "success";
      state.notes = action.payload;
      state.error = null; 
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string; 
    });
  },
});

export default noteSlice.reducer;

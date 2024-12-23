"use client";
import { use, useEffect } from "react";
import { getNoteDetailById } from "@/redux/slices/noteSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const DetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const dispatch = useDispatch<AppDispatch>();
  const { note, status, error } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    if (id) {
      dispatch(getNoteDetailById(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error || "Failed to load the note"}</div>;
  }

  if (!note || Object.keys(note).length === 0) {
    return <div>Note not found.</div>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
    </div>
  );
};

export default DetailPage;

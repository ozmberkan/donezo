"use client";
import { use, useEffect } from "react";
import { getNoteDetailById } from "@/redux/slices/noteSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";

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
      <div className="p-3 rounded-md flex justify-center items-center min-h-screen">
        <p className="py-1 rounded-lg  text-sm font-medium flex items-center gap-x-2 text-neutral-600">
          <LoaderIcon size={16} className="animate-spin" />
          Veriler Yükleniyor..
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error || "Failed to load the note"}</div>;
  }

  return (
    <div>
      <h1>{note?.title}</h1>
      <p>{note?.description}</p>
    </div>
  );
};

export default DetailPage;

import { auth } from "@/firebase/firebase";
import { setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { Router } from "next/router";

export const authListener = (dispatch: AppDispatch, router: Router) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        id: user.uid,
        username: user.displayName || "Anonymous",
        email: user.email || "",
      };
      dispatch(setUser(userData));
    } else {
      router.push("/giris");
    }
  });
};

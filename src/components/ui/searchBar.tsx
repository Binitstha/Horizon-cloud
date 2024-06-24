"use client";

import FormControl from "@mui/joy/FormControl";
import Stack from "@mui/joy/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  DocumentData,
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";

export default function FreeSolo() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [folderList, setFolderList] = useState<DocumentData[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    if (email) {
      const q = query(
        collection(db, "folders"),
        where("createdBy", "==", email),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFolderList([]);
        const folders: DocumentData[] = [];
        snapshot.forEach((doc) => {
          folders.push({ ...doc.data(), id: doc.id });
        });
        setFolderList(folders);
      });

      return () => unsubscribe();
    }
  }, [email, db]);

  return (
    <div className="flex justify-start px-12 items-center p-7">
      <Stack spacing={2} sx={{ width: 900 }}>
        <FormControl id="free-solo-2-demo">
          <Autocomplete
            freeSolo
            disableClearable
            options={folderList.map((option) => ({
              label: option.name || "No title", // Add fallback for undefined titles
              id: option.id, // Use unique id as key
            }))}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search folders..."
                type="search"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
        </FormControl>
      </Stack>
    </div>
  );
}

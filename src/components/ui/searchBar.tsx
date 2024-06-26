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
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  search: string;
};

export default function FreeSolo() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [folderList, setFolderList] = useState<DocumentData[]>([]);
  const router = useRouter(); // Get router instance directly
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const db = getFirestore(app);

  useEffect(() => {
    if (email) {
      const q = query(
        collection(db, "folders"),
        where("createdBy", "==", email),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const folders: DocumentData[] = [];
        snapshot.forEach((doc) => {
          folders.push({ ...doc.data(), id: doc.id });
        });
        setFolderList(folders);
      });

      return () => unsubscribe();
    }
  }, [email, db]);

  const debouncedSetSearchValue = debounce((value: string) => {
    setValue("search", value);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchValue(event.target.value);
  };

  const onSubmit = (data: FormData) => {
    const selectedFolder = folderList.find(
      (folder) => folder.name === data.search,
    );
    if (selectedFolder) {
      router.push(`/folder/${selectedFolder.name}?id=${selectedFolder.id}`);
      console.log(selectedFolder.name);
    } else {
      router.push(`/folder/${data.search}`);
    }
  };

  return (
    <div className="flex justify-start lg:px-12 items-center lg:p-7 py-4 px-3 lg:ml-0 ml-14">
      <Stack
        spacing={2}
        sx={{
          width: { xs: "66%", sm: "500px", lg: "900px" },
        }}
      >
        <FormControl id="free-solo-2-demo">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  disableClearable
                  options={folderList.map((option) => ({
                    label: option.name || "No title",
                    id: option.id,
                  }))}
                  onChange={(event, value) => {
                    if (
                      typeof value === "object" &&
                      value !== null &&
                      "label" in value
                    ) {
                      setValue("search", value.label);
                    } else {
                      setValue("search", value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      placeholder="Search folder..."
                      type="search"
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e as React.ChangeEvent<HTMLInputElement>);
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaSearch className="lg:text-lg text-sm" />
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
              )}
            />
          </form>
        </FormControl>
      </Stack>
    </div>
  );
}

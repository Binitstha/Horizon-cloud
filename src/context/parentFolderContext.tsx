// parentFolderContext.tsx

import { createContext, Dispatch, SetStateAction } from "react";

export interface ParentFolderContextType {
  parentFolderId: string | null;
  setParentFolderId: Dispatch<SetStateAction<string | null>>;
}

const ParentFolderContext = createContext<ParentFolderContextType>({
  parentFolderId: null,
  setParentFolderId: () => {},
});

export default ParentFolderContext;

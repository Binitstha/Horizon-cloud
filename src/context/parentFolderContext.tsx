// parentFolderContext.tsx

import { createContext, Dispatch, SetStateAction } from 'react';

export interface ParentFolderContextType {
  parentFolderId: string;
  setParentFolderId: Dispatch<SetStateAction<string>>;
}

const ParentFolderContext = createContext<ParentFolderContextType>({
  parentFolderId: '',
  setParentFolderId: () => {}
});

export default ParentFolderContext;

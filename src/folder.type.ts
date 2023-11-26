export type TTreeNode = {
  id: string;
  type: 'folder' | 'file';
  name: string;
  isRoot?: boolean;
  nodes?: TTreeNode[];
};

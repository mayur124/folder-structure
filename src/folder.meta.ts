import { TTreeNode } from './folder.type';

export const treeData: TTreeNode = {
  id: '1',
  type: 'folder',
  name: 'root',
  isRoot: true,
  nodes: [
    {
      id: '13',
      type: 'folder',
      name: 'src',
      nodes: [
        {
          id: '131',
          type: 'folder',
          name: 'components',
          nodes: [],
        },
        {
          id: '132',
          type: 'folder',
          name: 'helpers',
          nodes: [],
        },
      ],
    },
    {
      id: '11',
      type: 'file',
      name: 'package.json',
    },
    {
      id: '12',
      type: 'file',
      name: 'package.lock.json',
    },
  ],
};

import { Node } from './Node';
import { treeData } from './folder.meta';
import './style.css';
import { useState } from 'react';
import { TTreeNode } from './folder.type';

export const App = () => {
  const [tree, setTree] = useState(treeData);

  const handleRemove = (targetNode: TTreeNode, parentNode: TTreeNode) => {
    if (parentNode.isRoot) {
      setTree((stateTree) => ({
        ...stateTree,
        nodes: stateTree.nodes.filter((node) => node.id !== targetNode.id),
      }));
    } else {
      const updatedTree = { ...tree };
      parentNode.nodes = parentNode.nodes!.filter(
        (node) => node.id !== targetNode.id
      );
      setTree(updatedTree);
    }
  };

  const handleNewFile = (targetNode: TTreeNode, fileName: string) => {
    const newFile: TTreeNode = {
      id: crypto.randomUUID(),
      name: fileName,
      type: 'file',
    };
    if (targetNode.isRoot) {
      setTree((stateTree) => {
        const updatedTree = {
          ...stateTree,
          nodes: stateTree.nodes ? [...stateTree.nodes, newFile] : [newFile],
        };
        updatedTree.nodes.sort((a, b) => {
          if (a.type === 'folder' && b.type === 'file') {
            return -1;
          }
          if (a.type === 'file' && b.type === 'folder') {
            return 1;
          }
          return 0;
        });
        return updatedTree;
      });
    } else {
      const updatedTree = { ...tree };
      targetNode.nodes!.push(newFile);
      targetNode.nodes.sort((a, b) => {
        if (a.type === 'folder' && b.type === 'file') {
          return -1;
        }
        if (a.type === 'file' && b.type === 'folder') {
          return 1;
        }
        return 0;
      });
      setTree(updatedTree);
    }
  };

  const handleNewFolder = (targetNode: TTreeNode, folderName: string) => {
    const newFolder: TTreeNode = {
      id: crypto.randomUUID(),
      name: folderName,
      type: 'folder',
      nodes: [],
    };
    if (targetNode.isRoot) {
      setTree((stateTree) => {
        const updatedTree = {
          ...stateTree,
          nodes: stateTree.nodes
            ? [...stateTree.nodes, newFolder]
            : [newFolder],
        };
        updatedTree.nodes.sort((a, b) => {
          if (a.type === 'folder' && b.type === 'file') return -1;
          if (a.type === 'file' && b.type === 'folder') return 1;
          return 0;
        });
        return updatedTree;
      });
    } else {
      const updatedTree = { ...tree };
      targetNode.nodes = targetNode.nodes
        ? [...targetNode.nodes, newFolder]
        : [newFolder];
      targetNode.nodes.sort((a, b) => {
        if (a.type === 'folder' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'folder') return 1;
        return 0;
      });
      setTree(updatedTree);
    }
  };

  const handleRename = (targetNode: TTreeNode, newName: string) => {
    console.count('handleRename created');
    if (targetNode.isRoot) {
      setTree((stateTree) => ({
        ...stateTree,
        name: newName,
      }));
    } else {
      const updatedTree = { ...tree };
      targetNode.name = newName;
      setTree(updatedTree);
    }
  };

  return (
    <Node
      node={tree}
      parentNode={null}
      onRemove={handleRemove}
      onNewFile={handleNewFile}
      onNewFolder={handleNewFolder}
      onRename={handleRename}
    />
  );
};

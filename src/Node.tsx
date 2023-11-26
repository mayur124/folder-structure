import { FC, useState } from 'react';
import { Actions } from './Actions';
import { TTreeNode } from './folder.type';

type TNodeProps = {
  node: TTreeNode;
  parentNode: TTreeNode | null;
  onRename: (node: TTreeNode, newName: string) => void;
  onRemove: (targetNode: TTreeNode, parentNode: TTreeNode) => void;
  onNewFolder: (node: TTreeNode, folderName: string) => void;
  onNewFile: (node: TTreeNode, fileName: string) => void;
};

export const Node: FC<TNodeProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul>
      <li>
        <div className="node-parent-wrapper">
          {props.node.type === 'folder' ? (
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {props.node.name}
            </button>
          ) : (
            <p>{props.node.name}</p>
          )}
          <Actions
            onNewFile={() => {
              const fileName = window.prompt('Enter FileName');
              if (fileName) {
                setIsOpen(true);
                props.onNewFile(props.node, fileName);
              }
            }}
            onNewFolder={() => {
              const folderName = window.prompt('Enter FolderName');
              if (folderName) {
                setIsOpen(true);
                props.onNewFolder(props.node, folderName);
              }
            }}
            onRename={() => {
              const name = window.prompt('Enter name');
              if (name) {
                props.onRename(props.node, name);
              }
            }}
            onRemove={() => props.onRemove(props.node, props.parentNode!)}
            showNewFile={props.node.type === 'folder'}
            showNewFolder={props.node.type === 'folder'}
            showRemove={!props.node.isRoot}
          />
        </div>
      </li>
      {isOpen && props.node.nodes?.length ? (
        <>
          {props.node.nodes.map((node) => (
            <Node
              {...props}
              key={node.id}
              node={node}
              parentNode={props.node}
            />
          ))}
        </>
      ) : null}
    </ul>
  );
};

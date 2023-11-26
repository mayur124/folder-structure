import { FC } from 'react';

type TActionsProp = {
  showNewFile: boolean;
  showNewFolder: boolean;
  showRemove: boolean;
  onRename: () => void;
  onNewFile: () => void;
  onNewFolder: () => void;
  onRemove: () => void;
};

export const Actions: FC<TActionsProp> = (props) => {
  return (
    <div className="folder-actions-wrapper">
      <button type="button" onClick={props.onRename} title="rename">
        ✏️
      </button>
      {props.showNewFile ? (
        <button type="button" onClick={props.onNewFile} title="new file">
          +📄
        </button>
      ) : null}
      {props.showNewFolder ? (
        <button type="button" onClick={props.onNewFolder} title="new folder">
          +📁
        </button>
      ) : null}
      {props.showRemove ? (
        <button type="button" onClick={props.onRemove} title="remove">
          ❌
        </button>
      ) : null}
    </div>
  );
};

import React, {FunctionComponent} from 'react';

export type LabelProps = {name: string; value: unknown};

export const Label: FunctionComponent<LabelProps> = ({name, value}) => {
  const labelValue = (value: unknown): string => {
    switch (typeof value) {
      case 'boolean':
        return value ? 'true' : 'false';
      case 'string':
        return `"${value}"`;
      default:
        return String(value);
    }
  };
  return (
    <div style={{textAlign: 'center', color: '#333'}}>
      <small>
        {name}={labelValue(value)}
      </small>
    </div>
  );
};

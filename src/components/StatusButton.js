import * as React from 'react';
import ProgressButton from './ProgressButton';
import OpenButton from './OpenButton';

export default function StatusButton(props) {
  const label = props.label.toUpperCase()
  if (label === 'IN_PROGRESS')
    return <ProgressButton label={'IN PROGRESS'} />
  else {
    return <OpenButton label={label} />
  }
}



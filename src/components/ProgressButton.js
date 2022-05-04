import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function ProgressButton(props) {
  const label = props.label.toUpperCase()
  return (
    <Box style={{
      width: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }}>
      <Button label={label}>{label}</Button>
      <BorderLinearProgress variant="determinate" value={50} />
    </Box>
  );
}

const BorderLinearProgress = styled(LinearProgress)(() => ({
  marginTop: '4px',
  width: 140,
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F0F2F5;',
    width: 180,
    height: 8,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FB9109;',
    width: 180,
    height: 8,
  },
}));

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 140px;
  padding: 6px 16px;
  color: #fff;
  border: 0;
  border-radius: 8px;
  background-color: #2D85EB;
`;


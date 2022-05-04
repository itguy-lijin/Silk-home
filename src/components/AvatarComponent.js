import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import styled from 'styled-components';

export default function AvatarComponent(props) {
  return (
    <Box style={{display:'flex', alignItems:'center'}}>
      <Avatar alt='star' src={props.image} />
      <Label>{props.label}</Label>
    </Box>
  );
}

const Label = styled.label`
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: lowercase;
`;


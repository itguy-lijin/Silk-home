import * as React from 'react';
import styled from 'styled-components';

export default function NumberButton(props) {
  const label = props.label
  return (
    <Button label={label}>{label}</Button>
  );
}

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
  min-width: 40px;
  padding: 6px 6px;
  color: #fff;
  border: 0;
  border-radius: 6px;
  background-color: #2D85EB;
  )}
`;


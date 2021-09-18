import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import { render } from '@testing-library/react';

test('component renders', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Button></Button>, root);
});

test('Renders button text correctly', () => {
  const {getByTestId} = render(<Button children="Test text button"></Button>)
  expect(getByTestId('button')).toHaveTextContent('Test text button')
});

 
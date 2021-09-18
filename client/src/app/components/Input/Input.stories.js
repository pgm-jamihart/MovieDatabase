import React from 'react';
import Input from './Input';

export default {
  title: 'Input',
  component : Input
}

export const Primary = () => <Input componentType='primary' placeholder='Primary' />
export const Secondary = () => <Input componentType='secondary' placeholder='Secondary'/>

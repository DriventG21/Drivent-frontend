import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function DateButton({ date, isSelected, clickHandler }) {
  const [color, setColor] = useState('#E0E0E0');

  useEffect(() => {
    if (isSelected) setColor('#FFD37D');
    else setColor('#E0E0E0');
  }, [isSelected]);

  return (
    <>
      <MyButton color={color} onClick={() => clickHandler(date)} >{date}</MyButton>
    </>
  );
}

const MyButton = styled.button`
  padding: 10px 25px;
  border-radius: 4px;
  background: ${props => props.color};
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #000000;
  text-align: center;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
`;

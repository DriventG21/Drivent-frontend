import styled from 'styled-components';
import Container from '../Container';

export const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const GithubButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 36.5px;
  margin-top: 8px;
  background-color: grey;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

export const GithubText = styled.span`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: white;
  display: flex;
`;

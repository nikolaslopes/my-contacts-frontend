import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 32px;
  border-radius: 4px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    margin-left: 8px;
  }

  & + & {
    margin-top: 12px;
  }
`;

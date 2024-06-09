import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .error-details {
    margin-left: 24px;

    strong {
      display: block;
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      margin-bottom: 8px;
    }
  }
`;

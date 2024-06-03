import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  border-radius: 4px;
  color: #ffffff;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant }) => containerVariants[variant] || containerVariants.default};

  strong {
    margin-left: 8px;
  }

  & + & {
    margin-top: 12px;
  }
`;

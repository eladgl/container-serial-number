/* ---------------- styled-components ---------------- */

import styled from 'styled-components';

import { TableContainer } from '@mui/material';

const StyledContainer = styled(TableContainer)`
  width: 100%;
  height: 400px;

  .ReactVirtualized__Table__row {
    padding: 0 !important;
  }

  .ReactVirtualized__Table__rowColumn {
    height: 100%;
  }
`;

const StyledRow = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &.row-even { background-color: #f5f5f5; }
  &.row-odd  { background-color: transparent; }
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Cell = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  min-width: 0;
`;

const IndexCell = styled(Cell)`
  width: 10%;
`;

const CodeCell = styled(Cell)`
  width: 70%;
`;

const ActionCell = styled(Cell)`
  width: 10%;

`;

const CopyCol = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndexCol = styled.div`
  width: 10%;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CodeCol = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
`;

export { 
    ActionCell,
    Cell,
    CodeCell,
    CopyCol,
    IndexCell,
    IndexCol,
    CodeCol,
    StyledContainer,
    StyledRow
};


import React, { useCallback } from 'react';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import { IconButton, Paper, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  StyledContainer,
  StyledRow,
  CopyCol,
  IndexCol,
  CodeCol,
} from './combinationResultsTableStyles';

const ROW_HEIGHT = 34;
const HEADER_HEIGHT = 34;

const CombinationsResultsTable = ({
  combinations = [],
  hasNextPage = false,
  isNextPageLoading = false,
  loadMore, // () => Promise<void> | void
}) => {
  // We render:
  // - header row at index 0
  // - data rows index 1..(combinations.length)
  // - if hasNextPage: one extra "loading row" to trigger InfiniteLoader
  const rowCount = 1 + combinations.length + (hasNextPage ? 1 : 0);

  const isRowLoaded = useCallback(
    ({ index }) => {
      if (index === 0) return true; // header always loaded

      const dataIndex = index - 1;
      return dataIndex < combinations.length;
    },
    [combinations.length],
  );

  const loadMoreRows = useCallback(() => {
    if (!loadMore || !hasNextPage || isNextPageLoading)
      return Promise.resolve();
    return Promise.resolve(loadMore());
  }, [loadMore, hasNextPage, isNextPageLoading]);

  const rowRenderer = ({ index, key, style }) => {
    // Header row
    if (index === 0) {
      return (
        <div key={key} style={style}>
          <StyledRow>
            <IndexCol># Num</IndexCol>
            <CodeCol>Code</CodeCol>
            <CopyCol>Action</CopyCol>
          </StyledRow>
        </div>
      );
    }

    const dataIndex = index - 1;
    const code = combinations[dataIndex];

    // "Loading row" (not loaded yet)
    if (code == null) {
      return (
        <div key={key} style={style}>
          <StyledRow>
            <IndexCol />
            <CodeCol style={{ opacity: 0.6 }}>
              {isNextPageLoading ? 'Loading…' : ''}
            </CodeCol>
            <CopyCol />
          </StyledRow>
        </div>
      );
    }

    return (
      <div key={key} style={style}>
        <StyledRow>
          <IndexCol>{dataIndex + 1}</IndexCol>
          <CodeCol>{code}</CodeCol>

          <CopyCol>
            <CopyToClipboard text={code}>
              <Tooltip title="Copy to clipboard">
                <IconButton size="small" sx={{ padding: 0.25 }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </CopyCol>
        </StyledRow>
      </div>
    );
  };

  return (
    <StyledContainer component={Paper}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            threshold={10} // start loading when near the end
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                width={width}
                height={height}
                rowHeight={ROW_HEIGHT}
                rowCount={rowCount}
                rowRenderer={rowRenderer}
                onRowsRendered={onRowsRendered}
                style={{ outline: 'none' }}
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </StyledContainer>
  );
};

export default CombinationsResultsTable;

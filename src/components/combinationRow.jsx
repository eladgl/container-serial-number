import { useState } from 'react';
import {
  Button,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const CombinationRow = ({
  isComboGot,
  hasNextPage,
  isNextPageLoading,
  onGetCombinations,
  onLoadMore,
}) => {
  const [initialBatchSize, setInitialBatchSize] = useState(500);
  const [loadMoreSize, setLoadMoreSize] = useState(200);

  const handleGetCombinations = () => {
    onGetCombinations(initialBatchSize);
  };

  const handleLoadMore = () => {
    onLoadMore(loadMoreSize);
  };

  return (
    <Stack direction="row" spacing={5} justifyContent="center">
      <FormControl>
        <InputLabel htmlFor="combination-limit"># of combinations</InputLabel>
        <OutlinedInput
          id="combination-limit"
          label="# of combinations"
          value={initialBatchSize}
          onChange={(e) => setInitialBatchSize(Number(e.target.value) || 0)}
        />
      </FormControl>

      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleGetCombinations}
      >
        Get Combinations
      </Button>

      {isComboGot && (
        <>
          <FormControl>
            <InputLabel htmlFor="load-more">Load More #</InputLabel>
            <OutlinedInput
              id="load-more"
              label="Load More #"
              value={loadMoreSize}
              onChange={(e) => setLoadMoreSize(Number(e.target.value) || 0)}
            />
          </FormControl>

          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={handleLoadMore}
            disabled={isNextPageLoading || !hasNextPage}
          >
            Load More
          </Button>
        </>
      )}
    </Stack>
  );
};

export default CombinationRow;

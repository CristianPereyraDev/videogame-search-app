import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import GameCard from '../Card';

describe('Calculator', () => {
  it('should render', () => {
    render(
      <GameCard
        game={{
          id: 1,
          name: 'My Game',
          description: '',
          released: '',
          image: '',
          rating: 5,
          genres: [],
          platforms: [],
        }}
      />
    );
  });
});

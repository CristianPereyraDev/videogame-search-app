import { IGame } from '../Card/Card';

export default function SearchResultList({ result }: { result: Array<IGame> }) {
  return (
    <ul className=''>
      {result.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
}

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Flashy</Link> <Link to="/catalog">Catalog</Link>{' '}
        <Link to="/decks">Decks</Link> <Link to="/stats">Stats</Link>{' '}
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  )
}

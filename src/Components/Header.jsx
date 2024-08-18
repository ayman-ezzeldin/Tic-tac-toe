import gameLogo from "../../public/game-logo.png" ;

const Header = () => {
  return (
    <>
      <header>
        <img src={gameLogo} alt="Game logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>
    </>
  )
}

export default Header
import { useNavigate } from "react-router-dom";

export default function Public() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <section className="public">
      <header>
        <h1>Welcome to Christina's Closet!</h1>
        <button onClick={handleRegisterClick}>Register</button>
        <br />
        <button onClick={handleLoginClick}>Log In</button>
      </header>
      <main>
        <p>A thrift store where you can find hidden treasures!</p>
      </main>
    </section>
  );
}

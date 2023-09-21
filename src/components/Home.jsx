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
        <h1>Welcome to Christina's List!</h1>
        <p>An online store where you can sell and purchase hidden treasures!</p>
        <button onClick={handleRegisterClick}>Register</button>
        <br />
        <button onClick={handleLoginClick}>Log In</button>
      </header>
      <main></main>
    </section>
  );
}

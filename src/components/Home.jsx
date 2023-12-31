import { useNavigate } from "react-router-dom";

export default function Public() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section className="public">
      <header>
        <h1>Welcome to Christina's List!</h1>
        <p>An online store where you can sell and purchase hidden treasures!</p>
        <button className="link-btn" onClick={handleRegisterClick}>
          New here? Create an account.
        </button>
      </header>
      <main></main>
    </section>
  );
}

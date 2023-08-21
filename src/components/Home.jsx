import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to Christina's Closet!</h1>
        <Link to="/login">Log In</Link>
      </header>
      <main>
        <p>
          Christina's Closet is a thrift store where you can find hidden
          treasures!
        </p>
      </main>
    </section>
  );
  return content;
};
export default Public;

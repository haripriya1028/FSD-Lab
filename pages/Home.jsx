import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to My Blog</h1>

      <p>
        Learn about web development, programming, and technology.
      </p>

      <Link to="/blog">
        <button>Read Blogs</button>
      </Link>
    </div>
  );
}

export default Home;
function Blog() {
  const blogs = [
    {
      title: "Bootstrap Basics",
      image: "https://picsum.photos/500/300?1",
      description: "Learn how Bootstrap helps create responsive websites."
    },
    {
      title: "CSS Tips",
      image: "https://picsum.photos/500/300?2",
      description: "Discover useful CSS tricks for better website design."
    },
    {
      title: "JavaScript Guide",
      image: "https://picsum.photos/500/300?3",
      description: "Understand JavaScript fundamentals."
    },
    {
      title: "Responsive Design",
      image: "https://picsum.photos/500/300?4",
      description: "Create websites that work on all devices."
    }
  ];

  return (
    <>
      <section className="blog-hero">
        <h1>Welcome to Our Blog</h1>

        <p>Learn web development with simple tutorials.</p>

        <button>Read Blogs</button>
      </section>

      <div className="blog-container">

        <div className="blog-posts">
          {blogs.map((blog, index) => (
            <div className="card" key={index}>
              <img src={blog.image} alt={blog.title} />

              <h3>{blog.title}</h3>

              <p>{blog.description}</p>

              <button>Read More</button>
            </div>
          ))}
        </div>

        <div className="sidebar">
          <h3>Search</h3>
          <input type="text" placeholder="Search blogs" />

          <h3>Categories</h3>

          <p>HTML</p>
          <p>CSS</p>
          <p>JavaScript</p>
          <p>React</p>
        </div>

      </div>
    </>
  );
}

export default Blog;
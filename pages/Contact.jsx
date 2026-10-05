function Contact() {
  return (
    <div className="page">
      <h1>Contact Us</h1>

      <input type="text" placeholder="Enter your name" />

      <br /><br />

      <input type="email" placeholder="Enter your email" />

      <br /><br />

      <textarea placeholder="Enter your message"></textarea>

      <br /><br />

      <button>Send</button>
    </div>
  );
}

export default Contact;
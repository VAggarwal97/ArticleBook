import '../Style/Newsletter.css';

function Newsletter() {
  return (
    <div className="newsletter">
      <h2>Self-improvement tips based on proven scientific research.</h2>
      <input type="email" placeholder="My email address is..." />
      <button>Try the free newsletter</button>
      <p><em>No spam. Just the highest quality ideas you'll find on the web.</em></p>
    </div>
  );
}

export default Newsletter;
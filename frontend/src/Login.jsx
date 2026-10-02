import { useState } from "react";

function Login({ onBackToHome, onGoToRegister, onLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!formData.email || !formData.password) {
    setMessage("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Login failed.");
      return;
    }

    setMessage("Login successful! 🎉");

    localStorage.setItem("user", JSON.stringify(data.user));

    setTimeout(() => {
      if (onLoggedIn) {
        onLoggedIn(data.user);
      }
    }, 500);

  } catch (error) {
    setMessage(
      "Could not connect to the server. Make sure your backend is running."
    );
  }
};

  return (
    <div className="auth-page">
      <div className="auth-image">
        <div className="auth-overlay">

          <div className="auth-brand">
            <span>◆</span> RentPulse
          </div>

          <div className="auth-quote">
            <h1>
              Welcome
              <br />
              back.
            </h1>

            <p>
              Your next rental is just a few clicks away.
            </p>
          </div>

        </div>
      </div>

      <div className="auth-form-section">

        <button className="back-home" onClick={onBackToHome}>
          ← Back to home
        </button>

        <div className="auth-form-container">

          <span className="auth-small-title">
            WELCOME BACK
          </span>

          <h2>Login to RentPulse</h2>

          <p className="auth-subtitle">
            Sign in to continue renting what you need.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>EMAIL ADDRESS</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>PASSWORD</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            {message && (
              <div className="auth-message">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              Login →
            </button>

          </form>

          <p className="auth-bottom-text">
            Don't have an account?{" "}

            <button
              type="button"
              onClick={onGoToRegister}
              className="auth-link"
            >
              Create Account
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
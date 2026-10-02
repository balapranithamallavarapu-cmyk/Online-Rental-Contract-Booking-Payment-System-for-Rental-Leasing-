import { useState } from "react";

function Register({ onBackToHome, onRegistered }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      setMessage("Account created successfully! 🎉");

      setTimeout(() => {
        if (onRegistered) {
          onRegistered();
        }
      }, 1000);

    } catch (error) {
      setMessage(
        "Could not connect to the server. Make sure your backend is running."
      );
    } finally {
      setLoading(false);
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
              Rent more.
              <br />
              Own less.
            </h1>

            <p>
              Everything you need, available when you need it.
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
            JOIN RENTPULSE
          </span>

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Start renting the things you need today.
          </p>


          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>FULL NAME</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>


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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>CONFIRM PASSWORD</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>


            {message && (
              <div className="auth-message">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>

          </form>


          <p className="auth-bottom-text">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onBackToHome}
              className="auth-link"
            >
              Login
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
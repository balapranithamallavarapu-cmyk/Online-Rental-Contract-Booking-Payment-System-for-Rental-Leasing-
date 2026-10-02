import { useState } from "react";
import "./App.css";
import Register from "./Register";
import CategoryPage from "./CategoryPage";
import Login from "./Login";
import CustomerDashboard from "./CustomerDashboard";
import ItemDetails from "./ItemDetails";
import Booking from "./Booking";
import Contract from "./Contract";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import AdminDashboard from "./AdminDashboard";
function App() {  
   const [page, setPage] = useState("home");
const [selectedCategory, setSelectedCategory] = useState("Vehicles");
const [selectedItem, setSelectedItem] = useState(null);
const [selectedRental, setSelectedRental] = useState(null);
const [loggedInUser, setLoggedInUser] = useState(null);

  if (page === "register") {
    return (
      <Register
        onBackToHome={() => setPage("home")}
        onRegistered={() => setPage("home")}
      />
    );
  }

  if (page === "login") {
    return (
      <Login
        onBackToHome={() => setPage("home")}
        onGoToRegister={() => setPage("register")}
        onLoggedIn={(user) => {
          setLoggedInUser(user);
          setPage("dashboard");
        }}
      />
    );
  }

  if (page === "dashboard") {
  if (loggedInUser?.role === "admin") {
    return (
      <AdminDashboard
        user={loggedInUser}
        onLogout={() => {
          localStorage.removeItem("user");
          setLoggedInUser(null);
          setPage("home");
        }}
      />
    );
  }

  return (
    <CustomerDashboard
      user={loggedInUser}
      onLogout={() => {
        localStorage.removeItem("user");
        setLoggedInUser(null);
        setPage("home");
      }}
      onBrowseRentals={() => setPage("home")}
    />
  );
}

  if (page === "confirmation") {
    return (
      <Confirmation
        rental={selectedRental}
        onViewDashboard={() => setPage("dashboard")}
        onBackHome={() => setPage("home")}
      />
    );
  }

  if (page === "payment") {
    return (
      <Payment
        rental={selectedRental}
        onBack={() => setPage("contract")}
        onPaymentSuccess={(paymentData) => {
          setSelectedRental(paymentData);
          setPage("confirmation");
        }}
      />
    );
  }

  if (page === "contract") {
    return (
      <Contract
        rental={selectedRental}
        onBack={() => setPage("booking")}
        onContinue={(rental) => {
          setSelectedRental(rental);
          setPage("payment");
        }}
      />
    );
  }

  if (page === "booking") {
    return (
      <Booking
        rental={selectedRental}
        onBack={() => setPage("item")}
        onContinue={(rental) => {
          setSelectedRental(rental);
          setPage("contract");
        }}
      />
    );
  }

  if (page === "item") {
    return (
      <ItemDetails
        item={selectedItem}
        onBack={() => setPage("category")}
        onRentNow={(rental) => {
          setSelectedRental(rental);
          setPage("booking");
        }}
      />
    );
  }

  if (page === "category") {
    return (
      <CategoryPage
        category={selectedCategory}
        onBack={() => setPage("home")}
        onViewItem={(item) => {
          setSelectedItem(item);
          setPage("item");
        }}
      />
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-mark">◆</span>
          Rent<span>Pulse</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#featured">Explore</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="nav-actions">
          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => setPage("register")}
          >
            Get Started
          </button>
        </div>
      </nav>


      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ RENT SMART. LIVE MORE.
          </div>

          <h1>
            Rent what you need.
            <br />
            <span>Use it. Return it.</span>
          </h1>

          <p>
            Discover vehicles, fashion, electronics, accessories,
            event essentials and more — all available for easy,
            flexible rental.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Rentals →
            </button>

            <button className="outline-btn">
              How It Works
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>2K+</strong>
              <span>Rental Items</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Happy Customers</span>
            </div>

            <div>
              <strong>20+</strong>
              <span>Categories</span>
            </div>
          </div>

        </div>


        <div className="hero-visual">

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85"
              alt="Motorcycle available for rental"
            />
          </div>

          <div className="floating-card">
            <div className="floating-icon">🏍️</div>

            <div>
              <strong>Royal Enfield</strong>
              <span>Available for rent</span>
            </div>

            <b>₹899<span>/day</span></b>
          </div>

          <div className="floating-badge">
            ✓ Verified Item
          </div>

        </div>

      </section>


      {/* SEARCH */}
      <section className="search-section">

        <div className="search-box">

          <div className="search-field">
            <span>⌕</span>

            <div>
              <label>WHAT DO YOU NEED?</label>
              <p>Search vehicles, dresses, cameras...</p>
            </div>
          </div>

          <div className="search-divider"></div>

          <div className="search-field">
            <span>◈</span>

            <div>
              <label>CATEGORY</label>
              <p>All categories</p>
            </div>
          </div>

          <div className="search-divider"></div>

          <div className="search-field">
            <span>₹</span>

            <div>
              <label>YOUR BUDGET</label>
              <p>Select price range</p>
            </div>
          </div>

          <button className="search-btn">
            Search
          </button>

        </div>

      </section>


      {/* CATEGORIES */}
      <section className="categories-section" id="categories">

        <div className="section-heading">

          <div>
            <span className="small-title">BROWSE COLLECTION</span>
            <h2>Rent almost anything.</h2>
          </div>

          <p>
            Find exactly what you need without buying it.
          </p>

        </div>


        <div className="category-grid">

          {/* VEHICLES */}
          <div
            className="category-card"
            onClick={() => {
              setSelectedCategory("Vehicles");
              setPage("category");
            }}
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80"
                alt="Vehicles"
              />
            </div>

            <div className="category-content">
              <span>🚗</span>
              <h3>Vehicles</h3>
              <p>Cars, bikes & scooters</p>
            </div>

          </div>


          
          {/* FASHION */}
<div
  className="category-card"
  onClick={() => {
    setSelectedCategory("Fashion");
    setPage("category");
  }}
>

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
                alt="Dresses"
              />
            </div>

            <div className="category-content">
              <span>👗</span>
              <h3>Fashion</h3>
              <p>Dresses, suits & ethnic wear</p>
            </div>

          </div>


         
          {/* ACCESSORIES */}
<div
  className="category-card"
  onClick={() => {
    setSelectedCategory("Accessories");
    setPage("category");
  }}
>

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80"
                alt="Accessories"
              />
            </div>

            <div className="category-content">
              <span>💍</span>
              <h3>Accessories</h3>
              <p>Watches, bags & jewelry</p>
            </div>

          </div>


         
          {/* ELECTRONICS */}
<div
  className="category-card"
  onClick={() => {
    setSelectedCategory("Electronics");
    setPage("category");
  }}
>

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
                alt="Camera"
              />
            </div>

            <div className="category-content">
              <span>📷</span>
              <h3>Electronics</h3>
              <p>Cameras, gadgets & more</p>
            </div>

          </div>


          {/* EVENTS */}
          <div className="category-card">

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80"
                alt="Events"
              />
            </div>

            <div className="category-content">
              <span>🎉</span>
              <h3>Events</h3>
              <p>Party & event essentials</p>
            </div>

          </div>


          {/* OUTDOOR */}
          <div className="category-card">

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=700&q=80"
                alt="Camping"
              />
            </div>

            <div className="category-content">
              <span>🏕️</span>
              <h3>Outdoor</h3>
              <p>Camping & travel gear</p>
            </div>

          </div>

        </div>

      </section>


      {/* FEATURED */}
      <section className="featured-section" id="featured">

        <div className="section-heading">

          <div>
            <span className="small-title">POPULAR RIGHT NOW</span>
            <h2>Featured rentals.</h2>
          </div>

          <button className="view-all">
            View All →
          </button>

        </div>


        <div className="rental-grid">

          <div className="rental-card">

            <div className="rental-image">
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
                alt="Royal Enfield"
              />

              <span className="tag">Popular</span>
              <button className="heart">♡</button>
            </div>

            <div className="rental-info">

              <span className="item-category">VEHICLE</span>

              <h3>Royal Enfield Classic 350</h3>

              <p>📍 Hyderabad</p>

              <div className="rental-bottom">
                <strong>₹899<span>/day</span></strong>
                <span>★★★★★</span>
              </div>

            </div>

          </div>


          <div className="rental-card">

            <div className="rental-image">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
                alt="Designer dress"
              />

              <span className="tag">Trending</span>
              <button className="heart">♡</button>
            </div>

            <div className="rental-info">

              <span className="item-category">FASHION</span>

              <h3>Designer Evening Gown</h3>

              <p>📍 Hyderabad</p>

              <div className="rental-bottom">
                <strong>₹1,499<span>/day</span></strong>
                <span>★★★★★</span>
              </div>

            </div>

          </div>


          <div className="rental-card">

            <div className="rental-image">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
                alt="Camera"
              />

              <span className="tag">New</span>
              <button className="heart">♡</button>
            </div>

            <div className="rental-info">

              <span className="item-category">ELECTRONICS</span>

              <h3>Professional DSLR Camera</h3>

              <p>📍 Hyderabad</p>

              <div className="rental-bottom">
                <strong>₹1,200<span>/day</span></strong>
                <span>★★★★★</span>
              </div>

            </div>

          </div>


          <div className="rental-card">

            <div className="rental-image">
              <img
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80"
                alt="Luxury watch"
              />

              <span className="tag">Premium</span>
              <button className="heart">♡</button>
            </div>

            <div className="rental-info">

              <span className="item-category">ACCESSORIES</span>

              <h3>Luxury Classic Watch</h3>

              <p>📍 Hyderabad</p>

              <div className="rental-bottom">
                <strong>₹799<span>/day</span></strong>
                <span>★★★★★</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">

        <div className="section-center">

          <span className="small-title">HOW IT WORKS</span>

          <h2>Renting made ridiculously simple.</h2>

          <p>
            No complicated process. Find it, book it, use it,
            and return it.
          </p>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">01</div>

            <div className="step-icon">⌕</div>

            <h3>Find an Item</h3>

            <p>
              Browse thousands of items across multiple
              categories and find what you need.
            </p>

          </div>


          <div className="step">

            <div className="step-number">02</div>

            <div className="step-icon">📅</div>

            <h3>Choose Your Dates</h3>

            <p>
              Select when you want the item and check its
              availability instantly.
            </p>

          </div>


          <div className="step">

            <div className="step-number">03</div>

            <div className="step-icon">📝</div>

            <h3>Book & Sign</h3>

            <p>
              Confirm your booking and manage your digital
              rental contract online.
            </p>

          </div>


          <div className="step">

            <div className="step-number">04</div>

            <div className="step-icon">✓</div>

            <h3>Use & Return</h3>

            <p>
              Enjoy your item and return it according to your
              rental agreement.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="features-section">

        <div className="section-heading">

          <div>
            <span className="small-title">WHY RENTPULSE</span>
            <h2>Everything handled in one place.</h2>
          </div>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">🛡️</div>

            <h3>Verified Listings</h3>

            <p>
              Browse detailed rental listings with clear pricing,
              availability and item information.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">📄</div>

            <h3>Digital Contracts</h3>

            <p>
              Access your rental agreement and booking details
              digitally whenever you need them.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">💳</div>

            <h3>Easy Payments</h3>

            <p>
              Keep your rental payments and transaction history
              organized in one place.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">📊</div>

            <h3>Simple Dashboard</h3>

            <p>
              Track active rentals, upcoming returns, contracts
              and payment history from your dashboard.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div className="cta-content">

          <span className="small-title">
            WHY BUY WHEN YOU CAN RENT?
          </span>

          <h2>
            Get what you need.
            <br />
            <span>Only when you need it.</span>
          </h2>

          <p>
            Save money, try new things and enjoy more flexibility
            with RentPulse.
          </p>

          <button className="primary-btn">
            Start Exploring →
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer>

        <div className="footer-top">

          <div>

            <div className="footer-logo">
              <span className="logo-mark">◆</span>
              Rent<span>Pulse</span>
            </div>

            <p>
              Rent smarter. Use more. Own less.
            </p>

          </div>


          <div className="footer-links">

            <a href="#home">Home</a>

            <a href="#categories">Categories</a>

            <a href="#featured">Explore</a>

            <a href="#how-it-works">How It Works</a>

          </div>

        </div>


        <div className="copyright">
          © 2026 RentPulse. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default App;
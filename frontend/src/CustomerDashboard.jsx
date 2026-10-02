import { useEffect, useState } from "react";

function CustomerDashboard({ user, onLogout, onBrowseRentals }) {
  const customerName = user?.name || "Customer";

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setBookingsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch bookings");
        }

        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Booking fetch error:", error);
        setBookings([]);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const activeRentals = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const completedRentals = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const totalSpent = bookings.reduce(
    (sum, booking) => sum + Number(booking.total_amount || 0),
    0
  );

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="customer-dashboard">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          <span>◆</span> RentPulse
        </div>

        <nav className="dashboard-nav">

          <button className="dashboard-nav-item active">
            <span>⌂</span>
            Overview
          </button>

          <button className="dashboard-nav-item">
            <span>▣</span>
            My Rentals
          </button>

          <button className="dashboard-nav-item">
            <span>◷</span>
            Bookings
          </button>

          <button className="dashboard-nav-item">
            <span>▤</span>
            Contracts
          </button>

          <button className="dashboard-nav-item">
            <span>₹</span>
            Payments
          </button>

          <button className="dashboard-nav-item">
            <span>♡</span>
            Saved Items
          </button>

        </nav>

        <div className="dashboard-sidebar-bottom">

          <button className="dashboard-nav-item">
            <span>⚙</span>
            Settings
          </button>

          <button
            className="dashboard-logout"
            onClick={onLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Bar */}
        <header className="dashboard-topbar">

          <div>
            <span className="dashboard-small-title">
              CUSTOMER DASHBOARD
            </span>

            <h1>
              Welcome back, {customerName.split(" ")[0]} 👋
            </h1>

            <p>
              Here's what's happening with your rentals.
            </p>
          </div>

          <div className="dashboard-profile">

            <div className="dashboard-avatar">
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{customerName}</strong>
              <span>{user?.email || "Customer"}</span>
            </div>

          </div>

        </header>


        {/* Statistics */}
        <section className="dashboard-stats">

          {/* Active Rentals */}
          <div className="dashboard-stat-card">

            <div className="stat-icon purple">
              ▣
            </div>

            <div>
              <span>ACTIVE RENTALS</span>

              <strong>
                {activeRentals}
              </strong>

              <small>
                {activeRentals > 0
                  ? `${activeRentals} active rental${activeRentals > 1 ? "s" : ""}`
                  : "No active rentals"}
              </small>
            </div>

          </div>


          {/* Upcoming Bookings */}
          <div className="dashboard-stat-card">

            <div className="stat-icon blue">
              ◷
            </div>

            <div>
              <span>UPCOMING BOOKINGS</span>

              <strong>
                {upcomingBookings}
              </strong>

              <small>
                {upcomingBookings > 0
                  ? `${upcomingBookings} upcoming booking${upcomingBookings > 1 ? "s" : ""}`
                  : "No upcoming bookings"}
              </small>
            </div>

          </div>


          {/* Completed Rentals */}
          <div className="dashboard-stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>COMPLETED RENTALS</span>

              <strong>
                {completedRentals}
              </strong>

              <small>
                {completedRentals > 0
                  ? `${completedRentals} completed rental${completedRentals > 1 ? "s" : ""}`
                  : "Start renting today"}
              </small>
            </div>

          </div>


          {/* Total Spent */}
          <div className="dashboard-stat-card">

            <div className="stat-icon orange">
              ₹
            </div>

            <div>
              <span>TOTAL SPENT</span>

              <strong>
                ₹{totalSpent.toLocaleString("en-IN")}
              </strong>

              <small>
                {bookings.length > 0
                  ? `${bookings.length} booking${bookings.length > 1 ? "s" : ""}`
                  : "No payments yet"}
              </small>
            </div>

          </div>

        </section>


        {/* Content Grid */}
        <section className="dashboard-content-grid">

          {/* Recent Rentals */}
          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <span className="dashboard-panel-label">
                  RENTAL ACTIVITY
                </span>

                <h2>
                  Recent Rentals
                </h2>
              </div>

              <button className="dashboard-view-all">
                View all →
              </button>

            </div>


            <div className="dashboard-rentals-list">

              {bookingsLoading ? (

                <div className="dashboard-empty">

                  <div className="dashboard-empty-icon">
                    ◷
                  </div>

                  <h3>
                    Loading rentals...
                  </h3>

                  <p>
                    Fetching your rental activity.
                  </p>

                </div>

              ) : bookings.length === 0 ? (

                <div className="dashboard-empty">

                  <div className="dashboard-empty-icon">
                    ◫
                  </div>

                  <h3>
                    No rentals yet
                  </h3>

                  <p>
                    Find something you need and start your first rental.
                  </p>

                  <button
                    className="browse-rentals-btn"
                    onClick={onBrowseRentals}
                  >
                    Browse Rentals →
                  </button>

                </div>

              ) : (

                bookings.slice(0, 3).map((booking) => (

                  <div
                    className="dashboard-rental-item"
                    key={booking.id}
                  >

                    <div className="dashboard-rental-image">

                      {booking.image_url ? (

                        <img
                          src={booking.image_url}
                          alt={booking.title}
                        />

                      ) : (

                        <span>
                          ◫
                        </span>

                      )}

                    </div>


                    <div className="dashboard-rental-info">

                      <strong>
                        {booking.title}
                      </strong>

                      <span>
                        📍 {booking.location}
                      </span>

                      <small>
                        {formatDate(booking.start_date)}
                        {" → "}
                        {formatDate(booking.end_date)}
                      </small>

                    </div>


                    <div className="dashboard-rental-right">

                      <strong>
                        ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                      </strong>

                      <span
                        className={`booking-status ${booking.status}`}
                      >
                        {booking.status}
                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>


          {/* Upcoming */}
          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <span className="dashboard-panel-label">
                  YOUR SCHEDULE
                </span>

                <h2>
                  Upcoming
                </h2>
              </div>

            </div>


            <div className="dashboard-upcoming-list">

              {bookingsLoading ? (

                <div className="dashboard-empty small">

                  <div className="dashboard-empty-icon">
                    ◷
                  </div>

                  <h3>
                    Loading...
                  </h3>

                </div>

              ) : upcomingBookings === 0 ? (

                <div className="dashboard-empty small">

                  <div className="dashboard-empty-icon">
                    ◷
                  </div>

                  <h3>
                    Nothing scheduled
                  </h3>

                  <p>
                    Your upcoming bookings will appear here.
                  </p>

                </div>

              ) : (

                bookings
                  .filter(
                    (booking) => booking.status === "pending"
                  )
                  .slice(0, 3)
                  .map((booking) => (

                    <div
                      className="dashboard-upcoming-item"
                      key={booking.id}
                    >

                      <div className="upcoming-date">

                        <strong>
                          {new Date(
                            booking.start_date
                          ).getDate()}
                        </strong>

                        <span>
                          {new Date(
                            booking.start_date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                            }
                          )}
                        </span>

                      </div>


                      <div className="upcoming-info">

                        <strong>
                          {booking.title}
                        </strong>

                        <span>
                          📍 {booking.location}
                        </span>

                        <small>
                          {formatDate(booking.start_date)}
                          {" → "}
                          {formatDate(booking.end_date)}
                        </small>

                      </div>

                    </div>

                  ))

              )}

            </div>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="dashboard-quick-section">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-label">
                QUICK ACCESS
              </span>

              <h2>
                What would you like to do?
              </h2>
            </div>

          </div>


          <div className="dashboard-quick-grid">

            <button
              className="dashboard-quick-card"
              onClick={onBrowseRentals}
            >
              <span>⌕</span>
              <strong>Browse Rentals</strong>
              <small>Find your next rental</small>
            </button>


            <button className="dashboard-quick-card">
              <span>▣</span>
              <strong>My Bookings</strong>
              <small>Check your reservations</small>
            </button>


            <button className="dashboard-quick-card">
              <span>▤</span>
              <strong>My Contracts</strong>
              <small>View rental agreements</small>
            </button>


            <button className="dashboard-quick-card">
              <span>₹</span>
              <strong>Payment History</strong>
              <small>View your transactions</small>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CustomerDashboard;
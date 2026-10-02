import { useEffect, useState } from "react";

function AdminDashboard({ user, onLogout }) {
  const [rentals, setRentals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [rentalsResponse, bookingsResponse] = await Promise.all([
        fetch("http://localhost:5000/api/rentals"),
        fetch("http://localhost:5000/api/bookings"),
      ]);

      const rentalsData = await rentalsResponse.json();
      const bookingsData = await bookingsResponse.json();

      setRentals(rentalsData.rentals || []);
      setBookings(bookingsData.bookings || []);
    } catch (error) {
      console.error("Admin data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Refresh booking/availability information every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const availableItems = rentals.filter(
    (item) => item.status === "available"
  ).length;

  const unavailableItems = rentals.filter(
    (item) => item.status === "unavailable"
  ).length;

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this rental item?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/rentals/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not remove item.");
        return;
      }

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Could not connect to the server.");
    }
  };

  const handleEdit = async (item) => {
    const title = window.prompt(
      "Rental item name:",
      item.title
    );

    if (!title) return;

    const price = window.prompt(
      "Price per day:",
      item.price_per_day
    );

    if (!price) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/rentals/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price_per_day: Number(price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not update item.");
        return;
      }

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Could not connect to the server.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-header">
        <div>
          <span className="admin-label">
            RENTPULSE ADMIN
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage rental items and monitor customer bookings.
          </p>
        </div>

        <div className="admin-header-right">
          <span>
            👤 {user?.name || "Admin"}
          </span>

          <button
            className="admin-logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* STATS */}
      <section className="admin-stats">

        <div className="admin-stat-card">
          <span>📦</span>
          <div>
            <strong>{rentals.length}</strong>
            <p>Total Items</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>🟢</span>
          <div>
            <strong>{availableItems}</strong>
            <p>Available</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>🔴</span>
          <div>
            <strong>{unavailableItems}</strong>
            <p>Rented</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>📋</span>
          <div>
            <strong>{bookings.length}</strong>
            <p>Total Bookings</p>
          </div>
        </div>

      </section>

      {/* NEW BOOKINGS */}
      <section className="admin-section">

        <div className="admin-section-header">
          <div>
            <span className="admin-section-label">
              CUSTOMER ACTIVITY
            </span>

            <h2>Recent Bookings</h2>
          </div>

          <span className="live-indicator">
            ● Live Updates
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="admin-empty">
            No bookings yet.
          </div>
        ) : (
          <div className="admin-bookings">

            {bookings.slice(0, 10).map((booking) => (
              <div
                className="admin-booking-card"
                key={booking.id}
              >

                <div className="booking-main">

                  <div className="booking-icon">
                    🔔
                  </div>

                  <div>
                    <strong>
                      {booking.user_name || "Customer"}
                    </strong>

                    <p>
                      rented{" "}
                      <b>
                        {booking.title}
                      </b>
                    </p>

                    <small>
                      {formatDate(booking.start_date)}
                      {" → "}
                      {formatDate(booking.end_date)}
                    </small>
                  </div>

                </div>

                <div className="booking-details">

                  <strong>
                    ₹
                    {Number(
                      booking.total_amount || 0
                    ).toLocaleString()}
                  </strong>

                  <span
                    className={`admin-status ${booking.status}`}
                  >
                    {booking.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* RENTAL INVENTORY */}
      <section className="admin-section">

        <div className="admin-section-header">
          <div>
            <span className="admin-section-label">
              INVENTORY
            </span>

            <h2>Rental Items</h2>
          </div>
        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Location</th>
                <th>Price / Day</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {rentals.map((item) => (

                <tr key={item.id}>

                  <td>
                    <div className="admin-item-name">

                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                        />
                      ) : (
                        <div className="admin-item-placeholder">
                          📦
                        </div>
                      )}

                      <strong>
                        {item.title}
                      </strong>

                    </div>
                  </td>

                  <td>
                    {item.category}
                  </td>

                  <td>
                    {item.location}
                  </td>

                  <td>
                    ₹
                    {Number(
                      item.price_per_day
                    ).toLocaleString()}
                  </td>

                  <td>

                    <span
                      className={`availability-badge ${
                        item.status
                      }`}
                    >
                      {item.status === "available"
                        ? "● Available"
                        : "● Rented"}
                    </span>

                  </td>

                  <td>

                    <div className="admin-actions">

                      <button
                        className="edit-item-btn"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-item-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;
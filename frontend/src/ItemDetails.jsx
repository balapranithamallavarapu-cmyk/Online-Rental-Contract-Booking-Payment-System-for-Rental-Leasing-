import { useState } from "react";

function ItemDetails({ item, onBack, onRentNow }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference = end - start;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  };

  const days = calculateDays();
  const total = days * item.price;

  const handleRentNow = () => {
    if (!startDate || !endDate) {
      alert("Please select your rental dates.");
      return;
    }

    if (days <= 0) {
      alert("End date must be after start date.");
      return;
    }

    if (onRentNow) {
      onRentNow({
        ...item,
        startDate,
        endDate,
        days,
        total,
      });
    }
  };

  return (
    <div className="item-details-page">

      {/* Header */}
      <header className="item-details-header">

        <button
          className="item-back-btn"
          onClick={onBack}
        >
          ← Back to rentals
        </button>

        <div className="item-details-logo">
          <span>◆</span> RentPulse
        </div>

      </header>


      {/* Main Product Area */}
      <main className="item-details-main">

        {/* Image */}
        <section className="item-details-image-section">

          <div className="item-details-image-wrapper">

            <img
              src={item.image}
              alt={item.name}
            />

            <span className="item-details-tag">
              {item.tag}
            </span>

          </div>

        </section>


        {/* Information */}
        <section className="item-details-info">

          <span className="item-details-type">
            {item.type}
          </span>

          <h1>{item.name}</h1>

          <div className="item-details-rating">
            <span>★ {item.rating}</span>
            <span>Verified Rental</span>
          </div>

          <p className="item-details-location">
            📍 {item.location}
          </p>

          <div className="item-details-divider" />

          <div className="item-details-price">
            <strong>
              ₹{item.price.toLocaleString()}
            </strong>

            <span>/ day</span>
          </div>

          <p className="item-details-description">
            Enjoy a reliable and well-maintained rental with
            flexible booking options. Select your dates below
            to check the rental cost.
          </p>


          {/* Rental Dates */}
          <div className="rental-date-section">

            <h3>Select rental dates</h3>

            <div className="date-input-grid">

              <div className="date-field">
                <label>START DATE</label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />
              </div>


              <div className="date-field">
                <label>END DATE</label>

                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                />
              </div>

            </div>

          </div>


          {/* Price Summary */}
          <div className="rental-summary">

            <div>
              <span>Rental duration</span>
              <strong>
                {days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "—"}
              </strong>
            </div>

            <div>
              <span>Daily rate</span>
              <strong>
                ₹{item.price.toLocaleString()}
              </strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₹{total.toLocaleString()}
              </strong>
            </div>

          </div>


          {/* Rent Button */}
          <button
            className="rent-now-btn"
            onClick={handleRentNow}
          >
            Rent Now →
          </button>

          <div className="rental-note">
            🔒 Secure booking · Verified rental · Flexible dates
          </div>

        </section>

      </main>

    </div>
  );
}

export default ItemDetails;
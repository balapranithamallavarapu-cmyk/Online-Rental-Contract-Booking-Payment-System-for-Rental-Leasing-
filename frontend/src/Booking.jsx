function Booking({ rental, onBack, onContinue }) {
  const securityDeposit = rental?.securityDeposit || 0;
const rentalTotal = rental?.total || 0;
  const grandTotal = rentalTotal + securityDeposit;

  return (
    <div className="booking-page">

      {/* HEADER */}
      <header className="booking-header">
        <button
          className="booking-back-btn"
          onClick={onBack}
        >
          ← Back to item
        </button>

        <div className="booking-logo">
          <span>◆</span> RentPulse
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="booking-main">

        <div className="booking-heading">
          <span>RENTAL BOOKING</span>
          <h1>Complete your booking</h1>
          <p>
            Review your rental details before continuing to the contract.
          </p>
        </div>

        <div className="booking-layout">

          {/* LEFT SIDE */}
          <section className="booking-form-card">

            <div className="booking-section-title">
              <span>01</span>
              <div>
                <h2>Rental Details</h2>
                <p>Your selected rental information</p>
              </div>
            </div>

            <div className="booking-item">

              <img
                src={rental?.image}
                alt={rental?.name}
              />

              <div>
                <span className="booking-item-category">
                  {rental?.type || "RENTAL ITEM"}
                </span>

                <h3>{rental?.item?.name}</h3>

                <p>📍 {rental?.location}</p>

                <div className="booking-rating">
                  ★ {rental?.rating}
                </div>
              </div>

            </div>

            <div className="booking-divider"></div>

            <div className="booking-section-title">
              <span>02</span>
              <div>
                <h2>Rental Period</h2>
                <p>Selected dates</p>
              </div>
            </div>

            <div className="booking-dates">

              <div>
                <label>START DATE</label>
                <strong>{rental?.startDate}</strong>
              </div>

              <div>
                <label>END DATE</label>
                <strong>{rental?.endDate}</strong>
              </div>

              <div>
                <label>DURATION</label>
                <strong>{rental?.days} days</strong>
              </div>

            </div>

            <div className="booking-divider"></div>

            <div className="booking-section-title">
              <span>03</span>
              <div>
                <h2>Customer Information</h2>
                <p>We'll use your account details for the booking</p>
              </div>
            </div>

            <div className="booking-user-box">
              <div>
                <span>Customer</span>
                <strong>Logged-in customer</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="booking-verified">
                  ✓ Verified Account
                </strong>
              </div>
            </div>

          </section>

          {/* RIGHT SIDE */}
          <aside className="booking-summary-card">

            <div className="booking-summary-top">
              <span>BOOKING SUMMARY</span>
              <div className="booking-summary-icon">✓</div>
            </div>

            <h2>{rental?.item?.name}</h2>

            <p className="booking-summary-location">
              📍 {rental?.item?.location}
            </p>

            <div className="booking-summary-line">
              <span>Daily rate</span>
              <strong>₹{rental?.price}</strong>
            </div>

            <div className="booking-summary-line">
              <span>Rental duration</span>
              <strong>{rental?.days} days</strong>
            </div>

            <div className="booking-summary-line">
              <span>Rental amount</span>
              <strong>₹{rentalTotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="booking-summary-line">
              <span>Security deposit</span>
              <strong>
                ₹{securityDeposit.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="booking-summary-total">
              <span>Total payable</span>
              <strong>
                ₹{grandTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              className="continue-booking-btn"
              onClick={() => onContinue(rental)}
            >
              Continue to Contract →
            </button>

            <p className="booking-secure-note">
              🔒 Secure booking · Digital contract · Verified rental
            </p>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default Booking;
function Confirmation({ rental, onViewDashboard, onBackHome }) {
  return (
    <div className="confirmation-page">

      {/* Header */}
      <header className="confirmation-header">
        <div className="confirmation-logo">
          <span>◆</span> RentPulse
        </div>
      </header>


      {/* Main */}
      <main className="confirmation-main">

        <div className="confirmation-success-icon">
          ✓
        </div>

        <span className="confirmation-label">
          BOOKING CONFIRMED
        </span>

        <h1>Your rental is confirmed!</h1>

        <p className="confirmation-subtitle">
          Your demo payment was successful and your rental
          booking has been created.
        </p>


        {/* Demo banner */}
        <div className="confirmation-demo-banner">
          🧪 <strong>DEMO TRANSACTION</strong>
          <span>No real payment was processed.</span>
        </div>


        <div className="confirmation-layout">

          {/* Booking details */}
          <section className="confirmation-card">

            <div className="confirmation-card-heading">
              <div>
                <span>BOOKING DETAILS</span>
                <h2>{rental?.name}</h2>
              </div>

              <div className="confirmation-status">
                ✓ CONFIRMED
              </div>
            </div>


            <div className="confirmation-item">

              <img
                src={rental?.image}
                alt={rental?.name}
              />

              <div>
                <span>{rental?.type}</span>

                <h3>{rental?.name}</h3>

                <p>
                  📍 {rental?.location}
                </p>
              </div>

            </div>


            <div className="confirmation-details-grid">

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

              <div>
                <label>PAYMENT STATUS</label>
                <strong className="confirmation-paid">
                  ✓ Successful
                </strong>
              </div>

            </div>

          </section>


          {/* Transaction summary */}
          <aside className="confirmation-summary">

            <span className="confirmation-summary-label">
              PAYMENT RECEIPT
            </span>

            <div className="confirmation-amount">
              <span>Amount Paid</span>

              <strong>
                ₹{rental?.total?.toLocaleString("en-IN")}
              </strong>
            </div>


            <div className="confirmation-summary-line">
              <span>Payment method</span>
              <strong>
                {rental?.paymentMethod === "upi"
                  ? "UPI"
                  : rental?.paymentMethod === "netbanking"
                  ? "Net Banking"
                  : "Card"}
              </strong>
            </div>


            <div className="confirmation-summary-line">
              <span>Transaction ID</span>

              <strong className="confirmation-transaction">
                {rental?.transactionId}
              </strong>
            </div>


            <div className="confirmation-summary-line">
              <span>Contract status</span>

              <strong className="confirmation-active">
                ✓ Active
              </strong>
            </div>


            <div className="confirmation-summary-line">
              <span>Payment status</span>

              <strong className="confirmation-active">
                ✓ Successful
              </strong>
            </div>

          </aside>

        </div>


        {/* Buttons */}
        <div className="confirmation-actions">

          <button
            className="confirmation-dashboard-btn"
            onClick={onViewDashboard}
          >
            View My Dashboard →
          </button>

          <button
            className="confirmation-home-btn"
            onClick={onBackHome}
          >
            Back to Home
          </button>

        </div>


        <p className="confirmation-footer-note">
          🔒 Your booking details have been securely recorded.
        </p>

      </main>

    </div>
  );
}

export default Confirmation;
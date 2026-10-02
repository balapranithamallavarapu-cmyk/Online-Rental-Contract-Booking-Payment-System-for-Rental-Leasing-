function Contract({ rental, onBack, onContinue }) {
  return (
    <div className="contract-page">

      {/* Header */}
      <header className="contract-header">
        <button
          className="contract-back-btn"
          onClick={onBack}
        >
          ← Back to booking
        </button>

        <div className="contract-logo">
          <span>◆</span> RentPulse
        </div>
      </header>


      {/* Main */}
      <main className="contract-main">

        <div className="contract-heading">
          <span>RENTAL CONTRACT</span>

          <h1>Review your rental contract</h1>

          <p>
            Please review the agreement details before proceeding to payment.
          </p>
        </div>


        <div className="contract-layout">

          {/* Contract document */}
          <section className="contract-document">

            <div className="contract-document-top">
              <div>
                <span>RENTAL AGREEMENT</span>
                <h2>RentPulse Digital Contract</h2>
              </div>

              <div className="contract-status">
                DRAFT
              </div>
            </div>


            <div className="contract-divider"></div>


            {/* Contract information */}
            <div className="contract-info-grid">

              <div>
                <label>CONTRACT NUMBER</label>
                <strong>RP-DRAFT-001</strong>
              </div>

              <div>
                <label>CONTRACT DATE</label>
                <strong>{new Date().toLocaleDateString("en-IN")}</strong>
              </div>

            </div>


            <div className="contract-divider"></div>


            {/* Rental details */}
            <div className="contract-section">

              <h3>1. Rental Details</h3>

              <div className="contract-rental-box">

                <img
                  src={rental?.image}
                  alt={rental?.name}
                />

                <div>
                  <span>{rental?.type}</span>

                  <h4>{rental?.name}</h4>

                  <p>
                    📍 {rental?.location}
                  </p>
                </div>

              </div>

            </div>


            {/* Rental period */}
            <div className="contract-section">

              <h3>2. Rental Period</h3>

              <div className="contract-period-grid">

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

            </div>


            {/* Terms */}
            <div className="contract-section">

              <h3>3. Rental Terms & Conditions</h3>

              <ul className="contract-terms">

                <li>
                  The customer agrees to use the rental item responsibly
                  during the rental period.
                </li>

                <li>
                  The rental item must be returned on or before the agreed
                  end date.
                </li>

                <li>
                  The customer is responsible for any damage caused during
                  the rental period.
                </li>

                <li>
                  The rental amount must be paid before the booking is
                  confirmed.
                </li>

                <li>
                  Cancellation and refund policies are subject to the
                  rental provider's terms.
                </li>

              </ul>

            </div>


            {/* Agreement */}
            <div className="contract-agreement">

              <div className="contract-check">
                ✓
              </div>

              <div>
                <strong>Digital Agreement</strong>

                <p>
                  By continuing, you confirm that you have reviewed the
                  rental details and agree to the terms and conditions.
                </p>
              </div>

            </div>

          </section>


          {/* Summary */}
          <aside className="contract-summary">

            <span className="contract-summary-label">
              CONTRACT SUMMARY
            </span>

            <h2>{rental?.name}</h2>

            <p className="contract-summary-location">
              📍 {rental?.location}
            </p>


            <div className="contract-summary-line">
              <span>Rental period</span>
              <strong>{rental?.days} days</strong>
            </div>

            <div className="contract-summary-line">
              <span>Daily rate</span>
              <strong>₹{rental?.price}</strong>
            </div>

            <div className="contract-summary-line">
              <span>Rental amount</span>

              <strong>
                ₹{rental?.total?.toLocaleString("en-IN")}
              </strong>
            </div>


            <div className="contract-summary-total">

              <span>Total payable</span>

              <strong>
                ₹{rental?.total?.toLocaleString("en-IN")}
              </strong>

            </div>


            <button
              className="contract-payment-btn"
              onClick={() => onContinue(rental)}
            >
              Continue to Payment →
            </button>


            <p className="contract-secure-note">
              🔒 Secure digital contract
            </p>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Contract;
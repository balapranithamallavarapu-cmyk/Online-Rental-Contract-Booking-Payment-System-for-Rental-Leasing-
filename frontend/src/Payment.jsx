import { useState } from "react";

function Payment({ rental, onBack, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = rental?.total || 0;

  const handlePayment = async () => {
    setError("");
    setProcessing(true);

    try {
      // Get logged-in customer
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setError("Please login before completing the booking.");
        setProcessing(false);
        return;
      }

      const user = JSON.parse(savedUser);

      // Create booking in MySQL
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            rental_id: rental.id,
            start_date: rental.startDate,
            end_date: rental.endDate,
            total_amount: totalAmount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not create booking."
        );
      }

      // Demo payment simulation
      setTimeout(() => {
        const transactionId =
          "RP-DEMO-" +
          Date.now().toString().slice(-8);

        setProcessing(false);

        if (onPaymentSuccess) {
          onPaymentSuccess({
            ...rental,
            bookingId: data.bookingId,
            transactionId,
            paymentMethod,
            paymentStatus: "successful",
          });
        }
      }, 1500);

    } catch (err) {
      console.error("Payment/booking error:", err);

      setProcessing(false);
      setError(
        err.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="payment-page">

      <div className="payment-container">

        <div className="payment-header">
          <button
            className="payment-back-btn"
            onClick={onBack}
          >
            ← Back
          </button>

          <span className="payment-label">
            SECURE CHECKOUT
          </span>

          <h1>Complete Payment</h1>

          <p>
            This is a demo payment. No real money will be charged.
          </p>
        </div>

        <div className="payment-layout">

          {/* Payment methods */}

          <div className="payment-card">

            <h2>Payment Method</h2>

            <div className="payment-methods">

              <button
                className={
                  paymentMethod === "card"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setPaymentMethod("card")}
              >
                💳
                <span>
                  <strong>Card</strong>
                  <small>Credit / Debit Card</small>
                </span>
              </button>

              <button
                className={
                  paymentMethod === "upi"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setPaymentMethod("upi")}
              >
                📱
                <span>
                  <strong>UPI</strong>
                  <small>Google Pay / PhonePe / UPI</small>
                </span>
              </button>

              <button
                className={
                  paymentMethod === "netbanking"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setPaymentMethod("netbanking")}
              >
                🏦
                <span>
                  <strong>Net Banking</strong>
                  <small>All major banks</small>
                </span>
              </button>

            </div>

            {error && (
              <div className="payment-error">
                {error}
              </div>
            )}

            <button
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing
                ? "Processing..."
                : `Pay ₹${totalAmount.toLocaleString()}`}
            </button>

            <p className="demo-payment-note">
              🔒 Demo transaction only — no real payment will be processed.
            </p>

          </div>

          {/* Booking summary */}

          <div className="payment-summary-card">

            <h2>Booking Summary</h2>

            <div className="payment-item">

              {rental?.image && (
                <img
                  src={rental.image}
                  alt={rental.name}
                />
              )}

              <div>
                <strong>{rental?.name}</strong>
                <span>{rental?.location}</span>
              </div>

            </div>

            <div className="payment-summary-row">
              <span>Rental period</span>
              <strong>
                {rental?.startDate} → {rental?.endDate}
              </strong>
            </div>

            <div className="payment-summary-row">
              <span>Duration</span>
              <strong>
                {rental?.days || 0} days
              </strong>
            </div>

            <div className="payment-summary-row">
              <span>Price per day</span>
              <strong>
                ₹{rental?.price?.toLocaleString() || 0}
              </strong>
            </div>

            <div className="payment-summary-divider" />

            <div className="payment-total-row">
              <span>Total</span>
              <strong>
                ₹{totalAmount.toLocaleString()}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;
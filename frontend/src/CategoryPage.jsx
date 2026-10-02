import { useEffect, useState } from "react";

function CategoryPage({ category = "Vehicles", onBack, onViewItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/rentals"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch rentals");
        }

        const formattedItems = data.rentals.map((rental) => ({
          id: rental.id,
          name: rental.title,
          type: rental.category,
          price: Number(rental.price_per_day),
          location: rental.location,
          rating: 4.8,
          image: rental.image_url,
          description: rental.description,
          securityDeposit: Number(rental.security_deposit || 0),
        }));

        setItems(formattedItems);
      } catch (err) {
        console.error(err);
        setError("Could not load rental items.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // Show only items belonging to the selected category
  let filteredItems = items.filter(
    (item) =>
      item.type &&
      item.type.toLowerCase() === category.toLowerCase()
  );

  // Sorting
  if (sortBy === "Price: Low to High") {
    filteredItems = [...filteredItems].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "Price: High to Low") {
    filteredItems = [...filteredItems].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "Rating") {
    filteredItems = [...filteredItems].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="category-page">

      <div className="category-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div>
          <span className="category-label">
            RENTAL MARKETPLACE
          </span>

          <h1>{category}</h1>

          <p>
            Find the perfect {category.toLowerCase()} for your next rental.
          </p>
        </div>
      </div>

      <div className="category-toolbar">
        <div>
          <strong>{filteredItems.length}</strong> items available
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating</option>
        </select>
      </div>

      {loading && (
        <div className="category-message">
          Loading rental items...
        </div>
      )}

      {error && (
        <div className="category-message error">
          {error}
        </div>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <div className="category-message">
          No rental items found in this category.
        </div>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div className="rental-grid">
          {filteredItems.map((item) => (
            <div className="rental-card" key={item.id}>

              <div className="rental-image-wrapper">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rental-image"
                  />
                ) : (
                  <div className="rental-image-placeholder">
                    No Image
                  </div>
                )}

                <span className="verified-badge">
                  ✓ Verified
                </span>

              </div>

              <div className="rental-card-content">

                <div className="rental-card-top">

                  <span className="rental-type">
                    {item.type}
                  </span>

                  <span className="rental-rating">
                    ★ {item.rating}
                  </span>

                </div>

                <h2>{item.name}</h2>

                <p className="rental-location">
                  📍 {item.location}
                </p>

                <div className="rental-card-bottom">

                  <div className="rental-price">
                    <strong>
                      ₹{item.price.toLocaleString()}
                    </strong>

                    <span>/day</span>
                  </div>

                  <button
                    className="view-item-btn"
                    onClick={() => onViewItem(item)}
                  >
                    View Item →
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CategoryPage;
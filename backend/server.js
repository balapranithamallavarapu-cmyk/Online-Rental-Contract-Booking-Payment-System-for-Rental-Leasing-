const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());


// =====================================================
// BASIC ROUTES
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "THIS IS THE NEW SERVER.JS"
    });
});

app.get("/api/test-route", (req, res) => {
    res.json({
        success: true,
        message: "API route is working!"
    });
});

app.get("/api/test-db", (req, res) => {
    db.query("SELECT 1 AS test", (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database query failed",
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "MySQL database is connected!",
            result: results
        });
    });
});


// =====================================================
// REGISTER
// =====================================================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const selectedRole = role || "customer";

        if (!["customer", "owner", "admin"].includes(selectedRole)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        db.query(
            "SELECT id FROM users WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database error",
                        error: err.message
                    });
                }

                if (results.length > 0) {
                    return res.status(409).json({
                        success: false,
                        message: "Email already registered"
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                    [
                        name,
                        email,
                        hashedPassword,
                        selectedRole
                    ],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "Registration failed",
                                error: err.message
                            });
                        }

                        res.status(201).json({
                            success: true,
                            message: "Registration successful!",
                            userId: result.insertId
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// =====================================================
// LOGIN
// =====================================================

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const user = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            res.json({
                success: true,
                message: "Login successful!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
});


// =====================================================
// CUSTOMER BOOKING
// =====================================================

app.post("/api/bookings", (req, res) => {

    const {
        user_id,
        rental_id,
        start_date,
        end_date,
        total_amount
    } = req.body;

    if (
        !user_id ||
        !rental_id ||
        !start_date ||
        !end_date ||
        total_amount === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "All booking details are required"
        });
    }

    const sql = `
        INSERT INTO bookings
        (user_id, rental_id, start_date, end_date, total_amount)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            rental_id,
            start_date,
            end_date,
            total_amount
        ],
        (err, result) => {

            if (err) {
                console.error(
                    "Booking creation error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not create booking",
                    error: err.message
                });
            }

            // Automatically mark the rental as unavailable
            db.query(
                "UPDATE rentals SET status = 'unavailable' WHERE id = ?",
                [rental_id],
                (updateErr) => {

                    if (updateErr) {
                        console.error(
                            "Rental availability update error:",
                            updateErr
                        );
                    }

                    res.status(201).json({
                        success: true,
                        message: "Booking created successfully!",
                        bookingId: result.insertId
                    });
                }
            );
        }
    );
});


// =====================================================
// CUSTOMER BOOKINGS
// =====================================================

app.get("/api/bookings/user/:userId", (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT
            b.id,
            b.user_id,
            b.rental_id,
            b.start_date,
            b.end_date,
            b.total_amount,
            b.status,
            b.created_at,
            r.title,
            r.category,
            r.location,
            r.price_per_day,
            r.image_url
        FROM bookings b
        JOIN rentals r
            ON b.rental_id = r.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error(
                "User bookings fetch error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Could not fetch bookings",
                error: err.message
            });
        }

        res.json({
            success: true,
            bookings: results
        });
    });
});


// =====================================================
// ADMIN - GET ALL BOOKINGS
// =====================================================

app.get("/api/bookings", (req, res) => {

    const sql = `
        SELECT
            b.id,
            b.user_id,
            b.rental_id,
            b.start_date,
            b.end_date,
            b.total_amount,
            b.status,
            b.created_at,

            u.name AS user_name,
            u.email AS user_email,

            r.title,
            r.category,
            r.location,
            r.price_per_day,
            r.image_url

        FROM bookings b

        JOIN users u
            ON b.user_id = u.id

        JOIN rentals r
            ON b.rental_id = r.id

        ORDER BY b.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(
                "Admin bookings fetch error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Could not fetch bookings",
                error: err.message
            });
        }

        res.json({
            success: true,
            bookings: results
        });
    });
});


// =====================================================
// RENTALS - GET AVAILABLE ITEMS
// =====================================================

app.get("/api/rentals", (req, res) => {

    db.query(
        "SELECT * FROM rentals WHERE status = 'available' ORDER BY id ASC",
        (err, results) => {

            if (err) {
                console.error(
                    "Rental fetch error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not fetch rentals",
                    error: err.message
                });
            }

            res.json({
                success: true,
                rentals: results
            });
        }
    );
});


// =====================================================
// ADMIN - GET ALL RENTALS
// =====================================================

app.get("/api/admin/rentals", (req, res) => {

    db.query(
        "SELECT * FROM rentals ORDER BY id ASC",
        (err, results) => {

            if (err) {
                console.error(
                    "Admin rental fetch error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not fetch rental items",
                    error: err.message
                });
            }

            res.json({
                success: true,
                rentals: results
            });
        }
    );
});


// =====================================================
// ADMIN - EDIT RENTAL
// =====================================================

app.put("/api/rentals/:id", (req, res) => {

    const { id } = req.params;

    const {
        title,
        price_per_day
    } = req.body;

    if (!title || price_per_day === undefined) {
        return res.status(400).json({
            success: false,
            message: "Title and price are required"
        });
    }

    const sql = `
        UPDATE rentals
        SET
            title = ?,
            price_per_day = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            title,
            price_per_day,
            id
        ],
        (err, result) => {

            if (err) {
                console.error(
                    "Rental update error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not update rental",
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Rental updated successfully!"
            });
        }
    );
});


// =====================================================
// ADMIN - DELETE RENTAL
// =====================================================

app.delete("/api/rentals/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM rentals WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                console.error(
                    "Rental delete error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not remove rental. It may have existing bookings.",
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Rental removed successfully!"
            });
        }
    );
});


// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});
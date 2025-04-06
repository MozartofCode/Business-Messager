"use client";
import React, { useState } from "react";

function MainComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/makeUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber.replace(/\D/g, "") }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit phone number");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneInput = (e) => {
    let input = e.target.value;
    input = input.replace(/[^\d\s-()]/g, "");
    setPhoneNumber(input);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        {!isSuccess ? (
          <>
            <h2 style={{ marginBottom: "1rem" }}>Enter Your Phone Number</h2>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneInput}
              placeholder="(555) 555-5555"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {error && (
              <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                opacity: isSubmitting ? "0.7" : "1",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </>
        ) : (
          <div>
            <h2 style={{ color: "green" }}>Success!</h2>
            <p>Thank you for submitting your phone number!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;

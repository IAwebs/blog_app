import React from "react";

export default function NotFound() {
  return (
    <div style={styles.page}>
      {/* Left Section */}
      <div style={styles.left}>
        <h4 style={styles.errorLabel}>404 Error</h4>
        <h1 style={styles.title}>Page not found</h1>
        <p style={styles.text}>
          Sorry, the page you are looking for could not be found or has been removed.
        </p>

        <a href="/" style={styles.link}>Go back →</a>
      </div>

      {/* Right Section (Illustration) */}
      <div style={styles.right}>
        <div style={styles.illustrationContainer}>
          <h1 style={styles.big404}>
            4
            <span style={styles.circle}>
              <span style={styles.leaf1}></span>
              <span style={styles.leaf2}></span>
            </span>
            4
          </h1>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    padding: "0 60px",
    backgroundColor: "#fff",
  },

  left: {
    flex: 1,
  },

  errorLabel: {
    color: "#6c63ff",
    marginBottom: 10,
  },

  title: {
    fontSize: "48px",
    margin: "10px 0",
    color: "#222",
  },

  text: {
    color: "#555",
    maxWidth: "350px",
    lineHeight: "1.5",
    marginBottom: "20px",
  },

  link: {
    color: "#6c63ff",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "16px",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  illustrationContainer: {
    position: "relative",
  },

  big404: {
    fontSize: "150px",
    color: "#30303d",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  circle: {
    width: "100px",
    height: "100px",
    border: "6px solid #30303d",
    borderRadius: "50%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  leaf1: {
    width: "20px",
    height: "40px",
    backgroundColor: "#6c63ff",
    borderRadius: "20px 20px 0 0",
    position: "absolute",
    bottom: "20px",
    left: "20px",
  },

  leaf2: {
    width: "20px",
    height: "50px",
    backgroundColor: "#4038f5",
    borderRadius: "20px 20px 0 0",
    position: "absolute",
    bottom: "15px",
    right: "20px",
  },
};

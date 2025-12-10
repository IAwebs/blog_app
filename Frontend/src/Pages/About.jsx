import React from "react";

export default function About() {
  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          lineHeight: "1.7",
        }}
      >
        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "20px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          About Our Blog
        </h1>

        {/* Intro Section */}
        <p style={{ fontSize: "18px", color: "#444", marginBottom: "20px" }}>
          Welcome to our blogging platform! This is a space where ideas, stories,
          tutorials, and creativity come together. Our goal is to share valuable
          content that inspires, educates, and entertains readers around the
          world.
        </p>

        {/* Mission */}
        <h2
          style={{
            fontSize: "26px",
            marginTop: "30px",
            fontWeight: "700",
            color: "#222",
          }}
        >
          Our Mission
        </h2>
        <p style={{ fontSize: "17px", color: "#555" }}>
          Our mission is simple — to connect people through meaningful content.
          Whether it's technology, lifestyle, personal growth, or creative
          writing, we aim to publish blogs that truly make a difference.
        </p>

        {/* Values */}
        <h2
          style={{
            fontSize: "26px",
            marginTop: "30px",
            fontWeight: "700",
            color: "#222",
          }}
        >
          What We Believe
        </h2>
        <ul
          style={{
            paddingLeft: "20px",
            fontSize: "17px",
            color: "#555",
            marginTop: "10px",
          }}
        >
          <li style={{ marginBottom: "10px" }}>Honest and valuable content</li>
          <li style={{ marginBottom: "10px" }}>Helping readers grow and learn</li>
          <li style={{ marginBottom: "10px" }}>Sharing real experiences</li>
          <li style={{ marginBottom: "10px" }}>
            Encouraging creativity and ideas
          </li>
        </ul>

        {/* Story */}
        <h2
          style={{
            fontSize: "26px",
            marginTop: "30px",
            fontWeight: "700",
            color: "#222",
          }}
        >
          Our Story
        </h2>
        <p style={{ fontSize: "17px", color: "#555" }}>
          Every journey begins with a passion. Our blog started as a small idea —
          a desire to create a place where people can find inspiration and share
          their experiences. Today, it has grown into a community of writers,
          thinkers, and learners.
        </p>

        {/* Closing */}
        <p
          style={{
            fontSize: "18px",
            marginTop: "30px",
            color: "#333",
            fontWeight: "500",
          }}
        >
          Thank you for visiting our blog. We're excited to have you as part of
          our growing community!
        </p>
      </div>
    </div>
  );
}

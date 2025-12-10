import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "0e954e10-059f-40f6-9b62-d34894850cc5",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
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
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Contact Us
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT SECTION — FORM */}
          <div style={{ width: "100%", marginBottom: "20px", paddingRight: "20px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#374151",
              }}
            >
              Send us a message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="email"
                  placeholder="Your Email"
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    This field is required
                  </span>
                )}
              </div>

              {/* Message */}
              <div style={{ marginBottom: "15px" }}>
                <textarea
                  placeholder="Your Message"
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    height: "120px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    This field is required
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#000",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SECTION — INFO */}
          <div style={{ width: "100%", paddingLeft: "20px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#374151",
              }}
            >
              Contact Information
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <FaPhone style={{ color: "red" }} />
                <span>+923130721967</span>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <FaEnvelope style={{ color: "deeppink" }} />
                <span>irfan.rajpoot2735@gmail.com</span>
              </li>

              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FaMapMarkerAlt style={{ color: "green" }} />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FaTwitter } from "react-icons/fa";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ul5te21",
        "template_goikhfl",
        form.current,
        "GHf49rLUGz4Fh8qvS"
      )
      .then(
        (result) => {
          toast.success("Message sent", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(result.text);
        },
        (error) => {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      );
    e.target.reset();
  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <h2>Contact US</h2>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Message"
                required
                cols="30"
                rows="10"
              ></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h2 style={{ color: "white" }}>Our Contact Information</h2>
              <p>
                Fill the form of or contact us via other channels listed below
              </p>
              <div className={styles.icon}>
                <span>
                  <FaPhoneAlt />
                  <p>09102401</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>bazakfoodpark@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Plaza,Tubigon,Bohol</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@chadiegil</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

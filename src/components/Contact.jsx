import React from "react";
import {Link} from "react-router-dom";

function Contact() {
  return (
     <div className="container py-5">
      <h2 className="text-center fw-bold mb-3">Contact</h2>
      <p className="text-muted text-center mb-5">
        Feel free to reach out for feedback, suggestions, or collaboration.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card  p-4" style={{border:"1px solid rgba(230, 230, 230, 0.9)" , borderRadius:"12px"}}>
            
            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Send Message
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted">Or connect with me here:</p>

              <Link
                to="https://github.com/suyogshirpe"
                target="_blank"
                className="btn btn-outline-dark me-2"
              >
                GitHub
              </Link>

              <Link
                to="https://www.linkedin.com/in/suyog-shirpe/"
                target="_blank"
                className="btn btn-outline-dark"
              >
                LinkedIn
              </Link>
            </div>

            <div className="text-center mt-4">
              <Link to="/" className="text-decoration-none fw-semibold" style={{color:"black"}}>
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

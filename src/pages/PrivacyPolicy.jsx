import React from "react";

function PrivacyPolicy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#111111",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          lineHeight: "1.7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            color: "#111111",
            marginBottom: "10px",
          }}
        >
          Evermore Privacy Policy
        </h1>

        <p style={{ color: "#555555" }}>
          <strong>Last updated: August 18, 2026</strong>
        </p>

        <h2 style={{ color: "#111111" }}>1. Information We Collect</h2>
        <p>
          When you create or use an Evermore account, we may collect
          information such as your name, username, email address, profile
          information, profile picture, posts, comments, and other information
          you choose to provide.
        </p>

        <h2 style={{ color: "#111111" }}>2. How We Use Your Information</h2>
        <p>
          We use information to provide and maintain Evermore, manage
          accounts, enable community features, allow users to connect and
          interact, maintain points and achievements, improve the platform,
          maintain security, and communicate important service information.
        </p>

        <h2 style={{ color: "#111111" }}>3. User-Generated Content</h2>
        <p>
          Evermore allows users to create and share posts, comments, profile
          information, and other content. Information that you choose to make
          visible to other users may be viewed by other users.
        </p>

        <h2 style={{ color: "#111111" }}>
          4. Authentication and Data Storage
        </h2>
        <p>
          Evermore uses third-party services, including Supabase, to provide
          authentication, database storage, and other backend functionality.
        </p>

        <h2 style={{ color: "#111111" }}>5. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share information
          with service providers that help us operate, secure, and maintain
          Evermore, or when required by law.
        </p>

        <h2 style={{ color: "#111111" }}>6. Data Security</h2>
        <p>
          We take reasonable measures to protect information associated with
          Evermore accounts. However, no internet-based service can guarantee
          complete security.
        </p>

        <h2 style={{ color: "#111111" }}>7. Children's Privacy</h2>
        <p>
          Evermore is not intended for children who are not legally permitted
          to use the service. We do not knowingly collect personal information
          from children who are not permitted to use Evermore.
        </p>

        <h2 style={{ color: "#111111" }}>8. Your Rights</h2>
        <p>
          Depending on applicable law, you may have rights to request access
          to, correction of, or deletion of your personal information.
        </p>

        <h2 style={{ color: "#111111" }}>9. Account Deletion</h2>
        <p>
          If you want to delete your Evermore account or request deletion of
          associated personal information, please contact the Evermore team
          through the contact information provided on the website or
          application.
        </p>

        <h2 style={{ color: "#111111" }}>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When changes
          are made, we will update the "Last updated" date.
        </p>

        <h2 style={{ color: "#111111" }}>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how Evermore
          handles information, please contact the Evermore team through the
          contact information provided on the Evermore website or application.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
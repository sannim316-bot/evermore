import React from "react";

const ChildSafety = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f5ff",
        color: "#1f1f2e",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header
        style={{
          background: "#6d28d9",
          color: "#ffffff",
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 800,
          }}
        >
          Evermore Child Safety Standards
        </h1>

        <p
          style={{
            margin: "14px auto 0",
            maxWidth: "700px",
            fontSize: "17px",
            lineHeight: 1.6,
            opacity: 0.95,
          }}
        >
          Our commitment to protecting children and maintaining a safe,
          respectful online community.
        </p>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "45px 20px 70px",
        }}
      >
        <section style={{ marginBottom: "40px" }}>
          <h2>Our Commitment to Child Safety</h2>

          <p>
            Evermore is committed to maintaining a safe environment for all
            users. We have zero tolerance for child sexual abuse and
            exploitation (CSAE), child sexual abuse material (CSAM), grooming,
            or any other form of exploitation or abuse involving children.
          </p>

          <p>
            Content or behaviour that exploits, abuses, or endangers children
            is strictly prohibited on Evermore.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>Prohibited Content and Behaviour</h2>

          <p>
            Evermore prohibits the following activities:
          </p>

          <ul>
            <li>
              Child sexual abuse or exploitation in any form.
            </li>
            <li>
              Creating, uploading, sharing, requesting, or distributing CSAM.
            </li>
            <li>
              Sexual grooming or inappropriate sexual communication with
              minors.
            </li>
            <li>
              Sexualisation or exploitation of children.
            </li>
            <li>
              Attempts to facilitate or encourage the exploitation of
              children.
            </li>
            <li>
              Any other content or behaviour that violates applicable child
              safety laws.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>Reporting Child Safety Concerns</h2>

          <p>
            Users who encounter content or behaviour that may involve child
            sexual abuse or exploitation should report it through the
            available reporting mechanisms within Evermore.
          </p>

          <p>
            Reports involving child safety are treated seriously and may be
            reviewed and escalated where appropriate.
          </p>

          <p>
            When necessary and where legally required, Evermore may cooperate
            with relevant law enforcement authorities and other appropriate
            authorities.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>Enforcement</h2>

          <p>
            Evermore may take action against accounts, content, or behaviour
            that violates our child safety standards. Depending on the nature
            and severity of a violation, actions may include content removal,
            account restrictions, suspension, or permanent account removal.
          </p>

          <p>
            We may also preserve or provide relevant information to
            appropriate authorities when required by applicable law.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>Prevention and Safety</h2>

          <p>
            We work to promote responsible use of Evermore and to reduce the
            risk of harmful interactions involving minors. Users are expected
            to follow our community rules and applicable laws when using the
            platform.
          </p>

          <p>
            Evermore does not permit users to use the platform for the
            exploitation or abuse of children.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2>Contact</h2>

          <p>
            If you have information about a child safety concern, suspected
            CSAM, or child sexual exploitation associated with Evermore, you
            can contact our designated child safety contact:
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:sannim316@gmail.com"
              style={{
                color: "#6d28d9",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              sannim316@gmail.com
            </a>
          </p>

          <p>
            Please provide enough information for us to understand and
            investigate the concern, while avoiding unnecessary sharing of
            sensitive personal information.
          </p>
        </section>

        <section>
          <h2>Updates to These Standards</h2>

          <p>
            Evermore may update these Child Safety Standards from time to time
            to reflect changes to our services, safety practices, or applicable
            laws.
          </p>

          <p>
            <strong>Last updated:</strong> August 2026
          </p>
        </section>
      </main>

      <footer
        style={{
          background: "#18181b",
          color: "#d4d4d8",
          textAlign: "center",
          padding: "25px 20px",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Evermore. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ChildSafety;
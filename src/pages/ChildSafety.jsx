import LegalLayout from "../components/LegalLayout";
import { CONTACT_EMAIL, TELEGRAM_URL } from "../lib/links";

export default function ChildSafety() {
  return (
    <LegalLayout
      title="Evermore Child Safety Standards"
      updated="September 21, 2026"
      intro="Our commitment to protecting children and keeping our community safe and respectful."
    >
      <section>
        <h2>Our commitment</h2>
        <p>
          Evermore has zero tolerance for child sexual abuse and exploitation
          (CSAE), child sexual abuse material (CSAM), grooming, or any other
          form of exploitation or abuse involving children. Content or
          behaviour that exploits, abuses or endangers children is strictly
          prohibited in Evermore and in any community space we operate.
        </p>
      </section>

      <section>
        <h2>How Evermore is designed</h2>
        <p>
          The Evermore app does not have public posts, comments, direct
          messaging or user profiles. Personal notes ("moments") are private and
          stored only on the user's device. Community conversation takes place
          in our channel on Telegram, which is subject to both these standards
          and Telegram's own rules and safety tools.
        </p>
      </section>

      <section>
        <h2>Prohibited content and behaviour</h2>
        <ul>
          <li>Child sexual abuse or exploitation in any form.</li>
          <li>Creating, uploading, sharing, requesting or distributing CSAM.</li>
          <li>Sexual grooming or inappropriate sexual communication with minors.</li>
          <li>Sexualisation or exploitation of children.</li>
          <li>Attempts to facilitate or encourage the exploitation of children.</li>
          <li>Any other content or behaviour that violates applicable child safety laws.</li>
        </ul>
      </section>

      <section>
        <h2>Reporting concerns</h2>
        <p>
          If you see content or behaviour in our community that may involve
          child sexual abuse or exploitation, please:
        </p>
        <ul>
          <li>Report it to Telegram using Telegram's in-app report tools.</li>
          <li>
            Email our designated child safety contact (below) with enough detail
            for us to act, such as a link to the message or channel.
          </li>
          <li>
            If a child may be in immediate danger, contact local emergency
            services. To report suspected CSAM, you can also use your national
            hotline, such as the NCMEC CyberTipline (report.cybertip.org) in the
            United States, or contact local law enforcement.
          </li>
        </ul>
      </section>

      <section>
        <h2>Enforcement</h2>
        <p>
          We review reports promptly. Depending on severity, we may remove
          content, remove or ban members from our community channel, and report
          to the relevant authorities. Where legally required, we will preserve
          and provide relevant information to law enforcement.
        </p>
      </section>

      <section>
        <h2>Our community channel</h2>
        <p>
          Our community is hosted at{" "}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            the Evermore Telegram channel
          </a>
          . Members are expected to follow our community rules and applicable
          laws.
        </p>
      </section>

      <section>
        <h2>Child safety contact</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          Please share enough information for us to understand and investigate
          the concern while avoiding unnecessary sharing of sensitive personal
          information.
        </p>
      </section>

      <section>
        <h2>Updates to these standards</h2>
        <p>
          We may update these standards to reflect changes to our services,
          safety practices or applicable laws.
        </p>
      </section>
    </LegalLayout>
  );
}

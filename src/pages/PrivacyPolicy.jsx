import LegalLayout from "../components/LegalLayout";
import { CONTACT_EMAIL } from "../lib/links";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Evermore Privacy Policy"
      updated="September 21, 2026"
      intro="Evermore is built to work without an account. This policy explains what that means for your information."
    >
      <section>
        <h2>1. The short version</h2>
        <p>
          Evermore does not require you to create an account, and we do not
          collect, store or sell your personal information on our servers. The
          things you create in the app stay on your device.
        </p>
      </section>

      <section>
        <h2>2. Information stored on your device</h2>
        <p>The app saves the following locally, on your device only:</p>
        <ul>
          <li>An optional name or nickname you choose to enter.</li>
          <li>Your points, level, streak, check-in history and badges.</li>
          <li>Private "moments" (short notes and a mood) you choose to write.</li>
        </ul>
        <p>
          We cannot see this information. It is removed when you uninstall the
          app, clear the app's storage, or use <strong>About → Erase my data</strong>.
        </p>
      </section>

      <section>
        <h2>3. Information we collect</h2>
        <p>
          Evermore does not include advertising, analytics or tracking
          services, and does not request access to your contacts, location,
          camera, microphone or files. If you use the web version of Evermore,
          our hosting provider may process standard technical information such
          as your IP address and browser type in order to deliver the website.
        </p>
      </section>

      <section>
        <h2>4. Links to Telegram</h2>
        <p>
          Evermore contains a link to our community channel on Telegram. When
          you open it you leave Evermore and use Telegram, which is operated by a
          third party. Anything you post or share there, and any information
          Telegram collects about you, is governed by Telegram's own terms and
          privacy policy, not this one.
        </p>
      </section>

      <section>
        <h2>5. Children's privacy</h2>
        <p>
          Evermore does not knowingly collect personal information from anyone,
          including children. Because Evermore has no accounts and no online
          features that collect data, there is nothing to collect from a child
          using the app. Please see our Child Safety Standards for how we
          approach safety in our community spaces.
        </p>
      </section>

      <section>
        <h2>6. Earlier versions of Evermore</h2>
        <p>
          Earlier test versions of Evermore offered accounts, and may have
          stored information such as a name, username, email address, posts and
          comments with our backend provider. Those account features have been
          removed. If you created an account in an earlier version and want your
          information deleted, email us at the address below and we will delete
          it.
        </p>
      </section>

      <section>
        <h2>7. Your choices and rights</h2>
        <p>
          You are in control of your information: you can edit your name, delete
          individual moments, or erase everything at any time inside the app.
          Depending on where you live, you may also have legal rights to access
          or delete information we hold about you. Contact us to exercise them.
        </p>
      </section>

      <section>
        <h2>8. Changes to this policy</h2>
        <p>
          If Evermore changes in a way that affects your privacy, we will update
          this policy and the "Last updated" date before those changes take
          effect.
        </p>
      </section>

      <section>
        <h2>9. Contact us</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}

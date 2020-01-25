import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "Resident 51 | Privacy Policy";
  }, []);

  return (
    <Container>
      <Row>
        <Col
          style={{
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            padding: "1em"
          }}
        >
          <h2>Privacy Policy</h2>
          <p>
            The Resident 51 web application ("Resident 51" or the "site") was built as a Free app.
            This SERVICE is provided by Scholarship Hall alumni at no cost to all past and present
            undergraduate residents of the Scholarship Halls and is intended for use as is.
          </p>
          <p>
            This page is used to inform visitors regarding the site's policies toward the
            collection, use, and disclosure of Personal Information if anyone decided to use my
            Service.
          </p>
          <p>
            If you choose to use Resident 51, then you agree to the collection and use of
            information in relation to this policy. The Personal Information that I collect is used
            for providing and improving the Service. I will not use or share your information with
            anyone except as described in this Privacy Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in our Terms and
            Conditions, which is also accessible at the site.
          </p>

          <p>
            <strong>Information Collection and Use</strong>
          </p>
          <p>
            For the best experience, Resident 51 asks you to provide with certain personally
            identifiable information, which includes the email and display name that is provided by
            the federated provider you use to sign in to Resident 51 (Google, Facebook, and so
            forth). Resident 51 also requests a user to provide information about the Scholarship
            Hall that they identify with. This information could of course be used to guess where a
            user resides during the academic year of their institution. Any other personally
            identifiable information about you that is provided by your sign-in method will be
            retained on your device, and is not collected by Resident 51 in any way.
          </p>
          <p>
            The app does use third party services that may collect information used to identify you.
            But hoenstly, that's just every site. Seriously, the internet is a nightmare for privacy
            anyway.
          </p>

          <p>
            <strong>Cookies</strong>
          </p>
          <p>
            Cookies are files with a small amount of data that are commonly used as anonymous unique
            identifiers. These are sent to your browser from the websites that you visit and are
            stored on your device's internal memory.
          </p>
          <p>
            This Service does not use these “cookies” explicitly. However, the app uses a
            third-party Software Development Kit ("SDK") created by Google to integrate with
            Firebase, an application management platform created by Google. This SDK uses “cookies”
            to collect information and improve their services. I honestly don't know what all they
            do, but it is literally Google so you can imagine it's not like they aren't somehow
            getting all that information anyway.
          </p>

          <p>
            <strong>Security</strong>
          </p>
          <p>
            I value your trust in providing us your Personal Information, thus we are striving to
            use commercially acceptable means of protecting it. This is one reason why Resident 51
            uses federated providers like Google and Facebook to help authenticate you as a user.
            But remember that no method of transmission over the internet, or method of electronic
            storage is 100% secure and reliable, and I cannot guarantee its absolute security.
          </p>

          <p>
            <strong>Links to Other Sites</strong>
          </p>
          <p>
            This Service may contain links to other sites. If you click on a third-party link, you
            will be directed to that site. Note that these external sites are not operated by me.
            Therefore, I strongly advise you to review the Privacy Policy of these websites. I have
            no control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services.
          </p>

          <p>
            <strong>Children’s Privacy</strong>
          </p>
          <p>
            These Services do not address anyone under the age of 13. I do not knowingly collect
            personally identifiable information from children under 13. In the case I discover that
            a child under 13 has provided me with personal information, I immediately delete this
            from our servers. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact me so that I will be able to do
            necessary actions.
          </p>

          <p>
            <strong>Changes to This Privacy Policy</strong>
          </p>
          <p>
            I may update our Privacy Policy from time to time. Thus, you are advised to review this
            page periodically for any changes. I will notify you of any changes by posting the new
            Privacy Policy on this page. These changes are effective immediately after they are
            posted on this page.
          </p>

          <p>
            <strong>Contact Us</strong>
          </p>
          <p>
            If you have any questions or suggestions about my Privacy Policy, do not hesitate to
            contact me at berkyle@gmail.com.
          </p>
          <p>
            This privacy policy page was created at{" "}
            <a href="https://privacypolicytemplate.net" rel="noopener noreferrer" target="_blank">
              privacypolicytemplate.net
            </a>{" "}
            and modified/generated by{" "}
            <a
              href="https://app-privacy-policy-generator.firebaseapp.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              App Privacy Policy Generator
            </a>
            . It was then of course edited by me to make it even remotely useful, and I am solely
            responsible for the contents of this document and its policies - unless I can legally
            put that on the guy who made this, which would rule.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;

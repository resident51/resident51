import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Terms of Service';
  }, []);

  return (
    <Container>
      <Row>
        <Col
          style={{
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            padding: '1em',
          }}
        >
          <h2>Terms &amp; Conditions</h2>
          <p>
            The intended users of this application ("Resident 51", the "site", or the "app") is,
            exclusively, any and all past and present undergraduate residents of the Scholarship
            Halls of the University of Kansas. Users that meet this definition but served on ASHC
            are okay I guess. And undergraduate staff: you're on thin fucking ice.
          </p>
          <p>Anyway, the terms and conditions reserved for intended users are as follows:</p>
          <p>
            Literally do whatever you want, but please do not break the law! That's the gist of it,
            really.
          </p>
          <p>
            Note that this application is a work in progress! We will periodically add additional
            features and making appearance updates.
          </p>
          <p>
            If there is a feature or appearance update you would like to request, please provide
            your feedback in the associated section of the site!
          </p>
          <p>
            The source code for this application will eventually be made available publicly, but can
            also be provided upon request. Intended users interested in contributing to the
            application's functionality are encouraged reach out to express interest.
          </p>
          <p>This ends the terms and conditions for intended users.</p>
          <p>
            The rest of this document is intended for all users who do not meet the definition of an
            intended user.
          </p>
          <p>
            By downloading or using this application, these terms will automatically apply to you –
            you should make sure therefore that you read them carefully before using the app. You
            are not allowed to copy, or modify the app, any part of the app. You’re not allowed to
            attempt to extract the source code of the app, and you also shouldn’t try to translate
            the app into other languages, or make derivative versions. The app itself, and all the
            trade marks, copyright, database rights and other intellectual property rights related
            to it, still belong to Scholarship Hall Alumni.
          </p>
          <p>
            Scholarship Hall Alumni is committed to ensuring that the app is as useful and efficient
            as possible. For that reason, we reserve the right to make changes to the app or to
            charge for its services, at any time and for any reason. We will never charge you for
            the app or its services without making it very clear to you exactly what you’re paying
            for.
          </p>
          <p>
            The Resident 51 app stores and processes personal data that you have provided to us, in
            order to provide my Service. It’s your responsibility to keep your device and access to
            the app secure. We therefore recommend that you do not jailbreak or root your phone,
            even though it is extremely cool to do so.
          </p>
          <p>
            You should be aware that there are certain things that Scholarship Hall Alumni will not
            take responsibility for. Certain functions of the app will require the app to have an
            active internet connection. The connection can be Wi-Fi, or provided by your mobile
            network provider, but Scholarship Hall Alumni cannot take responsibility for the app not
            working at full functionality if you don’t have access to Wi-Fi, and you don’t have any
            of your data allowance left.
          </p>
          <p>
            If you’re using the app outside of an area with Wi-Fi, you should remember that your
            terms of the agreement with your mobile network provider will still apply. As a result,
            you may be charged by your mobile provider for the cost of data for the duration of the
            connection while accessing the app, or other third party charges. In using the app,
            you’re accepting responsibility for any such charges, including roaming data charges if
            you use the app outside of your home territory (i.e. region or country) without turning
            off data roaming. If you are not the bill payer for the device on which you’re using the
            app, please be aware that we assume that you have received permission from the bill
            payer for using the app.
          </p>
          <p>
            With respect to our responsibility for your use of the app, when you’re using the app,
            it’s important to bear in mind that although we endeavour to ensure that it is updated
            and correct at all times, we do rely on third parties to provide information to us so
            that we can make it available to you. Scholarship Hall Alumni accepts no liability for
            any loss, direct or indirect, you experience as a result of relying wholly on this
            functionality of the app.
          </p>

          <p>
            <strong>Changes to This Terms and Conditions</strong>
          </p>
          <p>
            I may update our Terms and Conditions from time to time. Thus, unintended users are
            advised to review this page every 24 hours for changes. I will notify you of any changes
            by posting the new Terms and Conditions on this page, which of course means I will not
            notify and it's on you, dude. These changes are effective immediately after they are
            posted on this page.
          </p>

          <p>
            <strong>Contact Us</strong>
          </p>
          <p>
            If you have any questions or suggestions about my Terms and Conditions, do not hesitate
            to contact me at berkyle@gmail.com.
          </p>

          <p>
            This Terms and Conditions page was generated by{' '}
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

export default TermsOfService;

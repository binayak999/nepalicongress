<template>
  <div class="policy-container">
    <header class="policy-header">

      <h1 class="policy-title">Child Safety Standards</h1>
    </header>

    <div class="policy-content">
      <section class="policy-section">
        <h2>Our Commitment to Child Safety</h2>
        <p>
          At {{ companyName }}, we are committed to providing a safe and secure
          environment for all users, with special attention to the protection of
          children and minors. This document outlines our comprehensive approach
          to preventing child sexual abuse and exploitation (CSAE) within our
          platform.
        </p>
      </section>

      <section class="policy-section">
        <h2>Prevention Measures</h2>
        <ul class="policy-list">
          <li>
            <strong>Age Verification:</strong> We implement strict age
            verification processes to ensure users meet our minimum age
            requirements.
          </li>
          <li>
            <strong>Content Monitoring:</strong> Our platform employs both
            automated systems and human moderation to detect and remove
            inappropriate content.
          </li>
          <li>
            <strong>User Reporting:</strong> We provide easy-to-use reporting
            tools that allow users to flag suspicious content or behavior.
          </li>
          <li>
            <strong>Safety Education:</strong> We offer resources and guidelines
            to educate users about online safety.
          </li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>Reporting Mechanisms</h2>
        <p>
          We provide multiple channels for reporting concerns related to child
          safety:
        </p>
        <ul class="policy-list">
          <li>
            <strong>In-App Reporting:</strong> Users can report concerns
            directly within the application through our reporting feature.
          </li>
          <li>
            <strong>Email:</strong> Concerns can be reported to our designated
            safety team at
            <a href="mailto:safety@example.com" class="policy-link">{{
              safetyEmail
            }}</a
            >.
          </li>
          <li>
            <strong>Contact Form:</strong> Users can submit detailed reports
            through our dedicated safety
            <a href="/contact" class="policy-link">contact form</a>.
          </li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>Response Procedures</h2>
        <p>
          Our response to reports of child safety concerns includes:
        </p>
        <ol class="policy-list numbered">
          <li>
            Immediate review of all reports by our safety team within 24 hours.
          </li>
          <li>Content removal and account suspension when necessary.</li>
          <li>Reporting to relevant authorities when required by law.</li>
          <li>Support resources for affected users.</li>
        </ol>
      </section>

      <section class="policy-section">
        <h2>Cooperation with Law Enforcement</h2>
        <p>
          We comply with all relevant child safety laws and report to regional
          and national authorities as required. Our team works collaboratively
          with law enforcement agencies to address child safety concerns and
          support investigations.
        </p>
      </section>

      <section class="policy-section">
        <h2>Safety Resources</h2>
        <p>
          We recommend the following resources for additional information on
          online child safety:
        </p>
        <ul class="policy-list resource-list">
          <li>
            <a
              href="https://www.missingkids.org/NetSmartz"
              target="_blank"
              rel="noopener noreferrer"
              class="policy-link"
            >
              National Center for Missing & Exploited Children
            </a>
          </li>
          <li>
            <a
              href="https://www.connectsafely.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="policy-link"
            >
              ConnectSafely
            </a>
          </li>
          <li>
            <a
              href="https://www.iwf.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              class="policy-link"
            >
              Internet Watch Foundation
            </a>
          </li>
        </ul>
      </section>

      <section class="policy-section contact-section">
        <h2>Contact Information</h2>
        <p>
          For questions regarding our child safety standards or to report
          concerns, please contact our designated child safety representative:
        </p>
        <div class="contact-info">
          <p>
            <strong>Email:</strong>
            <a href="mailto:safety@example.com" class="policy-link">{{
              safetyEmail
            }}</a>
          </p>
          <p><strong>Phone:</strong> {{ safetyPhone }}</p>
          <p>
            <strong>Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM ({{
              timezone
            }})
          </p>
        </div>
      </section>
    </div>

    <footer class="policy-footer">
      <p>Last Updated: {{ lastUpdated }}</p>
      <p>
        &copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights
        reserved.
      </p>
      <div class="footer-links">
        <a href="/terms" class="footer-link">Terms of Service</a>
        <a href="/privacy" class="footer-link">Privacy Policy</a>
        <a href="/contact" class="footer-link">Contact Us</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ChildSafetyStandardsPolicy",
  data() {
    return {
      companyName: "Nepali Congress",
      safetyEmail: "binayakdhakal@999.com",
      safetyPhone: "9860185447",
      timezone: "EST",
      lastUpdated: "March 15, 2025",
    };
  },
};
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #333;
  line-height: 1.6;
}

.policy-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.logo-container {
  margin-bottom: 20px;
}

.company-logo {
  max-height: 60px;
  max-width: 200px;
}

.policy-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.policy-section {
  margin-bottom: 30px;
}

.policy-section h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.policy-list {
  padding-left: 20px;
  margin-bottom: 15px;
}

.policy-list li {
  margin-bottom: 10px;
}

.numbered {
  list-style-type: decimal;
}

.policy-link {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.policy-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.contact-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-top: 40px;
}

.contact-info {
  margin-top: 15px;
}

.contact-info p {
  margin: 5px 0;
}

.resource-list {
  list-style-type: none;
  padding-left: 0;
}

.resource-list li {
  border-left: 3px solid #3498db;
  padding-left: 15px;
  margin-bottom: 15px;
}

.policy-footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
  text-align: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.footer-links {
  margin-top: 15px;
}

.footer-link {
  color: #7f8c8d;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #3498db;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .policy-container {
    padding: 15px;
  }

  .policy-title {
    font-size: 2rem;
  }

  .policy-section h2 {
    font-size: 1.3rem;
  }
}
</style>

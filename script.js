/* ─────────────────────────────────────────────
   EmailJS configuration
   Fill these three values in after connecting
   chia.an.hou@gmail.com on https://www.emailjs.com
   (see SETUP-EMAIL.md for the 5-minute walkthrough)
────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  publicKey: "",   // EmailJS → Account → Public Key
  serviceId: "",   // EmailJS → Email Services → your Gmail service ID
  templateId: "",  // EmailJS → Email Templates → your template ID
};

const emailConfigured = Object.values(EMAILJS_CONFIG).every((v) => v.trim() !== "");
if (emailConfigured && window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

const form = document.getElementById("hello-form");
const statusEl = document.getElementById("form-status");
const sendBtn = document.getElementById("send-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("visitor-email").value.trim();
  const message = document.getElementById("visitor-message").value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus("Please enter a valid email address.", "err");
    return;
  }

  if (!emailConfigured || !window.emailjs) {
    // Graceful fallback while EmailJS keys are not configured yet:
    // open the visitor's mail client addressed to Dennis instead.
    const subject = encodeURIComponent("Hello from your website");
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:chia.an.hou@gmail.com?subject=${subject}&body=${body}`;
    setStatus("The instant-confirmation service isn't live yet — your mail app was opened instead.", "err");
    return;
  }

  sendBtn.disabled = true;
  setStatus("Sending…", "");

  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      visitor_email: email,
      visitor_message: message || "(no message left)",
      sent_at: new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }) + " (Taipei time)",
    });
    setStatus("Sent! A confirmation email is on its way to your inbox. Talk soon ✳", "ok");
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus("Something went wrong sending your message — please email me directly at chia.an.hou@gmail.com.", "err");
  } finally {
    sendBtn.disabled = false;
  }
});

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = "form-status" + (kind ? " " + kind : "");
}

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ── Footer year ── */
document.getElementById("year").textContent = new Date().getFullYear();

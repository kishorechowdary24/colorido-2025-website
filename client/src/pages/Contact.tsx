import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin, Clock, Instagram } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowError(null);

    // Basic validation (you can extend)
    if (!name || !email || !message) {
      setShowError("Please fill name, email and message.");
      return;
    }

    setIsSending(true);

    try {
      // ---- Replace below with real API call ----
      // Example:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, subject, message }),
      // });

      // Simulate a network delay
      await new Promise((res) => setTimeout(res, 800));
      // ------------------------------------------

      // show success toast
      setShowSuccess(true);

      // clear form (optional)
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // auto-dismiss success after 3s
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setShowError("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover-elevate">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Email</p>
                    <a
                      href="mailto:colorido@rvrjc.ac.in"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email"
                    >
                      colorido@rvrjc.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover-elevate">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover-elevate">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Address</p>
                    <p className="text-sm text-muted-foreground">
                      RVR & JC College of Engineering
                      <br />
                      Chowdavaram, Guntur
                      <br />
                      Andhra Pradesh, India
                    </p>
                    <a
                      href="https://www.google.com/maps/place/R.V.R.+%26+J.C.College+of+Engineering/@16.2550606,80.6335915"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                      data-testid="link-map"
                    >
                      View on Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover-elevate">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Event Dates</p>
                    <p className="text-sm text-muted-foreground">December 17-18, 2025</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/colorido2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover-elevate active-elevate-2"
                  data-testid="link-instagram-contact"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Instagram</p>
                    <p className="text-xs text-muted-foreground">@colorido2025</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/colorido2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover-elevate active-elevate-2"
                  data-testid="link-linkedin-contact"
                >
                  <SiLinkedin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-sm">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Colorido 2025</p>
                  </div>
                </a>
              </div>
            </Card>

            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.8547724697344!2d80.63359151487784!3d16.255060588642357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7a8c3c3c3c3d%3A0x3c3c3c3c3c3c3c3c!2sR.V.R.%20%26%20J.C.College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RVR & JC College of Engineering Location"
              />
            </div>
          </div>

          <Card className="p-6 md:p-8 h-fit">
            <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {showError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{showError}</div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  placeholder="Your name"
                  data-testid="input-contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  data-testid="input-contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="What's this about?"
                  data-testid="input-contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Tell us more..."
                  className="min-h-[150px] resize-none"
                  data-testid="input-contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                data-testid="button-send-message"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Success toast (positioned bottom-right) */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex items-end justify-end pointer-events-none"
      >
        {showSuccess && (
          <div
            className="pointer-events-auto bg-white border border-border shadow-lg rounded-lg px-5 py-3 flex items-center gap-3"
            role="status"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium text-sm">Message sent</p>
              <p className="text-xs text-muted-foreground">Thanks — we'll get back to you soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

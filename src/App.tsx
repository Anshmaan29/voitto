import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ScrollExpansionHero } from "@/components/ui/scroll-expansion-hero";
import {
  Reveal,
  TextScrollAnimation,
} from "@/components/ui/text-scroll-animation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ScrollMemoryStack } from "@/components/ui/scroll-memory-stack";
import { PropertyGallery } from "@/components/ui/property-gallery";
import {
  WHATSAPP,
  PHONE,
  destinations,
  enquiryLink,
  faqs,
  founderFocus,
  properties,
  testimonials,
  type Property,
} from "@/data/content";
import privacy from "@/data/privacy-policy.json";
import terms from "@/data/terms-and-conditions.json";
import imageWidths from "@/data/image-widths.json";

function Picture({
  name,
  alt,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={`/media/${name}-800.webp`}
      srcSet={`/media/${name}-800.webp 800w, /media/${name}-1600.webp ${(imageWidths as Record<string, number>)[name] ?? 1600}w`}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
function WhatsAppButton({
  children = "Let’s plan your stay",
  variant = "solid",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "solid" | "glass" | "outline" | "light";
  className?: string;
}) {
  return (
    <LiquidButton asChild variant={variant} className={className}>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} />
        {children}
        <ArrowUpRight size={17} />
      </a>
    </LiquidButton>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const links = [
    ["#stays", "Our stays"],
    ["#experiences", "Experiences"],
    ["#story", "Our story"],
    ["#contact", "Get in touch"],
  ];
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="brand" aria-label="Voitto Ventures home">
        <img
          src="/media/voitto-logo.webp"
          width="84"
          height="63"
          alt="Voitto Ventures"
        />
        <span>
          VOITTO<small>VENTURES</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <WhatsAppButton variant="glass" className="header-enquiry">
        Enquire now
      </WhatsAppButton>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          className="menu-button icon-button"
          aria-label="Open navigation"
        >
          <Menu />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="mobile-menu">
            <div className="mobile-menu-top">
              <Dialog.Title>Voitto Ventures</Dialog.Title>
              <Dialog.Close
                className="icon-button"
                aria-label="Close navigation"
              >
                <X />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Explore our stays, experiences and story.
            </Dialog.Description>
            <nav aria-label="Mobile navigation">
              {links.map(([href, label], i) => (
                <a key={href} href={href} onClick={() => setOpen(false)}>
                  <span>0{i + 1}</span>
                  {label}
                  <ArrowUpRight />
                </a>
              ))}
            </nav>
            <WhatsAppButton />
            <p>Rajasthan, at your own pace.</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
function PropertyCard({
  property,
  index,
  onOpen,
}: {
  property: Property;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  return (
    <motion.article
      ref={ref}
      className={`property-card property-${index}`}
      initial={reduced ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="property-image"
        onClick={onOpen}
        aria-label={`Explore ${property.name}`}
      >
        <motion.div
          className="property-parallax"
          style={reduced ? undefined : { y }}
        >
          <Picture name={property.cover} alt={property.coverAlt} />
        </motion.div>
        <span className="property-number">0{index + 1}</span>
        <span className="gallery-hint">
          View photos & films <ArrowUpRight size={18} />
        </span>
      </button>
      <div className="property-info">
        <span className="eyebrow">{property.kind}</span>
        <div className="property-title">
          <h3>{property.name}</h3>
          <button
            onClick={onOpen}
            className="icon-button"
            aria-label={`Open ${property.name} gallery`}
          >
            <ArrowUpRight />
          </button>
        </div>
        <p>{property.tagline}</p>
        <div className="amenities">
          {property.amenities.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <button className="text-link" onClick={onOpen}>
          Explore the stay <ArrowRight size={17} />
        </button>
      </div>
    </motion.article>
  );
}
function Experiences() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-5%"]);
  return (
    <section id="experiences" ref={ref} className="experiences section-pad">
      <div className="section-heading">
        <Reveal>
          <span className="eyebrow">Beyond the room</span>
          <h2>
            Come for the stay.
            <br />
            <em>Stay for Rajasthan.</em>
          </h2>
        </Reveal>
        <Reveal className="section-aside">
          <p>
            Wander a little further. Let the landscapes, flavours and stories of
            Rajasthan become part of your journey.
          </p>
          <a
            href={enquiryLink(
              "Hello Voitto Ventures, I would like to know about Rajasthan experiences during my stay.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Plan an experience <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
      <div className="destination-grid">
        {destinations.map((d, i) => (
          <Reveal className="destination-card" delay={i * 0.04} key={d.image}>
            <div className="destination-image">
              <Picture
                name={d.image}
                alt={d.label}
                sizes="(max-width: 700px) 70vw, 25vw"
              />
              <span className="destination-index">0{i + 1}</span>
            </div>
            <span className="eyebrow">{d.label}</span>
            <h3>{d.title}</h3>
            <p>{d.description}</p>
          </Reveal>
        ))}
      </div>
      <div className="travel-type" aria-hidden="true">
        <motion.div style={reduced ? undefined : { x }}>
          RAJASTHAN <span>at your own pace</span>
        </motion.div>
      </div>
    </section>
  );
}
function Testimonials() {
  const [index, setIndex] = useState(0);
  return (
    <section className="testimonials section-pad" aria-label="Guest stories">
      <div className="testimonial-label">
        <span className="eyebrow">The memories you take home</span>
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
      </div>
      <div className="testimonial-body">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <blockquote>{testimonials[index].text}</blockquote>
            <figcaption>
              <span className="guest-avatar" aria-hidden="true">
                {testimonials[index].name[0]}
              </span>
              <span>
                {testimonials[index].name}
                <small>Voitto guest</small>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="testimonial-controls">
          <span aria-live="polite">
            0{index + 1}
            <span className="muted"> / 0{testimonials.length}</span>
          </span>
          <div>
            <button
              className="icon-button"
              aria-label="Previous guest story"
              onClick={() =>
                setIndex(
                  (i) => (i + testimonials.length - 1) % testimonials.length,
                )
              }
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="icon-button"
              aria-label="Next guest story"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function EnquiryForm() {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const guestName = String(data.get("name")).trim();
    if (guestName.length < 2) {
      const input = e.currentTarget.elements.namedItem(
        "name",
      ) as HTMLInputElement;
      input.setCustomValidity("Please enter your name.");
      input.reportValidity();
      return;
    }
    setName(guestName);
    const message = `Hello Voitto Ventures!\n\nI’m ${guestName}. I’d like to plan a stay or gathering.\nProperty: ${data.get("property")}\nOccasion: ${data.get("occasion")}\nGuests: ${data.get("guests")}\nPreferred date: ${data.get("date") || "Flexible"}${data.get("notes") ? `\nDetails: ${String(data.get("notes")).trim()}` : ""}\n\nPlease share availability and booking details.`;
    const url = enquiryLink(message);
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <h3>
        A few details.
        <br />A lovely beginning.
      </h3>
      <div className="form-grid">
        <label>
          Your name <span aria-hidden="true">*</span>
          <input
            name="name"
            placeholder="How should we address you?"
            autoComplete="name"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            required
            minLength={2}
            maxLength={80}
          />
        </label>
        <label>
          Preferred property
          <select name="property" defaultValue="Help me choose">
            <option>Help me choose</option>
            {properties.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          What are you planning?
          <select name="occasion" defaultValue="A relaxing stay">
            {[
              "A relaxing stay",
              "Wedding celebration",
              "Family function",
              "Corporate event",
              "School or college trip",
              "Tour group",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          Number of guests
          <select name="guests" defaultValue="1–4 guests">
            {[
              "1–4 guests",
              "5–20 guests",
              "21–50 guests",
              "51–100 guests",
              "More than 100 guests",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="full-field">
          Preferred date <span className="optional">(optional)</span>
          <input type="date" name="date" min={minDate} />
        </label>
        <label className="full-field">
          Anything else? <span className="optional">(optional)</span>
          <textarea
            name="notes"
            rows={2}
            maxLength={1000}
            placeholder="Tell us about your occasion, dates or special requests."
          />
        </label>
      </div>
      <LiquidButton type="submit">
        <MessageCircle size={18} /> Continue on WhatsApp{" "}
        <ArrowUpRight size={18} />
      </LiquidButton>
      <p className="form-note">
        Your details will open in a WhatsApp message for you to send. Our team
        will confirm availability and booking terms.
      </p>
      {link && (
        <div className="form-result" role="status">
          <Check size={18} />
          <span>
            Your message is ready, {name}. If WhatsApp didn’t open,{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              continue here <ArrowUpRight size={13} />
            </a>
            .
          </span>
        </div>
      )}
    </form>
  );
}
function LegalDialog({
  policy,
  onClose,
  onRestoreFocus,
}: {
  policy: "privacy" | "terms" | null;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  return (
    <Dialog.Root
      open={!!policy}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="legal-dialog"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onRestoreFocus();
          }}
        >
          <div className="gallery-heading">
            <Dialog.Title>
              {policy === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </Dialog.Title>
            <Dialog.Close className="icon-button" aria-label="Close policy">
              <X />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Information and booking policies for Voitto Ventures.
          </Dialog.Description>
          <div className="legal-text">
            {policy === "privacy" ? privacy : terms}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default function App() {
  const [property, setProperty] = useState<Property | null>(null);
  const galleryOpener = useRef<HTMLElement | null>(null);
  function openProperty(next: Property) {
    galleryOpener.current = document.activeElement as HTMLElement;
    setProperty(next);
  }
  const [policy, setPolicy] = useState<"privacy" | "terms" | null>(null);
  const policyOpener = useRef<HTMLElement | null>(null);
  function openPolicy(next: "privacy" | "terms") {
    policyOpener.current = document.activeElement as HTMLElement;
    setPolicy(next);
  }
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const policyPage =
    window.location.pathname.replace(/\/$/, "") === "/privacy-policy"
      ? "privacy"
      : window.location.pathname.replace(/\/$/, "") === "/terms-and-conditions"
        ? "terms"
        : null;
  if (policyPage)
    return (
      <div className="policy-page">
        <header>
          <a href="/" className="brand">
            <img src="/media/voitto-logo.webp" alt="Voitto Ventures" />
            <span>
              VOITTO<small>VENTURES</small>
            </span>
          </a>
          <a href="/" className="text-link">
            <ArrowLeft size={16} /> Back to our stays
          </a>
        </header>
        <main>
          <span className="eyebrow">Voitto Ventures</span>
          <h1>
            {policyPage === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <div className="legal-text">
            {policyPage === "privacy" ? privacy : terms}
          </div>
          <WhatsAppButton />
        </main>
        <footer>
          © {new Date().getFullYear()} Voitto Ventures · Rajasthan, India
        </footer>
      </div>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <Header />
      <main id="main">
        <ScrollExpansionHero>
          <motion.span
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Distinctive stays · Rajasthan, India
          </motion.span>
          <h1>
            <TextScrollAnimation text="Where heritage" />
            <br />
            <span className="hero-italic">
              <TextScrollAnimation text="feels like home." />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Some places invite you to visit.
            <br />
            Ours invite you to belong.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <LiquidButton asChild variant="light">
              <a href="#stays">
                Find your stay <ArrowDown size={17} />
              </a>
            </LiquidButton>
            <WhatsAppButton variant="glass">Talk to our team</WhatsAppButton>
          </motion.div>
        </ScrollExpansionHero>
        <section className="welcome section-pad">
          <Reveal className="welcome-mark">
            <span className="sun-mark" aria-hidden="true">
              <Sparkles size={35} strokeWidth={1} />
            </span>
            <span className="eyebrow">The Voitto way</span>
          </Reveal>
          <Reveal>
            <h2>
              <TextScrollAnimation text="Padharo mhare desh." />
            </h2>
            <p className="welcome-translation">A warm welcome to our land.</p>
          </Reveal>
          <Reveal className="welcome-copy">
            <p>
              Quiet mornings. Open skies. The kind of welcome that stays with
              you. At Voitto Ventures, we bring together distinctive stays and
              heartfelt hospitality in Rajasthan.
            </p>
            <p>Find a place that feels like you, and leave the rest to us.</p>
          </Reveal>
          <div className="welcome-footer">
            <span>FOUR DISTINCTIVE STAYS</span>
            <span>ONE WARM WELCOME</span>
            <span>COUNTLESS MEMORIES</span>
          </div>
        </section>
        <section id="stays" className="stays section-pad">
          <div className="section-heading">
            <Reveal>
              <span className="eyebrow">The collection</span>
              <h2>
                Different places.
                <br />
                <em>The same feeling.</em>
              </h2>
            </Reveal>
            <Reveal className="section-aside">
              <p>
                An Aravalli retreat, a private villa, a nature escape or a touch
                of royalty. Where will your next chapter begin?
              </p>
              <a href="#contact" className="text-link">
                Help me choose <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
          <div className="property-grid">
            {properties.map((p, i) => (
              <PropertyCard
                key={p.slug}
                property={p}
                index={i}
                onOpen={() => openProperty(p)}
              />
            ))}
          </div>
        </section>
        <section className="interlude" aria-label="Our hospitality">
          <ContainerScroll>
            <div className="interlude-inner">
              <span className="eyebrow">A little space to slow down</span>
              <h2>
                Less rush.
                <br />
                <em>More Rajasthan.</em>
              </h2>
              <p>
                Make room for long conversations, unhurried afternoons and
                moments worth remembering.
              </p>
              <WhatsAppButton variant="glass">Find your escape</WhatsAppButton>
              <ScrollMemoryStack onOpen={openProperty} />
              <span className="interlude-foot">Rajasthan · India</span>
            </div>
          </ContainerScroll>
        </section>
        <Experiences />
        <section id="dining" className="dining section-pad">
          <div className="section-heading">
            <Reveal>
              <span className="eyebrow">Around the table</span>
              <h2>
                A taste of the place.
                <br />
                <em>A moment to savour.</em>
              </h2>
            </Reveal>
            <Reveal className="section-aside">
              <p>
                From the warmth of Rajasthani flavours to a dinner under open
                skies, good food has a way of bringing everyone together.
              </p>
            </Reveal>
          </div>
          <div className="dining-grid">
            <Reveal className="dining-card dining-main">
              <Picture
                name="rajasthani-dining"
                alt="A Rajasthani spread featured on the original Voitto website"
              />
              <div>
                <span className="eyebrow">Rooted in Rajasthan</span>
                <h3>Flavours with a story.</h3>
              </div>
            </Reveal>
            <div className="dining-side">
              <Reveal className="dining-card">
                <Picture
                  name="dinner-on-the-dunes"
                  alt="Dinner on the dunes featured on the original Voitto website"
                />
                <div>
                  <span className="eyebrow">Dinner on the dunes</span>
                  <h3>An evening, a little extraordinary.</h3>
                </div>
              </Reveal>
              <Reveal className="dining-card">
                <Picture
                  name="sip-life"
                  alt="Dining and drinks featured on the original Voitto website"
                />
                <div>
                  <span className="eyebrow">Sip life’s moments</span>
                  <h3>Good company. Great conversations.</h3>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="dining-note">
            <p>
              Make a meal part of the memory. Ask our team about dining
              experiences for your stay.
            </p>
            <a
              className="text-link"
              href={enquiryLink(
                "Hello Voitto Ventures, I would like to enquire about dining experiences for my stay.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about dining <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section id="story" className="story section-pad">
          <Reveal className="story-intro">
            <span className="eyebrow">Built on a simple belief</span>
            <h2>
              Hospitality is personal.
              <br />
              <em>So is our story.</em>
            </h2>
            <p>
              Voitto Ventures brings together hotels, resorts and travel
              experiences with a commitment to quality, thoughtful service and
              lasting relationships. Our purpose is simple: make every guest
              feel valued.
            </p>
          </Reveal>
          <div className="founder-grid">
            <Reveal className="founder-image-wrap">
              <div className="founder-portrait">
                <Picture
                  name="founder-original"
                  alt="Harmendra Bhadouria, Founder of Voitto Ventures"
                />
              </div>
              <span className="founder-caption">
                HARMENDRA BHADOURIA <span>FOUNDER, VOITTO VENTURES</span>
              </span>
            </Reveal>
            <Reveal className="founder-copy">
              <span className="eyebrow">The vision behind Voitto</span>
              <h3>
                Harmendra
                <br />
                Bhadouria
              </h3>
              <span className="founder-role">
                Entrepreneur · Hospitality professional
              </span>
              <p>
                With a strong vision for hospitality and tourism, Harmendra
                founded Voitto Ventures to create exceptional experiences
                through hotels, resorts and travel services.
              </p>
              <p>
                His approach is built on quality, innovation, guest satisfaction
                and long-term partnerships, creating value for guests, partners
                and communities.
              </p>
              <blockquote>
                “To create hospitality experiences that people remember,
                businesses that grow sustainably, and partnerships that create
                long-term value.”
              </blockquote>
              <details className="founder-details">
                <summary>
                  Areas of focus <Plus size={18} />
                </summary>
                <div className="focus-list">
                  {founderFocus.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </details>
            </Reveal>
          </div>
        </section>
        <Testimonials />
        <section id="contact" className="contact section-pad">
          <Reveal className="contact-copy">
            <span className="eyebrow">Make it a Voitto memory</span>
            <h2>
              Your next chapter
              <br />
              <em>starts with hello.</em>
            </h2>
            <p>
              A quiet weekend, a family reunion or a celebration with everyone
              you love. Tell us what you have in mind. We’ll help you find your
              place.
            </p>
            <div className="contact-details">
              <a href="tel:+919269833333">
                <Phone size={20} />
                <span>
                  Give us a call<strong>{PHONE}</strong>
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                <span>
                  A conversation away<strong>Chat on WhatsApp</strong>
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="gathering-types">
              <span>Weddings</span>
              <span>Family gatherings</span>
              <span>Corporate retreats</span>
              <span>Group stays</span>
            </div>
          </Reveal>
          <Reveal>
            <EnquiryForm />
          </Reveal>
        </section>
        <section className="faq section-pad">
          <Reveal>
            <span className="eyebrow">Before you arrive</span>
            <h2>A few good questions.</h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <ChevronDown size={20} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer section-pad">
        <div className="footer-top">
          <a href="#home" className="footer-brand">
            <img
              src="/media/voitto-logo.webp"
              alt="Voitto Ventures"
              width="110"
              height="83"
            />
            <span>Voitto Ventures</span>
          </a>
          <p>
            Rajasthan, at your own pace.
            <br />
            Memories, for a lifetime.
          </p>
          <a href="#home" className="back-top">
            Back to top <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-columns">
          <div>
            <span className="eyebrow">Find your place</span>
            {properties.map((p) => (
              <button key={p.slug} onClick={() => openProperty(p)}>
                {p.name}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div>
            <span className="eyebrow">Explore Voitto</span>
            <a href="#experiences">Rajasthan experiences</a>
            <a href="#dining">Dining</a>
            <a href="#story">Our story & founder</a>
            <a href="#contact">Group enquiries</a>
          </div>
          <div>
            <span className="eyebrow">Stay connected</span>
            <a href="tel:+919269833333">{PHONE}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/akshay_garh_resort/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} /> Instagram
            </a>
            <span className="footer-location">Rajasthan, India</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Voitto Ventures</span>
          <div>
            <button onClick={() => openPolicy("privacy")}>
              Privacy Policy
            </button>
            <button onClick={() => openPolicy("terms")}>
              Terms & Conditions
            </button>
          </div>
          <span>Made for memorable stays.</span>
        </div>
      </footer>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat with Voitto Ventures on WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Let’s talk</span>
      </a>
      <PropertyGallery
        property={property}
        onClose={() => setProperty(null)}
        onRestoreFocus={() => galleryOpener.current?.focus()}
      />
      <LegalDialog
        policy={policy}
        onClose={() => setPolicy(null)}
        onRestoreFocus={() => policyOpener.current?.focus()}
      />
    </>
  );
}

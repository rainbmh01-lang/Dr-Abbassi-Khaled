import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3, Globe2, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import { clinicConfig } from '@/data/clinic';
import { languageLabels, type Copy, type Lang, translations } from '@/data/translations';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const languages: Lang[] = ['fr', 'en', 'ar'];

function Brand() {
  return (
    <a href="#top" className="brand" data-testid="link-brand" aria-label="Dr. Abbassi Khaled — home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-copy">
        <span className="brand-name">Abbassi Khaled</span>
        <span className="brand-subtitle">Dermatology / Private practice</span>
      </span>
    </a>
  );
}

function LanguageMenu({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button className="lang-switch" type="button" onClick={() => setOpen((value) => !value)} data-testid="button-language-menu" aria-expanded={open}>
        <Globe2 size={14} strokeWidth={1.5} />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown size={13} strokeWidth={1.5} />
      </button>
      {open && (
        <div className="lang-menu" role="menu">
          {languages.map((option) => (
            <button
              className={`lang-option ${option === lang ? 'active' : ''}`}
              type="button"
              key={option}
              onClick={() => { setLang(option); setOpen(false); }}
              data-testid={`button-language-${option}`}
              role="menuitem"
            >
              <span>{languageLabels[option]}</span>
              {option === lang && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ copy, lang, setLang }: { copy: Copy; lang: Lang; setLang: (lang: Lang) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Brand />
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Primary navigation">
          <a className="nav-link" href="#practice" onClick={close} data-testid="link-practice">{copy.nav.practice}</a>
          <a className="nav-link" href="#about" onClick={close} data-testid="link-about">{copy.nav.about}</a>
          <a className="nav-link" href="#services" onClick={close} data-testid="link-services">{copy.nav.services}</a>
          <a className="nav-link" href="#approach" onClick={close} data-testid="link-approach">{copy.nav.approach}</a>
          <a className="nav-link" href="#feature" onClick={close} data-testid="link-feature">{copy.nav.feature}</a>
          <a className="nav-link" href="#journal" onClick={close} data-testid="link-journal">{copy.nav.journal}</a>
          <a className="nav-link" href="#clinic" onClick={close} data-testid="link-clinic">{copy.nav.clinic}</a>
          <a className="nav-link" href="#contact" onClick={close} data-testid="link-contact">{copy.nav.contact}</a>
        </nav>
        <div className="nav-actions">
          <div className="relative"><LanguageMenu lang={lang} setLang={setLang} /></div>
          <a className="nav-book" href="#appointment" data-testid="link-header-appointment">{copy.nav.appointment}</a>
          <button className="menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} data-testid="button-mobile-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="hero" id="top" data-testid="section-hero">
      <div>
        <div className="eyebrow">{copy.hero.eyebrow}</div>
        <h1 data-testid="text-hero-title">{copy.hero.title}</h1>
        <p className="hero-copy text-balance" data-testid="text-hero-copy">{copy.hero.copy}</p>
        <div className="hero-cta-row">
          <a className="button-primary" href="#appointment" data-testid="link-hero-appointment">{copy.hero.primary}<ArrowUpRight size={16} /></a>
          <a className="button-quiet" href="#approach" data-testid="link-hero-approach">{copy.hero.secondary}<ArrowDown size={14} /></a>
        </div>
        <div className="hero-note">
          <span><ShieldCheck size={14} /> {copy.hero.noteOne}</span>
          <span><Sparkles size={14} /> {copy.hero.noteTwo}</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Abstract skin-inspired architectural artwork">
        <div className="art-frame">
          <div className="art-grid" />
          <div className="art-caption"><span>{copy.hero.artLabel}</span><span>AK / 2025</span></div>
        </div>
        <div className="art-stamp">{copy.hero.stamp}</div>
        <div className="scroll-mark">{copy.hero.scroll}</div>
      </div>
    </section>
  );
}

function PracticeSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="practice" data-testid="section-practice">
      <div className="section-heading">
        <div>
          <div className="section-kicker">{copy.manifesto.kicker}</div>
          <h2 className="section-title text-balance">{copy.manifesto.title}</h2>
        </div>
      </div>
      <div className="manifesto">
        <p className="manifesto-lead text-balance" data-testid="text-practice-lead">{copy.manifesto.lead}</p>
        <div className="manifesto-side">
          <p>{copy.manifesto.side}</p>
          <div className="number-line"><span>01</span><span>{copy.manifesto.place}</span></div>
          <div className="number-line"><span>02</span><span>{copy.manifesto.detail}</span></div>
          <div className="number-line"><span>03</span><span>{copy.manifesto.booking}</span></div>
          <span className="placeholder-note">Editable clinic details</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ copy }: { copy: Copy }) {
  return (
    <section className="section section-tinted" id="about" data-testid="section-about">
      <div className="section-inner">
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.about.kicker}</div>
            <h2 className="section-title text-balance">{copy.about.title}</h2>
          </div>
        </div>
        <div className="doctor-layout">
          <div className="doctor-portrait" aria-label="Abstract doctor portrait placeholder">
            <div className="portrait-grid" />
            <div className="portrait-label"><span>AK / portrait placeholder</span><span>02</span></div>
          </div>
          <div className="doctor-copy">
            <p data-testid="text-doctor-intro">{copy.about.intro}</p>
            <p>{copy.about.note}</p>
            <div className="doctor-facts">
              {copy.about.facts.map((fact) => (
                <div className="doctor-fact" key={fact.label} data-testid={`fact-doctor-${fact.label}`}>
                  <span className="doctor-fact-label">{fact.label}</span>
                  <span className="doctor-fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
            <span className="placeholder-note" style={{ marginTop: '1.25rem' }}>Editable doctor profile</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="services" data-testid="section-services">
      <div className="section-heading">
        <div>
          <div className="section-kicker">{copy.services.kicker}</div>
          <h2 className="section-title text-balance">{copy.services.title}</h2>
        </div>
        <p className="section-intro">{copy.services.intro}</p>
      </div>
      <div className="service-grid">
        {copy.services.items.map((item) => (
          <article className="service-card" key={item.index} data-testid={`card-service-${item.index}`}>
            <div>
              <div className="service-index">{item.index}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <span className="placeholder-note">Editable category</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="feature" data-testid="section-feature">
      <div className="feature-panel">
        <div className="feature-art" aria-label="Abstract treatment technology placeholder">
          <div className="feature-art-grid" />
          <div className="feature-art-label">{copy.feature.label}</div>
        </div>
        <div className="feature-copy">
          <div className="section-kicker">{copy.feature.kicker}</div>
          <h3>{copy.feature.title}</h3>
          <p>{copy.feature.body}</p>
          <span className="placeholder-note">{copy.feature.note}</span>
        </div>
      </div>
    </section>
  );
}

function ApproachSection({ copy }: { copy: Copy }) {
  return (
    <section className="section section-tinted" id="approach" data-testid="section-approach">
      <div className="section-inner">
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.approach.kicker}</div>
            <h2 className="section-title text-balance">{copy.approach.title}</h2>
          </div>
          <p className="section-intro">{copy.approach.intro}</p>
        </div>
        <div className="approach-grid">
          {copy.approach.items.map((item) => (
            <article className="approach-item" key={item.index} data-testid={`card-approach-${item.index}`}>
              <div className="approach-index">{item.index}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalSection({ copy }: { copy: Copy }) {
  return (
    <section className="section section-tinted" id="journal" data-testid="section-journal">
      <div className="section-inner">
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.journal.kicker}</div>
            <h2 className="section-title text-balance">{copy.journal.title}</h2>
          </div>
          <p className="section-intro">{copy.journal.intro}</p>
        </div>
        <div className="journal-grid">
          {copy.journal.items.map((item) => (
            <article className="journal-card" key={item.date} data-testid={`card-journal-${item.date}`}>
              <div>
                <div className="journal-meta"><span>{item.date}</span><span>Editorial placeholder</span></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <a href="#appointment" className="journal-link" data-testid={`link-journal-${item.date}`}>{copy.journal.read}<ArrowUpRight size={14} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpeningHours({ copy }: { copy: Copy }) {
  return (
    <div className="hours-list" data-testid="opening-hours-list">
      {copy.clinic.hours.map((row) => (
        <div className="hours-row" key={row.day} data-testid={`hours-${row.day}`}>
          <strong>{row.day}</strong>
          <span>{row.time}</span>
        </div>
      ))}
    </div>
  );
}

function ClinicSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="clinic" data-testid="section-clinic">
      <div className="section-heading">
        <div>
          <div className="section-kicker">{copy.clinic.kicker}</div>
          <h2 className="section-title text-balance">{copy.clinic.title}</h2>
        </div>
        <p className="section-intro">{copy.clinic.intro}</p>
      </div>
      <div className="clinic-layout">
        <div className="clinic-details">
          <div className="clinic-detail">
            <MapPin size={17} />
            <div><h3>{copy.clinic.addressLabel}</h3><p>{copy.clinic.address}</p></div>
          </div>
          <div className="clinic-detail">
            <Phone size={17} />
            <div><h3>{copy.clinic.phoneLabel}</h3><p>{copy.clinic.phone}</p></div>
          </div>
          <div className="clinic-detail">
            <Phone size={17} />
            <div><h3>{copy.clinic.whatsappLabel}</h3><p>{copy.clinic.whatsapp}</p></div>
          </div>
          <div className="clinic-detail">
            <Clock3 size={17} />
            <div><h3>{copy.clinic.hoursLabel}</h3><OpeningHours copy={copy} /></div>
          </div>
          <span className="placeholder-note" style={{ marginTop: '1.25rem' }}>Editable clinic information</span>
        </div>
        <div className="map-placeholder" aria-label={copy.clinic.mapLabel}>
          <div className="map-pin"><MapPin size={19} /></div>
          <div className="map-label">{copy.clinic.mapLabel}</div>
        </div>
      </div>
    </section>
  );
}

function AppointmentForm({ copy }: { copy: Copy }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <div className="form-panel" id="appointment" data-testid="appointment-form-panel">
      {sent ? (
        <div className="success-state" data-testid="status-appointment-success">
          <div className="success-icon"><Check size={20} /></div>
          <h3>{copy.contact.sentTitle}</h3>
          <p>{copy.contact.sentCopy}</p>
          <button className="button-quiet" type="button" onClick={() => setSent(false)} data-testid="button-send-another">{copy.contact.sendAnother}<ArrowUpRight size={14} /></button>
        </div>
      ) : (
        <>
          <h3 className="form-title">{copy.contact.formTitle}</h3>
          <p className="form-copy">{copy.contact.formCopy}</p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="full-name">{copy.contact.name}</label>
                <input id="full-name" name="name" required data-testid="input-full-name" />
              </div>
              <div className="field">
                <label htmlFor="email">{copy.contact.email}</label>
                <input id="email" name="email" type="email" required data-testid="input-email" />
              </div>
              <div className="field">
                <label htmlFor="phone">{copy.contact.phone}</label>
                <input id="phone" name="phone" type="tel" data-testid="input-phone" />
              </div>
              <div className="field">
                <label htmlFor="preferred-date">{copy.contact.preferredDate}</label>
                <input id="preferred-date" name="preferredDate" type="date" required data-testid="input-preferred-date" />
              </div>
              <div className="field">
                <label htmlFor="preferred-time">{copy.contact.preferredTime}</label>
                <input id="preferred-time" name="preferredTime" type="time" required data-testid="input-preferred-time" />
              </div>
              <div className="field">
                <label htmlFor="reason">{copy.contact.reason}</label>
                <select id="reason" name="reason" defaultValue="" data-testid="select-reason">
                  <option value="" disabled>{copy.contact.reasonPlaceholder}</option>
                  {copy.contact.reasonOptions.map((reason) => <option key={reason}>{reason}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="message">{copy.contact.message}</label>
                <textarea id="message" name="message" placeholder={copy.contact.messagePlaceholder} data-testid="textarea-message" />
              </div>
            </div>
            <div className="form-footer">
              <p className="form-legal">{copy.contact.privacy}</p>
              <button className="button-primary" type="submit" data-testid="button-submit-appointment">{copy.contact.submit}<Send size={15} /></button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

function ContactSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="contact" data-testid="section-contact">
      <div className="contact-layout">
        <div>
          <div className="section-kicker">{copy.contact.kicker}</div>
          <h2 className="section-title text-balance">{copy.contact.title}</h2>
          <p className="section-intro">{copy.contact.intro}</p>
          <div className="contact-list">
            <div className="contact-row">
              <MapPin size={17} />
              <div><span className="contact-label">{copy.contact.locationLabel}</span><span className="contact-value placeholder">{copy.contact.location}</span></div>
            </div>
            <div className="contact-row">
              <Clock3 size={17} />
              <div><span className="contact-label">{copy.contact.availabilityLabel}</span><span className="contact-value placeholder">{copy.contact.availability}</span></div>
            </div>
            <div className="contact-row">
              <Mail size={17} />
              <div><span className="contact-label">{copy.contact.emailLabel}</span><span className="contact-value placeholder">{copy.contact.emailValue}</span></div>
            </div>
          </div>
        </div>
        <AppointmentForm copy={copy} />
      </div>
    </section>
  );
}

function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="footer" data-testid="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div>
            <Brand />
            <p className="footer-tagline">{copy.footer.tagline}</p>
          </div>
          <div className="footer-meta">
            <div><strong>{copy.contact.locationLabel}</strong>{copy.contact.location}</div>
            <div><strong>{copy.contact.emailLabel}</strong>{copy.contact.emailValue}</div>
          </div>
        </div>
        <p className="placeholder-note" style={{ color: 'hsl(var(--primary-foreground) / .68)', marginBottom: '1.1rem' }}>{copy.footer.note}</p>
        <div className="footer-bottom"><span>{copy.footer.bottomLeft}</span><span>{copy.footer.bottomRight}</span></div>
      </div>
    </footer>
  );
}

function QuickActions({ copy }: { copy: Copy }) {
  const phoneHref = clinicConfig.phone ? `tel:${clinicConfig.phone}` : '#clinic';
  const whatsappHref = clinicConfig.whatsapp ? `https://wa.me/${clinicConfig.whatsapp}` : '#clinic';
  return (
    <div className="quick-actions" aria-label="Quick contact actions">
      <a className="quick-action" href={phoneHref} aria-label={copy.quickCall} data-testid="link-quick-call"><Phone size={17} /></a>
      <a className="quick-action" href={whatsappHref} aria-label={copy.quickWhatsApp} data-testid="link-quick-whatsapp"><MessageCircle size={17} /></a>
      <a className="quick-action" href="#appointment" aria-label={copy.quickAppointment} data-testid="link-quick-appointment"><Send size={17} /></a>
      <a className="quick-action" href={clinicConfig.mapUrl || '#clinic'} aria-label={copy.quickLocation} data-testid="link-quick-location"><MapPin size={17} /></a>
    </div>
  );
}

function Home() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = window.localStorage.getItem('abbassi-language');
    return saved === 'en' || saved === 'ar' || saved === 'fr' ? saved : 'fr';
  });
  const copy = translations[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('abbassi-language', lang);
  }, [lang]);
  return (
    <div className="site-shell grain" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header copy={copy} lang={lang} setLang={setLang} />
      <main>
        <Hero copy={copy} />
        <PracticeSection copy={copy} />
        <AboutSection copy={copy} />
        <ServicesSection copy={copy} />
        <ApproachSection copy={copy} />
        <FeatureSection copy={copy} />
        <JournalSection copy={copy} />
        <ClinicSection copy={copy} />
        <ContactSection copy={copy} />
      </main>
      <Footer copy={copy} />
      <QuickActions copy={copy} />
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

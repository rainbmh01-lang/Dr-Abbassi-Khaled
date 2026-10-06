import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowUpRight, Calendar as CalendarIcon, Check, ChevronDown, Clock3, Globe2, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShieldCheck, Sparkles, User, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FrenchCalendar } from '@/components/french-calendar';
import { clinicConfig } from '@/data/clinic';
import { languageLabels, type Copy, type Lang, translations } from '@/data/translations';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import {
  ScrollProgressBar,
  Reveal,
  StaggerContainer,
  StaggerItem,
  ParallaxHero,
} from '@/components/scroll-animations';

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

function Header({ copy }: { copy: Copy }) {
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
          <a className="nav-link" href="#clinic" onClick={close} data-testid="link-clinic">{copy.nav.clinic}</a>
          <a className="nav-link" href="#contact" onClick={close} data-testid="link-contact">{copy.nav.contact}</a>
        </nav>
        <div className="nav-actions">
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
      <Reveal>
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
      </Reveal>
      <ParallaxHero className="hero-art">
        <div className="art-frame" aria-label="Dr. Abbassi Khaled — Dermatologist">
          <img
            src="/dr-abbassi-khaled.jpg"
            alt="Dr. Abbassi Khaled — Dermatologist"
            className="art-image"
          />
          <div className="art-overlay" />
          <div className="art-caption"><span>{copy.hero.artLabel}</span><span>AK / 2025</span></div>
        </div>
        <div className="art-stamp">{copy.hero.stamp}</div>
        <div className="scroll-mark">{copy.hero.scroll}</div>
      </ParallaxHero>
    </section>
  );
}

function PracticeSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="practice" data-testid="section-practice">
      <Reveal>
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.manifesto.kicker}</div>
            <h2 className="section-title text-balance">{copy.manifesto.title}</h2>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="manifesto">
          <p className="manifesto-lead text-balance" data-testid="text-practice-lead">{copy.manifesto.lead}</p>
          <div className="manifesto-side">
            <p>{copy.manifesto.side}</p>
            <div className="number-line"><span>01</span><span>{copy.manifesto.place}</span></div>
            <div className="number-line"><span>02</span><span>{copy.manifesto.detail}</span></div>
            <div className="number-line"><span>03</span><span>{copy.manifesto.booking}</span></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function AboutSection({ copy }: { copy: Copy }) {
  return (
    <section className="section section-tinted" id="about" data-testid="section-about">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="section-kicker">{copy.about.kicker}</div>
              <h2 className="section-title text-balance">{copy.about.title}</h2>
            </div>
          </div>
        </Reveal>
        <div className="doctor-layout">
          <Reveal delay={0.1}>
            <div className="doctor-frame-wrapper">
              <div className="doctor-portrait" aria-label="Dr. Abbassi Khaled">
                <img
                  src="/dr-abbassi-office.jpg"
                  alt="Dr. Abbassi Khaled"
                  className="doctor-image"
                />
              </div>
              <div className="portrait-label">
                <span>DR. ABBASSI KHALED</span>
                <span>02</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="doctor-copy">
            <p data-testid="text-doctor-intro">{copy.about.intro}</p>
            {copy.about.note ? <p>{copy.about.note}</p> : null}
            <StaggerContainer className="doctor-facts">
              {copy.about.facts.map((fact) => (
                <StaggerItem className="doctor-fact" key={fact.label} data-testid={`fact-doctor-${fact.label}`}>
                  <span className="doctor-fact-label">{fact.label}</span>
                  <span className="doctor-fact-value">{fact.value}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="services" data-testid="section-services">
      <Reveal>
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.services.kicker}</div>
            <h2 className="section-title text-balance">{copy.services.title}</h2>
          </div>
          <p className="section-intro">{copy.services.intro}</p>
        </div>
      </Reveal>
      <StaggerContainer className="service-grid">
        {copy.services.items.map((item) => (
          <StaggerItem key={item.index}>
            <article className="service-card" data-testid={`card-service-${item.index}`}>
              <div>
                <div className="service-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function FeatureSection({ copy }: { copy: Copy }) {
  return (
    <section className="section" id="feature" data-testid="section-feature">
      <Reveal>
        <div className="feature-panel">
          <div className="feature-art" aria-label="Technologie laser au cabinet">
            <img
              src="/laser-treatment.jpg"
              alt="Plateau technique laser — Cabinet Dr. Abbassi Khaled"
              className="feature-image"
            />
            <div className="feature-art-label">{copy.feature.label}</div>
          </div>
          <div className="feature-copy">
            <div className="section-kicker">{copy.feature.kicker}</div>
            <h3>{copy.feature.title}</h3>
            <p>{copy.feature.body}</p>
            <span className="feature-subtext">{copy.feature.note}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ApproachSection({ copy }: { copy: Copy }) {
  return (
    <section className="section section-tinted" id="approach" data-testid="section-approach">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="section-kicker">{copy.approach.kicker}</div>
              <h2 className="section-title text-balance">{copy.approach.title}</h2>
            </div>
            <p className="section-intro">{copy.approach.intro}</p>
          </div>
        </Reveal>
        <StaggerContainer className="approach-grid">
          {copy.approach.items.map((item) => (
            <StaggerItem key={item.index}>
              <article className="approach-item" data-testid={`card-approach-${item.index}`}>
                <div className="approach-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
      <Reveal>
        <div className="section-heading">
          <div>
            <div className="section-kicker">{copy.clinic.kicker}</div>
            <h2 className="section-title text-balance">{copy.clinic.title}</h2>
          </div>
          <p className="section-intro">{copy.clinic.intro}</p>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
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
          </div>
          <a
            className="clinic-map-wrapper"
            href={clinicConfig.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.clinic.mapLabel}
            data-testid="link-clinic-map"
          >
            <iframe
              src="https://maps.google.com/maps?q=36.9078012,7.7522037&hl=fr&z=17&output=embed"
              className="clinic-map-iframe"
              title="Localisation du Cabinet Dr Abbassi Khaled"
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="clinic-map-bar">
              <span>{copy.clinic.mapLabel}</span>
              <span className="clinic-map-action">Ouvrir dans Google Maps ↗</span>
            </div>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

const TIME_SLOTS = [
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
];

function AppointmentForm({ copy }: { copy: Copy }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorNotice(null);

    if (!fullName.trim()) {
      setErrorNotice('Veuillez renseigner votre nom complet.');
      return;
    }

    if (!phone.trim()) {
      setErrorNotice('Veuillez renseigner votre numéro de téléphone.');
      return;
    }

    if (!selectedDate) {
      setErrorNotice('Veuillez choisir une date souhaitée pour votre rendez-vous.');
      return;
    }

    if (!selectedTime) {
      setErrorNotice('Veuillez choisir un créneau horaire.');
      return;
    }

    const formattedDate = format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr });
    const formattedDateShort = format(selectedDate, 'dd/MM/yyyy');

    const lines = [
      'Bonjour Dr. Abbassi Khaled,',
      '',
      'Je souhaite demander un rendez-vous à votre cabinet :',
      '',
      `👤 *Nom complet* : ${fullName.trim()}`,
      `📞 *Téléphone* : ${phone.trim()}`,
      `📅 *Date souhaitée* : ${formattedDate} (${formattedDateShort})`,
      `⏰ *Heure souhaitée* : ${selectedTime}`,
    ];

    if (reason) {
      lines.push(`🩺 *Motif* : ${reason}`);
    }
    if (message.trim()) {
      lines.push(`💬 *Message* : ${message.trim()}`);
    }

    lines.push('', 'Merci de bien vouloir me confirmer la disponibilité du créneau.');

    const whatsappText = lines.join('\n');
    const targetNumber = clinicConfig.whatsapp || '213799979960';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(whatsappText)}`;

    setLastWhatsappUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  return (
    <div className="form-panel" id="appointment" data-testid="appointment-form-panel">
      {sent ? (
        <div className="success-state" data-testid="status-appointment-success">
          <div className="success-icon"><Check size={20} /></div>
          <h3>{copy.contact.sentTitle}</h3>
          <p>{copy.contact.sentCopy}</p>
          <div className="success-actions flex flex-wrap gap-3 mt-4">
            {lastWhatsappUrl && (
              <a
                href={lastWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-whatsapp inline-flex items-center gap-2"
              >
                <FaWhatsapp size={16} />
                <span>Ouvrir WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            )}
            <button
              className="button-quiet"
              type="button"
              onClick={() => {
                setSent(false);
                setFullName('');
                setPhone('');
                setSelectedDate(undefined);
                setSelectedTime('');
                setReason('');
                setMessage('');
                setErrorNotice(null);
              }}
              data-testid="button-send-another"
            >
              {copy.contact.sendAnother}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="form-title">{copy.contact.formTitle}</h3>
          <p className="form-copy">{copy.contact.formCopy}</p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="full-name">{copy.contact.name}</label>
                <div className="input-with-icon">
                  <User size={15} className="field-icon" />
                  <input
                    id="full-name"
                    name="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Mohamed Benali"
                    required
                    data-testid="input-full-name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="phone">{copy.contact.phone}</label>
                <div className="input-with-icon">
                  <Phone size={15} className="field-icon" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\s]/g, ''))}
                    placeholder="Ex: 07 99 97 99 60"
                    required
                    data-testid="input-phone"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="preferred-date">{copy.contact.preferredDate}</label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      id="preferred-date"
                      className="date-picker-button"
                      data-testid="input-preferred-date"
                      aria-label="Sélectionner une date"
                    >
                      <CalendarIcon size={15} className="field-icon" />
                      <span className={selectedDate ? 'date-picker-text selected' : 'date-picker-text placeholder'}>
                        {selectedDate
                          ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })
                          : 'Choisir une date...'}
                      </span>
                      <ChevronDown size={14} className="opacity-50 shrink-0" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit p-0 bg-background border border-border shadow-2xl rounded-none z-50"
                    align="start"
                  >
                    <FrenchCalendar
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setCalendarOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="field">
                <label htmlFor="preferred-time">{copy.contact.preferredTime}</label>
                <div className="input-with-icon">
                  <Clock3 size={15} className="field-icon" />
                  <select
                    id="preferred-time"
                    name="preferredTime"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    data-testid="select-preferred-time"
                  >
                    <option value="" disabled>Choisir une heure (08:30 – 16:30)</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field full">
                <label htmlFor="reason">{copy.contact.reason}</label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  data-testid="select-reason"
                >
                  <option value="" disabled>{copy.contact.reasonPlaceholder}</option>
                  {copy.contact.reasonOptions.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="message">{copy.contact.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.contact.messagePlaceholder}
                  data-testid="textarea-message"
                />
              </div>
            </div>
            {errorNotice && (
              <div className="form-error-notice">
                {errorNotice}
              </div>
            )}
            <div className="form-footer">
              <p className="form-legal">{copy.contact.privacy}</p>
              <button
                className="button-whatsapp"
                type="submit"
                data-testid="button-submit-appointment"
              >
                <FaWhatsapp size={18} />
                <span>{copy.contact.submit}</span>
              </button>
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
      <Reveal>
        <div className="contact-layout">
          <div>
            <div className="section-kicker">{copy.contact.kicker}</div>
            <h2 className="section-title text-balance">{copy.contact.title}</h2>
            <p className="section-intro">{copy.contact.intro}</p>
            <div className="contact-list">
              <div className="contact-row">
                <MapPin size={17} />
                <div><span className="contact-label">{copy.contact.locationLabel}</span><span className="contact-value">{copy.contact.location}</span></div>
              </div>
              <div className="contact-row">
                <Clock3 size={17} />
                <div><span className="contact-label">{copy.contact.availabilityLabel}</span><span className="contact-value">{copy.contact.availability}</span></div>
              </div>
              <div className="contact-row">
                <Phone size={17} />
                <div><span className="contact-label">{copy.contact.emailLabel}</span><span className="contact-value">{copy.contact.emailValue}</span></div>
              </div>
            </div>
          </div>
          <AppointmentForm copy={copy} />
        </div>
      </Reveal>
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
  const [lang] = useState<Lang>('fr');
  const copy = translations[lang];
  useEffect(() => {
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem('abbassi-language', 'fr');
  }, []);
  return (
    <div className="site-shell grain" dir="ltr">
      <ScrollProgressBar />
      <Header copy={copy} />
      <main>
        <Hero copy={copy} />
        <PracticeSection copy={copy} />
        <AboutSection copy={copy} />
        <ServicesSection copy={copy} />
        <ApproachSection copy={copy} />
        <FeatureSection copy={copy} />
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

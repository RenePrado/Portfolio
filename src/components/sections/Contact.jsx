import { profile } from '../../data/profile';
import CopyEmail from '../ui/CopyEmail';
import { ExternalIcon } from '../ui/Icons';

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="grid12">
        <div className="section-head" data-spec="--step-4 · grid 1–12">
          <p className="mono section-index">06 — Contact</p>
          <h2 id="contact-title" className="section-title">
            Contact
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>

      <div className="contact" data-reveal>
        <p className="contact__email-wrap">
          <a
            className="contact__email"
            href={`mailto:${profile.email}`}
            data-spec="--step-5 · Fraunces"
          >
            {profile.email}
          </a>
          <CopyEmail email={profile.email} />
        </p>

        <ul className="contact__rows mono">
          <li>
            <span className="contact__key">GitHub</span>
            <a
              className="u-draw"
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.github} <ExternalIcon />
            </a>
          </li>
          <li>
            <span className="contact__key">LinkedIn</span>
            <a
              className="u-draw"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.linkedinLabel} <ExternalIcon />
            </a>
          </li>
          <li>
            <span className="contact__key">Phone</span>
            <a className="u-draw" href={`tel:${profile.phoneTel}`} aria-label={profile.phoneAria}>
              {profile.phoneDisplay}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

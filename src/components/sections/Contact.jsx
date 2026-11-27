import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import CopyEmail from '../ui/CopyEmail';
import { ExternalIcon } from '../ui/Icons';

export default function Contact() {
  const [showPhone, setShowPhone] = useState(false);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (showPhone) phoneRef.current?.focus();
  }, [showPhone]);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="grid12">
        <div className="section-head">
          <h2 id="contact-title" className="section-title">
            Contact
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>

      <div className="contact">
        <p className="contact__email-wrap">
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email.split('@')[0]}
            <wbr />@{profile.email.split('@')[1]}
          </a>
          <CopyEmail email={profile.email} />
        </p>

        <ul className="contact__rows">
          <li>
            <span className="contact__key">GitHub</span>
            <a
              className="contact__ext"
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__ext-text u-draw">{profile.github}</span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <span className="contact__key">LinkedIn</span>
            <a
              className="contact__ext"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__ext-text u-draw">{profile.linkedinLabel}</span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <span className="contact__key">Résumé</span>
            <a
              className="contact__ext"
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__ext-text u-draw">{profile.resumeFileName}</span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <span className="contact__key">Phone</span>
            {showPhone ? (
              <a ref={phoneRef} className="u-draw" href={`tel:${profile.phoneTel}`}>
                {profile.phonePretty}
              </a>
            ) : (
              <button
                type="button"
                className="contact__reveal mono"
                onClick={() => setShowPhone(true)}
              >
                Show phone number
              </button>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}

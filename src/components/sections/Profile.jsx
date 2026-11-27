import { aboutParagraphs } from '../../data/about';
import { stackGroups } from '../../data/stack';

// Profile + Toolkit — replaces the old About and Stack sections.
export default function Profile() {
  return (
    <section id="profile" className="section" aria-labelledby="profile-title">
      <div className="grid12">
        <div className="section-head">
          <h2 id="profile-title" className="section-title">
            Profile
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="profile">
        <div className="profile__about">
          {aboutParagraphs.map((p) => (
            <p key={p} className="profile__text">
              {p}
            </p>
          ))}
        </div>
        <div className="profile__toolkit">
          <h3 className="mono profile__toolkit-title">Toolkit</h3>
          {stackGroups.map((g) => (
            <div className="toolkit__group" key={g.label}>
              <p className="mono toolkit__label">{g.label}</p>
              <p className="toolkit__items">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { MenuBar } from './MenuBar';
import { AboutMacWindow } from './AboutMacWindow';
import { AboutTextWindow } from './AboutTextWindow';
import { SkillsIconWindow } from './SkillsIconWindow';
import { ProcessListWindow } from './ProcessListWindow';
import { ProjectsIconWindow } from './ProjectsIconWindow';
import { KernelViewWidget } from './KernelViewWidget';
import { TrashContactIcon } from './TrashContactIcon';
import { ContactWindow } from './ContactWindow';
import type { WindowId } from './types';
import styles from './Desktop.module.css';

const DEFAULT_ORDER: WindowId[] = ['about-mac', 'about-text', 'skills', 'process-list', 'projects'];

export function Desktop() {
  const [order, setOrder] = useState<WindowId[]>(DEFAULT_ORDER);
  const [contactOpen, setContactOpen] = useState(false);

  const bringToFront = (id: WindowId) => {
    setOrder((prev) => [...prev.filter((existing) => existing !== id), id]);
  };

  const zIndexFor = (id: WindowId) => {
    const index = order.indexOf(id);
    return index === -1 ? 1 : index + 1;
  };

  const handleNavigate = (id: WindowId) => {
    bringToFront(id);
    document.getElementById(`window-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.desktop}>
      <MenuBar onNavigate={handleNavigate} />

      <AboutMacWindow zIndex={zIndexFor('about-mac')} onFocus={() => bringToFront('about-mac')} />
      <AboutTextWindow zIndex={zIndexFor('about-text')} onFocus={() => bringToFront('about-text')} />
      <SkillsIconWindow zIndex={zIndexFor('skills')} onFocus={() => bringToFront('skills')} />
      <ProcessListWindow zIndex={zIndexFor('process-list')} onFocus={() => bringToFront('process-list')} />
      <ProjectsIconWindow zIndex={zIndexFor('projects')} onFocus={() => bringToFront('projects')} />

      <KernelViewWidget />

      <TrashContactIcon
        onOpen={() => {
          setContactOpen(true);
          bringToFront('contact');
        }}
      />
      {contactOpen && (
        <ContactWindow
          zIndex={zIndexFor('contact')}
          onFocus={() => bringToFront('contact')}
          onClose={() => setContactOpen(false)}
        />
      )}
    </div>
  );
}

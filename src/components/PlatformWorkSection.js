import Box from '@ux/box';
import Card, { spaceOptions } from '@ux/card';
import Tag from '@ux/tag';
import text from '@ux/text';
import {
  PLATFORM_STATUS,
  STATUS_LABELS,
} from '../data/platform-status';

import '@ux/box/styles';
import '@ux/card/styles';
import '@ux/tag/styles';
import '@ux/text/styles';

function StatusTag({ status }) {
  const meta = STATUS_LABELS[status] || STATUS_LABELS.local;
  return (
    <Tag emphasis={meta.emphasis} size="sm" indicator>
      {meta.label}
    </Tag>
  );
}

function PlatformWorkSection({ id = 'platform-system-work' }) {
  const data = PLATFORM_STATUS;
  const cardSpace = { inline: spaceOptions.MD, block: spaceOptions.MD, gap: spaceOptions.SM };

  return (
    <section className="platform-work" aria-labelledby={id}>
      <Box gap="lg" inlinePadding="lg" blockPadding="lg" elevation="card">
        <div>
          <text.h2 as="title" id={id}>
            {data.title} — {data.subtitle}
          </text.h2>
          <text.p as="paragraph" size={-1} className="section-copy">
            {data.intro}
          </text.p>
        </div>

        <div className="platform-block">
          <div className="section-heading">
            <text.h3 as="title" size={-1}>
              {data.components.title}
            </text.h3>
            <text.span as="caption" size={-1} className="section-copy">
              {data.components.note}
            </text.span>
          </div>
          <ul className="platform-component-list">
            {data.components.items.map((item) => (
              <li key={item.name} className="platform-component-item">
                <div className="platform-component-top">
                  <text.span as="caption" size={0} className="platform-component-name">
                    {item.name}
                  </text.span>
                  <StatusTag status={item.status} />
                </div>
                <text.p as="paragraph" size={-1} className="section-copy">
                  {item.detail}
                </text.p>
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-theme-grid">
          {data.themes.map((theme) => (
            <Card
              key={theme.id}
              id={theme.id}
              title={theme.title}
              description={theme.body}
              space={cardSpace}
            >
              {theme.points?.length ? (
                <ul className="platform-points">
                  {theme.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>

        <div className="platform-block">
          <text.h3 as="title" size={-1}>
            {data.upcoming.title}
          </text.h3>
          <ul className="platform-points upcoming">
            {data.upcoming.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Box>
    </section>
  );
}

export default PlatformWorkSection;

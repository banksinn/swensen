import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('title')}</h2>
      <h3>{t('title')}</h3>
      <h4>{t('title')}</h4>
      <h5>{t('title')}</h5>
      <h6>{t('title')}</h6>
      <p style={{ fontSize: 16 }}>{t('title')}</p>
    </div>
  );
}

import type { Metadata } from 'next';
import SettingsContent from '../../src/components/SettingsContent';

export const metadata: Metadata = {
  title: 'Settings - Shame to Flame',
  description: 'Manage your offline content and preferences',
};

export default function SettingsPage() {
  return <SettingsContent />;
}

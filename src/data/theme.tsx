import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaRocket  } from 'react-icons/fa6';
import { TbBrandMinecraft, TbCircleLetterAFilled } from 'react-icons/tb';
import { BsInstagram } from 'react-icons/bs';
import type { ThemeType } from '@/types';

export const optionsTheme: Record<
  ThemeType,
  { label: string; value: ThemeType; icon: React.ReactNode }
> = {
  light: {
    label: 'Light',
    value: 'light',
    icon: <MdLightMode size={22} className="text-(--color-primary)" />,
  },
  dark: {
    label: 'Dark',
    value: 'dark',
    icon: <MdDarkMode size={22} className="text-(--color-primary)" />,
  },
  rocketseat: {
    label: 'Rocketseat',
    value: 'rocketseat',
    icon: <FaRocket size={22} className="text-(--color-primary)" />,
  },
  minecraft: {
    label: 'Minecraft',
    value: 'minecraft',
    icon: <TbBrandMinecraft size={22} className="text-(--color-primary)" />,
  },
  alura: {
    label: 'Alura',
    value: 'alura',
    icon: (
      <TbCircleLetterAFilled size={22} className="text-(--color-primary)" />
    ),
  },
  instagram: {
    label: 'Instagram',
    value: 'instagram',
    icon: <BsInstagram size={22} className="text-(--color-primary)" />,
  },
};

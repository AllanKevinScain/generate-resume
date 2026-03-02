import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaRocket, FaSquarePinterest, FaLinkedinIn } from "react-icons/fa6";
import { TbBrandMinecraft, TbCircleLetterAFilled } from "react-icons/tb";
import { BsInstagram } from "react-icons/bs";
import {
  FaSpotify,
  FaDiscord,
  FaGithubAlt,
  FaTwitter,
  FaDribbbleSquare,
} from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
import { SiVercel } from "react-icons/si";

import type { ThemeType } from "@/types";

export const optionsTheme: Record<
  ThemeType,
  { label: string; value: ThemeType; icon: React.ReactNode }
> = {
  light: {
    label: "Light",
    value: "light",
    icon: <MdLightMode size={22} className="text-(--color-primary)" />,
  },
  dark: {
    label: "Dark",
    value: "dark",
    icon: <MdDarkMode size={22} className="text-(--color-primary)" />,
  },
  rocketseat: {
    label: "Rocketseat",
    value: "rocketseat",
    icon: <FaRocket size={22} className="text-(--color-primary)" />,
  },
  minecraft: {
    label: "Minecraft",
    value: "minecraft",
    icon: <TbBrandMinecraft size={22} className="text-(--color-primary)" />,
  },
  alura: {
    label: "Alura",
    value: "alura",
    icon: (
      <TbCircleLetterAFilled size={22} className="text-(--color-primary)" />
    ),
  },
  instagram: {
    label: "Instagram",
    value: "instagram",
    icon: <BsInstagram size={22} className="text-(--color-primary)" />,
  },
  pinterest: {
    label: "Pinterest",
    value: "pinterest",
    icon: <FaSquarePinterest size={22} className="text-(--color-primary)" />,
  },
  spotify: {
    label: "Spotify",
    value: "spotify",
    icon: <FaSpotify size={22} className="text-(--color-primary)" />,
  },
  netflix: {
    label: "Netflix",
    value: "netflix",
    icon: <RiNetflixFill size={22} className="text-(--color-primary)" />,
  },
  discord: {
    label: "Discord",
    value: "discord",
    icon: <FaDiscord size={22} className="text-(--color-primary)" />,
  },
  vercel: {
    label: "Vercel",
    value: "vercel",
    icon: <SiVercel size={22} className="text-(--color-primary)" />,
  },
  github: {
    label: "Github",
    value: "github",
    icon: <FaGithubAlt size={22} className="text-(--color-primary)" />,
  },
  twitter: {
    label: "Twitter",
    value: "twitter",
    icon: <FaTwitter size={22} className="text-(--color-primary)" />,
  },
  linkedin: {
    label: "Linkedin",
    value: "linkedin",
    icon: <FaLinkedinIn size={22} className="text-(--color-primary)" />,
  },
  dribbble: {
    label: "Dribbble",
    value: "dribbble",
    icon: <FaDribbbleSquare size={22} className="text-(--color-primary)" />,
  },
};

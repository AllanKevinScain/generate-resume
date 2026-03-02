"use client";

import { twMerge } from "tailwind-merge";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa6";
import type { SocialLoginTypes } from "@/types";
import { BsInstagram } from "react-icons/bs";
import type { ComponentProps } from "react";
import { FaLinkedin } from "react-icons/fa6";
interface SocialButtonProps extends ComponentProps<"button"> {
  provider: SocialLoginTypes;
}

const providers: Record<
  SocialLoginTypes,
  { label: string; icon: React.ReactNode }
> = {
  oauth_google: {
    label: "Continuar com Google",
    icon: <FcGoogle size={22} />,
  },
  oauth_github: {
    label: "Continuar com GitHub",
    icon: <VscGithubInverted size={22} />,
  },
  oauth_facebook: {
    label: "Continuar com Facebook",
    icon: <FaFacebook size={22} className="text-cyan-500" />,
  },
  oauth_instagram: {
    label: "Continuar com Instagram",
    icon: <BsInstagram size={22} className="text-" />,
  },
  oauth_linkedin: {
    label: "Continuar com Linkedin",
    icon: <FaLinkedin size={22} className="text-cyan-700" />,
  },
};

export function SocialButton(props: SocialButtonProps) {
  const { provider, className, ...rest } = props;
  const data = providers[provider];

  return (
    <button
      {...rest}
      className={twMerge(
        "flex items-center justify-center gap-3",
        "w-full px-5 py-3 cursor-pointer",
        "rounded-lg",
        "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
        "border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]",
        "text-(--color-text) font-medium",
        "transition-all duration-200",
        "hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
        "hover:scale-[1.02]",
        className,
      )}
    >
      {data.icon}
      {data.label}
    </button>
  );
}

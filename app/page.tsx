"use client";

import { motion } from "framer-motion";
import { SocialButton } from "./components";
import { twMerge } from "tailwind-merge";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div
      className={twMerge(
        "min-h-screen",
        "flex items-center justify-center",
        "px-6",
        "bg-(--color-bg)",
        "relative overflow-hidden",
      )}
    >
      <div
        className={twMerge(
          "absolute inset-0 opacity-20 pointer-events-none",
          "bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px)]",
          "bg-size-[28px_28px]",
        )}
      />

      <div
        className={twMerge(
          "absolute",
          "w-125 h-125",
          "bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
          "blur-[140px]",
          "rounded-full",
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className={twMerge(
          "relative",
          "w-full max-w-md",
          "rounded-2xl",
          "p-8",
          "bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))]",
          "border border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]",
          "shadow-xl",
          "backdrop-blur-md",
        )}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-(--color-text)">
            Entrar na sua conta
          </h1>

          <p
            className={twMerge(
              "mt-2 text-sm",
              "text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]",
            )}
          >
            Escolha um provedor para continuar
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton
            provider="oauth_github"
            onClick={() => signIn("github")}
          />
          <SocialButton
            provider="oauth_google"
            onClick={() => signIn("google")}
          />
          <SocialButton
            provider="oauth_instagram"
            onClick={() => signIn("instagram")}
          />
          <SocialButton
            provider="oauth_linkedin"
            onClick={() => signIn("linkedin")}
          />
        </div>

        <p
          className={twMerge(
            "text-center text-xs mt-6",
            "text-[color-mix(in_srgb,var(--color-text)_60%,transparent)]",
          )}
        >
          Login seguro e rápido
        </p>
      </motion.div>
    </div>
  );
}

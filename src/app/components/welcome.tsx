"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import ProfileTilt3D, { type ProfileFocus } from "./ProfileTilt3D";
import { useSpeech } from "@/hooks/useSpeech";
import { playSound } from "@/hooks/useSound";
import { SOUNDS } from "@/config/assets";

interface WelcomeContent {
  home: string;
  name: string;
  subtitle: string;
  welcomeTitle: string;
  description: string[];
  profileAlt: string;
  profileImage: string;
  profileFocus?: ProfileFocus;
  background: string;
  homeIcon: string;
}

interface UiContent {
  speechToggle: string;
}

const SPEECH_KEY = "welcome";
const HTML_TAG = /<[^>]+>/g;

export default function Welcome() {
  const router = useRouter();
  const { lang, theme } = useApp();
  const { content } = useContent();
  const t = content.welcome as WelcomeContent | undefined;
  const ui = content.ui as UiContent;
  const { speakingKey, toggle } = useSpeech<string>(lang);

  if (!t) return null;

  const isSpeaking = speakingKey === SPEECH_KEY;
  const narration = t.description.join(" ").replace(HTML_TAG, " ");

  const handleHomeClick = () => {
    playSound(SOUNDS.sword);
    router.push("/");
  };

  const bgBox = theme === "dark" ? "bg-black text-white" : "bg-paper text-umber";
  const bgWhiteBox = theme === "dark" ? "bg-black/70 text-white" : "bg-white/60 text-black";
  const hrColor = theme === "dark" ? "border-white" : "border-black";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-3 sm:px-6 md:px-10 py-8 sm:py-12 transition-all duration-700 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('${t.background}')` }}
    >
      <button
        type="button"
        aria-label={t.home}
        className={`absolute z-20 flex items-center gap-2 rounded-lg shadow-md border cursor-pointer transition-all duration-300
          hover:scale-105 hover:shadow-[0_4px_15px_color-mix(in_srgb,var(--goldenrod)_60%,transparent)] backdrop-blur-[2px]
          ${bgBox}
          top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-6
          px-2 sm:px-3 py-1 sm:py-2`}
        onClick={handleHomeClick}
      >
        <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-md overflow-hidden border-2 border-transparent">
          <Image src={t.homeIcon} alt="" width={32} height={32} className="object-cover w-full h-full" />
        </span>
        <span className="font-irish text-xs sm:text-sm drop-shadow-[0_0_1px_silver] whitespace-nowrap">{t.home}</span>
      </button>

      <ProfileTilt3D src={t.profileImage} alt={t.profileAlt} focus={t.profileFocus} />

      <h1
        className={`font-irish text-center drop-shadow-[0_0_2px_gold] hover:scale-110 hover:drop-shadow-[0_0_5px_red] transition-all duration-300 cursor-pointer
        ${theme === "dark" ? "text-white" : "text-black"}
        text-lg sm:text-2xl md:text-3xl lg:text-4xl px-4`}
      >
        {t.name}
      </h1>

      <hr className={`w-3/4 sm:w-2/3 md:w-1/2 border-t-2 transition-colors duration-500 ${hrColor}`} />

      <h2
        className={`font-esteban text-center font-bold drop-shadow-[0_0_1px_gray] px-3 py-1 rounded-xl cursor-pointer transition-all duration-500 ${bgWhiteBox} animate-pulse
        text-sm sm:text-base md:text-lg lg:text-xl`}
      >
        {t.subtitle}
      </h2>

      <h3
        className={`font-irish text-center px-4 sm:px-6 md:px-10 py-2 sm:py-3 rounded-full shadow-md transition-all duration-300
        ${theme === "dark" ? "bg-red-800/80 text-white" : "bg-red-600/70 text-white"}
        hover:bg-gold hover:text-black
        text-base sm:text-lg md:text-2xl lg:text-3xl`}
      >
        {t.welcomeTitle}
      </h3>

      <div
        className={`relative p-3 sm:p-4 md:p-6 rounded-2xl shadow-md border w-full max-w-[95%] sm:max-w-lg md:max-w-2xl lg:max-w-3xl
        hover:border-yellow-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-500 ${bgBox}`}
      >
        <button
          type="button"
          aria-label={ui.speechToggle}
          aria-pressed={isSpeaking}
          className={`absolute top-2 right-2 transition-all duration-300 cursor-pointer ${
            isSpeaking ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => toggle(SPEECH_KEY, narration)}
        >
          <FaVolumeUp className="text-lg sm:text-xl md:text-2xl hover:scale-125 transition-transform duration-300" />
        </button>

        {t.description.map((text, i) => (
          <p
            key={i}
            className="mt-3 font-esteban text-center leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>
    </section>
  );
}

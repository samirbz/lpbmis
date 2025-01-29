import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const navOpenState = atom({
  key: "navOpen",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const mobileNavOpenState = atom({
  key: "mobileNavOpen",
  default: false,
});

export const isOnMobileState = atom({
  key: "isOnMobile",
  default: false,
});

export const userState = atom({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const localeLanguage = atom({
  key: "localeLanguage",
  default: "en",
});

export const jwtTokenState = atom({
  key: "jwtToken", // Unique key for this atom
  default: null, // Default value
  effects_UNSTABLE: [persistAtom], // Persistence effect
});
export const sectorsState = atom({
  key: "sectors", // Unique key for this atom
  default: null, // Default value
  effects_UNSTABLE: [persistAtom], // Persistence effect
});

export const palikaState = atom({
  key: "palika", // Unique key for this atom
  default: null, // Default value
  effects_UNSTABLE: [persistAtom], // Persistence effect
});
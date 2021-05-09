import { atom, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const serverList = atom({
  key: "serverList",
  default: [''],
  effects_UNSTABLE: [persistAtom],
});

export const applicationName = atom({
  key: "applicationName",
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const applicationList = atom({
  key: 'applicationList',
  default: [''],
  effects_UNSTABLE: [persistAtom],
});

export const propertyList = atom({
  key: 'propertyList',
  default: {'default':[],'environment':[]},
  effects_UNSTABLE: [persistAtom],
});

export const configList = atom({
  key: 'configList',
  default: {'Servers':{},'Applications':{}},
  effects_UNSTABLE: [persistAtom],
});

export const selectedIndex = atom({
  key: 'selectedIndex',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const selectedServerName = atom({
  key: 'selectedServerName',
  default: '',
  effects_UNSTABLE: [persistAtom],
})


export const userInfo = atom({
  key: "userInfo",
  default: {
    username: null,
    userpassword: null,
    userrole: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectorUserInfo = selectorFamily({
  key: "selectorUserInfo",
  get: (field) => ({ get }) => get(userInfo)[field],
  set: (field) => ({ set }, newValue) =>
    set(userInfo, (prevState) => ({ ...prevState, [field]: newValue })),
});


export const useAppStore = defineStore({
  id: 'APP',
  state: () => {
    return {};
  },
  actions: {
    subscribeMessage() {},
  },
});

export const useAppStoreRefs = () => storeToRefs(useAppStore());

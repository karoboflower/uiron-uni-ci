export const useUserStore = defineStore({
  id: 'USER',

  state: () => ({
    // 创建订单参数
    token: '',
    user: {},
  }),

  getters: {
    userId: (state) => state.user.id,
    userName: (state) => state.user.name,
    phone: (state) => state.user.phone,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo) {
      this.user = userInfo;
    },
  },
});

// 如果用解构方式取
export const useUserStoreRefs = () => storeToRefs(useUserStore());

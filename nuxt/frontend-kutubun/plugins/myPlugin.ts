export default defineNuxtPlugin((nuxtApp) => {
      return {
        provide: {
            sayHello: () => {
                console.log("Hello from plugin");
            },
        }
      };
});
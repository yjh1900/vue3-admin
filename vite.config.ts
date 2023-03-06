import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteMock from "vite-easy-mock";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueJsx(),
      // https://www.npmjs.com/package/vite-easy-mock
      viteMock({
        dir: "",
        pattern: "/mock", // /mock开头的请求会被拦截
      }),
    ],
    server: {
      // port: 8000,
      // open: true,
      proxy: {
        "/app-dev": {
          // target: "http://gmall-h5-api.atguigu.cn",
          target: "http://sph-h5-api.atguigu.cn",
          changeOrigin: true,
          // 路径是否需要重写，看接口文档（接口需要前缀，就不重写）（接口不需要前缀，就要重写）
          rewrite: (path) => path.replace(/^\/app-dev/, ""),
        },
      },
      port: env.VITE_PORT,
      open: env.VITE_OPEN === "true",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          additionalData: '@import "./src/styles/variables.scss";',
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
  };
});

import { renameSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type UserConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';
import { viteSingleFile } from 'vite-plugin-singlefile';

const config: UserConfig = {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
};

const rename = () => {
  return {
    name: 'rename-index',
    enforce: 'post',
    closeBundle() {
      const outDir = 'dist';
      const oldPath = fileURLToPath(new URL(`./${outDir}/index.html`, import.meta.url));
      const newPath = fileURLToPath(new URL(`./${outDir}/qw-jwt-debugger.html`, import.meta.url));
      try {
        renameSync(oldPath, newPath);
        console.log('\n✅ Successfully modified index.html to qw-jwt-debugger.html');
      } catch (err) {
        console.error('\n❌ [Post-Build] Rename failed:', err);
      }
    },
  };
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      ...config,
      plugins: [removeConsole()],
      server: {
        host: '0.0.0.0',
        port: 2323,
        allowedHosts: true,
      },
    };
  } else {
    return {
      ...config,
      plugins: [removeConsole(), viteSingleFile(), rename()],
      build: {
        minify: 'esbuild',
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
          },
        },
      },
    };
  }
});

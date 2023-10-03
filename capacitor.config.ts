import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'test-arcade-game',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

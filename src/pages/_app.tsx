import type { AppProps } from 'next/app';
// 引入主题Provider
import { ThemeProvider } from '../components/themeProvider';
import { UserInfoProvider } from '@/components/userProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider> {/* 包裹所有页面 */}
    <UserInfoProvider>
      <Component {...pageProps} />
    </UserInfoProvider>
    </ThemeProvider>
  );
}
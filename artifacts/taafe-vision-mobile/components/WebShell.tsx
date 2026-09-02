import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MobileChrome, {
  getMobileRoutePath,
  type MobileRoute,
} from '@/components/MobileChrome';

export type WebShellProps = {
  uri: string;
};

/**
 * Browser preview fallback. The native implementation in WebShell.native.tsx
 * is selected automatically by Metro for Android and iOS.
 */
export default function WebShell({ uri }: WebShellProps) {
  const Iframe = 'iframe' as unknown as React.ElementType;
  const [currentUrl, setCurrentUrl] = useState(uri);

  const navigateToRoute = (route: MobileRoute) => {
    setCurrentUrl(new URL(getMobileRoutePath(route), uri).toString());
  };

  return (
    <MobileChrome
      canGoBack={currentUrl !== uri}
      currentUrl={currentUrl}
      onBack={() => setCurrentUrl(uri)}
      onNavigate={navigateToRoute}
      onRefresh={() => setCurrentUrl((url) => `${url.split('?')[0]}?refresh=${Date.now()}`)}
    >
      <View style={styles.container}>
        {React.createElement(Iframe, {
          title: 'Site Taafé Vision',
          src: currentUrl,
          allow: 'fullscreen',
          style: {
            border: '0',
            display: 'block',
            height: '100%',
            width: '100%',
          },
        })}
      </View>
    </MobileChrome>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffedb',
    flex: 1,
    paddingBottom: Platform.OS === 'web' ? 34 : 0,
    paddingTop: Platform.OS === 'web' ? 67 : 0,
  },
});
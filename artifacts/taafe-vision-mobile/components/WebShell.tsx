import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export type WebShellProps = {
  uri: string;
};

/**
 * Browser preview fallback. The native implementation in WebShell.native.tsx
 * is selected automatically by Metro for Android and iOS.
 */
export default function WebShell({ uri }: WebShellProps) {
  const Iframe = 'iframe' as unknown as React.ElementType;

  return (
    <View style={styles.container}>
      {React.createElement(Iframe, {
        title: 'Site Taafé Vision',
        src: uri,
        allow: 'fullscreen',
        style: {
          border: '0',
          display: 'block',
          height: '100%',
          width: '100%',
        },
      })}
    </View>
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
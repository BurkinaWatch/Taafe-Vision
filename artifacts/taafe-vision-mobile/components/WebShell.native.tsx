import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  WebView,
  type WebViewNavigation,
} from 'react-native-webview';
import { useColors } from '@/hooks/useColors';
import { SITE_HOSTS } from '@/components/site-config';
import type { WebShellProps } from './WebShell';

export default function WebShell({ uri }: WebShellProps) {
  const colors = useColors();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!canGoBack) {
          return false;
        }

        webViewRef.current?.goBack();
        return true;
      },
    );

    return () => subscription.remove();
  }, [canGoBack]);

  const handleNavigation = useCallback((request: WebViewNavigation) => {
    const requestUrl = request.url;

    if (requestUrl.startsWith('mailto:') || requestUrl.startsWith('tel:')) {
      void Linking.openURL(requestUrl);
      return false;
    }

    if (!requestUrl.startsWith('http://') && !requestUrl.startsWith('https://')) {
      return false;
    }

    try {
      const hostname = new URL(requestUrl).hostname.toLowerCase();
      if (SITE_HOSTS.has(hostname)) {
        return true;
      }
    } catch {
      return false;
    }

    void Linking.openURL(requestUrl);
    return false;
  }, []);

  const handleError = useCallback(
    (event: { nativeEvent: { description?: string } }) => {
    setIsLoading(false);
    setErrorMessage(
      event.nativeEvent.description ||
        'Le site est momentanément indisponible. Vérifiez votre connexion.',
    );
    },
    [],
  );

  const retry = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <View style={[styles.errorState, { backgroundColor: colors.background }]}>
          <Text style={[styles.errorTitle, { color: colors.foreground }]}>
            Impossible de charger Taafé Vision
          </Text>
          <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
            {errorMessage}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Réessayer de charger le site"
            onPress={retry}
            style={({ pressed }) => [
              styles.retryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.78 : 1,
              },
            ]}
          >
            <Text style={[styles.retryLabel, { color: colors.primaryForeground }]}>
              Réessayer
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri }}
            originWhitelist={['https://*', 'http://*']}
            onLoadStart={() => {
              setIsLoading(true);
              setErrorMessage(null);
            }}
            onLoadEnd={() => setIsLoading(false)}
            onError={handleError}
            onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
            onShouldStartLoadWithRequest={handleNavigation}
            javaScriptEnabled
            domStorageEnabled
            allowsBackForwardNavigationGestures
            startInLoadingState
            style={styles.webView}
          />
          {isLoading ? (
            <View
              pointerEvents="none"
              style={[styles.loadingOverlay, { backgroundColor: colors.background }]}
            >
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
                Chargement de Taafé Vision…
              </Text>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loadingText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    marginTop: 14,
  },
  errorState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  errorTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 340,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 8,
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  retryLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
});
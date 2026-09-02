import React, { type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useColors } from '@/hooks/useColors';

export type MobileRoute =
  | 'home'
  | 'projects'
  | 'news'
  | 'about'
  | 'contact';

export type MobileChromeProps = {
  children: ReactNode;
  currentUrl: string;
  canGoBack: boolean;
  onBack: () => void;
  onNavigate: (route: MobileRoute) => void;
  onRefresh: () => void;
};

type IconName = MobileRoute | 'back' | 'refresh' | 'brand';

const navigationItems: Array<{
  route: MobileRoute;
  label: string;
}> = [
  { route: 'home', label: 'Accueil' },
  { route: 'projects', label: 'Projets' },
  { route: 'news', label: 'Actualités' },
  { route: 'about', label: 'À propos' },
  { route: 'contact', label: 'Contact' },
];

const routePaths: Record<MobileRoute, string> = {
  home: '/',
  projects: '/projects',
  news: '/news',
  about: '/about',
  contact: '/contact',
};

function getRouteFromUrl(url: string): MobileRoute {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/') return 'home';
    if (pathname.startsWith('/projects') || pathname.startsWith('/films')) {
      return 'projects';
    }
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/about') || pathname.startsWith('/partners')) {
      return 'about';
    }
    if (pathname.startsWith('/contact')) return 'contact';
  } catch {
    return 'home';
  }

  return 'home';
}

function getSectionLabel(route: MobileRoute) {
  return navigationItems.find((item) => item.route === route)?.label ?? 'Accueil';
}

function Icon({
  name,
  color,
  detailColor = color,
  size = 22,
}: {
  name: IconName;
  color: string;
  detailColor?: string;
  size?: number;
}) {
  const common = {
    fill: 'none' as const,
    stroke: color,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  };

  switch (name) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="m3 10.8 9-7 9 7" />
          <Path {...common} d="M5.5 9.5V20h13V9.5M9.5 20v-5.5h5V20" />
        </Svg>
      );
    case 'projects':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="M4 6.5h6l2 2h8v9.8a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 18.3V6.5Z" />
          <Path {...common} d="M4 10.5h16" />
        </Svg>
      );
    case 'news':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="M5 4.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
          <Path {...common} d="M7 8h10M7 12h10M7 16h6" />
        </Svg>
      );
    case 'about':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <Path {...common} d="M12 10.5v5M12 7.5h.01" />
        </Svg>
      );
    case 'contact':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="M4 5.5h16v11H8l-4 3v-14Z" />
          <Path {...common} d="M7.5 9h9M7.5 12.5h6" />
        </Svg>
      );
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="m14.5 5-7 7 7 7M8 12h11" />
        </Svg>
      );
    case 'refresh':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path {...common} d="M19 8.5V4l-2.2 2.2A7.5 7.5 0 1 0 19.2 15" />
          <Path {...common} d="M19 4v4.5h-4.5" />
        </Svg>
      );
    case 'brand':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityRole="image">
          <Path
            d="M12 21c-4.6-2.6-7-6.1-7-10.2C5 7 7.5 4.2 11.2 3c.6 2.1.5 4.2-.8 6.1 2.1-1.4 4.4-1.8 6.5-.9C20 9.4 18.9 16.8 12 21Z"
            fill={color}
          />
          <Path
            d="M11.5 19.5c.5-4.1 2.3-7 5.4-9.3"
            stroke={detailColor}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </Svg>
      );
  }
}

export function getMobileRoutePath(route: MobileRoute) {
  return routePaths[route];
}

export default function MobileChrome({
  children,
  currentUrl,
  canGoBack,
  onBack,
  onNavigate,
  onRefresh,
}: MobileChromeProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const activeRoute = getRouteFromUrl(currentUrl);
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.purpleTaafe,
            paddingTop: topInset,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={canGoBack ? 'Revenir à la page précédente' : 'Accueil Taafé Vision'}
            accessibilityState={{ disabled: !canGoBack }}
            disabled={!canGoBack}
            onPress={onBack}
            style={({ pressed }) => [
              styles.headerIconButton,
              { opacity: pressed ? 0.65 : canGoBack ? 1 : 0.9 },
            ]}
            testID="mobile-back-button"
          >
            <Icon
              name={canGoBack ? 'back' : 'brand'}
              color={colors.onPurple}
              detailColor={colors.purpleTaafe}
              size={24}
            />
          </Pressable>

          <View style={styles.titleBlock}>
            <Text style={[styles.brandTitle, { color: colors.onPurple }]}>
              Taafé Vision
            </Text>
            <Text style={[styles.sectionTitle, { color: colors.purpleMuted }]}>
              {getSectionLabel(activeRoute)}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Actualiser la page"
            onPress={onRefresh}
            style={({ pressed }) => [
              styles.headerIconButton,
              { opacity: pressed ? 0.65 : 1 },
            ]}
            testID="mobile-refresh-button"
          >
            <Icon name="refresh" color={colors.onPurple} size={21} />
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.purpleTaafe,
            height: Platform.OS === 'web' ? 84 : 58 + bottomInset,
            paddingBottom: bottomInset,
          },
        ]}
      >
        {navigationItems.map((item) => {
          const isActive = activeRoute === item.route;
          const iconColor = isActive ? colors.purpleTaafe : colors.onPurple;

          return (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              accessibilityLabel={`Ouvrir ${item.label}`}
              accessibilityState={{ selected: isActive }}
              onPress={() => onNavigate(item.route)}
              style={({ pressed }) => [
                styles.navItem,
                { opacity: pressed ? 0.72 : 1 },
              ]}
              testID={`mobile-nav-${item.route}`}
            >
              <View
                style={[
                  styles.iconPill,
                  { backgroundColor: isActive ? colors.secondary : 'transparent' },
                ]}
              >
                <Icon name={item.route} color={iconColor} size={20} />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.navLabel,
                  { color: isActive ? colors.onPurple : colors.purpleMuted },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 7,
    elevation: 5,
    zIndex: 2,
  },
  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    paddingHorizontal: 12,
  },
  headerIconButton: {
    alignItems: 'center',
    borderRadius: 24,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  titleBlock: {
    flex: 1,
    paddingHorizontal: 8,
  },
  brandTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    letterSpacing: -0.3,
  },
  sectionTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    paddingTop: 6,
    zIndex: 2,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    minWidth: 58,
  },
  iconPill: {
    alignItems: 'center',
    borderRadius: 16,
    height: 30,
    justifyContent: 'center',
    width: 46,
  },
  navLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    marginTop: 3,
    textAlign: 'center',
  },
});
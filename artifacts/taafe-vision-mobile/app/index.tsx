import { StyleSheet, View } from 'react-native';
import WebShell from '@/components/WebShell';
import { SITE_URL } from '@/components/site-config';
import { useColors } from '@/hooks/useColors';

export default function HomeScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WebShell uri={SITE_URL} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
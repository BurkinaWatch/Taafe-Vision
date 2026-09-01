import { StyleSheet, View } from 'react-native';
import WebShell from '@/components/WebShell';
import { SITE_URL } from '@/components/site-config';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WebShell uri={SITE_URL} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffedb',
    flex: 1,
  },
});
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const REPO_URL = 'https://github.com/ChezMose/MtgCounter';

export default function ShareScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.qrWrap}>
        <QRCode value={REPO_URL} size={220} backgroundColor="#fff" color="#0d1117" />
      </View>

      <Pressable onPress={() => Linking.openURL(REPO_URL)}>
        <Text style={styles.linkText}>or follow this link to update</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  qrWrap: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  linkText: {
    color: '#6ea8fe',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

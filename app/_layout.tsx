import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from '../context/GameContext';

export default function RootLayout() {
  return (
    <GameProvider>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="history"
          options={{
            presentation: 'modal',
            headerTitle: 'Game History',
            headerStyle: { backgroundColor: '#0d1117' },
            headerTintColor: '#e8e8e8',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="share"
          options={{
            presentation: 'modal',
            headerTitle: 'Share',
            headerStyle: { backgroundColor: '#0d1117' },
            headerTintColor: '#e8e8e8',
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </GameProvider>
  );
}

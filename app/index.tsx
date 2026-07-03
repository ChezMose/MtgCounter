import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { useGame } from '../context/GameContext';
import { PlayerZone } from '../components/PlayerZone';
import { NewGameDialog } from '../components/NewGameDialog';

export default function GameScreen() {
  useKeepAwake();
  const { state, changeLife, newGame } = useGame();
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <View style={styles.screen}>
      {/* Top zone — opponent, rotated so they can read it */}
      <PlayerZone
        life={state.p2Life}
        onChangeLife={(d) => changeLife(2, d)}
        flipped
      />

      {/* Middle action bar */}
      <View style={styles.bar}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.iconText}>📜</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          onPress={() => router.push('/share')}
        >
          <Text style={styles.iconText}>📤</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.newGameBtn, pressed && styles.newGameBtnPressed]}
          onPress={() => setDialogVisible(true)}
        >
          <Text style={styles.newGameText}>New Game</Text>
        </Pressable>
      </View>

      {/* Bottom zone — current player */}
      <PlayerZone
        life={state.p1Life}
        onChangeLife={(d) => changeLife(1, d)}
      />

      <NewGameDialog
        visible={dialogVisible}
        defaultLife={state.startingLife}
        onConfirm={(life) => { newGame(life); setDialogVisible(false); }}
        onCancel={() => setDialogVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  bar: {
    height: 56,
    backgroundColor: '#111118',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a3a',
  },
  iconBtn: {
    padding: 10,
    borderRadius: 8,
  },
  iconBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconText: {
    fontSize: 20,
  },
  newGameBtn: {
    backgroundColor: '#c0392b',
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 8,
  },
  newGameBtnPressed: {
    backgroundColor: '#a93226',
  },
  newGameText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

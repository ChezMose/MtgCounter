import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { useGame } from '../context/GameContext';
import { PlayerZone } from '../components/PlayerZone';
import { NewGameDialog } from '../components/NewGameDialog';

const playerBackground = require('../assets/starry-player.png');
const opponentBackground = require('../assets/starry-opponent.png');

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
        backgroundImage={opponentBackground}
      />

      {/* Middle action bar */}
      <View style={styles.bar}>
        <Pressable
          style={({ pressed }) => [styles.barBtn, styles.newGameBtn, pressed && styles.newGameBtnPressed]}
          onPress={() => setDialogVisible(true)}
        >
          <Text style={styles.barBtnText}>New Game</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.barBtn, styles.historyBtn, pressed && styles.historyBtnPressed]}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.barBtnText}>History</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.barBtn, styles.shareBtn, pressed && styles.shareBtnPressed]}
          onPress={() => router.push('/share')}
        >
          <Text style={styles.barBtnText}>Share</Text>
        </Pressable>
      </View>

      {/* Bottom zone — current player */}
      <PlayerZone
        life={state.p1Life}
        onChangeLife={(d) => changeLife(1, d)}
        backgroundImage={playerBackground}
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
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a3a',
  },
  barBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
  },
  newGameBtn: {
    backgroundColor: '#c0392b',
  },
  newGameBtnPressed: {
    backgroundColor: '#a93226',
  },
  historyBtn: {
    backgroundColor: '#2e6db4',
  },
  historyBtnPressed: {
    backgroundColor: '#255a94',
  },
  shareBtn: {
    backgroundColor: '#2e8b57',
  },
  shareBtnPressed: {
    backgroundColor: '#256b45',
  },
  barBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { HistoryEntry } from '../types/game';

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function Row({ entry, index }: { entry: HistoryEntry; index: number }) {
  return (
    <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
      <Text style={[styles.cell, styles.timeCell]}>{formatTime(entry.timestamp)}</Text>
      <Text style={[styles.cell, styles.lifeCell]}>{entry.p2Life}</Text>
      <Text style={[styles.cell, styles.lifeCell]}>{entry.p1Life}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.timeCell]}>Time</Text>
        <Text style={[styles.headerCell, styles.lifeCell]}>Opponent</Text>
        <Text style={[styles.headerCell, styles.lifeCell]}>You</Text>
      </View>

      <FlatList
        data={state.history}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => <Row entry={item} index={index} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
    backgroundColor: '#111118',
  },
  headerCell: {
    color: '#666880',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  rowEven: {
    backgroundColor: '#0d1117',
  },
  rowOdd: {
    backgroundColor: '#101520',
  },
  cell: {
    color: '#e0e0e8',
  },
  timeCell: {
    flex: 1,
    fontSize: 14,
    color: '#778',
    fontVariant: ['tabular-nums'],
  },
  lifeCell: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  emptyWrap: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#444',
    fontSize: 16,
  },
});

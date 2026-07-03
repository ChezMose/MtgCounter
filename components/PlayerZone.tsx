import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  life: number;
  onChangeLife: (delta: number) => void;
  flipped?: boolean;
}

function lifeFontSize(life: number): number {
  const len = String(life).length;
  return Math.max(44, 100 - (len - 2) * 16);
}

export function PlayerZone({ life, onChangeLife, flipped }: Props) {
  return (
    <View style={[styles.zone, flipped && styles.flipped]}>
      {/* Left column: −1 (top) / −5 (bottom) */}
      <View style={styles.column}>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(-1)}
        >
          <Text style={[styles.delta, styles.minus]}>−1</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(-5)}
        >
          <Text style={[styles.delta, styles.minus]}>−5</Text>
        </Pressable>
      </View>

      {/* Center: life total display (not a tap target) */}
      <View style={styles.center} pointerEvents="none">
        <Text style={[styles.lifeTotal, { fontSize: lifeFontSize(life) }]}>
          {life}
        </Text>
      </View>

      {/* Right column: +1 (top) / +5 (bottom) */}
      <View style={styles.column}>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(1)}
        >
          <Text style={[styles.delta, styles.plus]}>+1</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(5)}
        >
          <Text style={[styles.delta, styles.plus]}>+5</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0d1117',
  },
  flipped: {
    transform: [{ rotate: '180deg' }],
  },
  column: {
    flex: 3,
    flexDirection: 'column',
  },
  center: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  lifeTotal: {
    color: '#e8e8e8',
    fontWeight: '700',
  },
  delta: {
    fontSize: 17,
    fontWeight: '500',
  },
  minus: {
    color: '#e57373',
  },
  plus: {
    color: '#81c784',
  },
});

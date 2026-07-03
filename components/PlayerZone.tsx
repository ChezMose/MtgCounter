import { useState } from 'react';
import { Image, ImageSourcePropType, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  life: number;
  onChangeLife: (delta: number) => void;
  flipped?: boolean;
  backgroundImage: ImageSourcePropType;
}

function lifeFontSize(life: number): number {
  const len = String(life).length;
  return Math.max(44, 100 - (len - 2) * 16);
}

export function PlayerZone({ life, onChangeLife, flipped, backgroundImage }: Props) {
  const [zoneSize, setZoneSize] = useState({ width: 0, height: 0 });

  function handleLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout;
    setZoneSize({ width, height });
  }

  return (
    <View style={[styles.zone, flipped && styles.flipped]} onLayout={handleLayout}>
      <View style={styles.backgroundClip} pointerEvents="none">
        {zoneSize.width > 0 && zoneSize.height > 0 && (
          <Image
            source={backgroundImage}
            resizeMode="cover"
            style={{ width: zoneSize.width, height: zoneSize.height }}
          />
        )}
      </View>
      {/* Left column: −1 (top) / −5 (bottom) */}
      <View style={styles.column}>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(-1)}
        >
          <View style={styles.textBox}>
            <Text style={[styles.delta, styles.minus]}>−1</Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(-5)}
        >
          <View style={styles.textBox}>
            <Text style={[styles.delta, styles.minus]}>−5</Text>
          </View>
        </Pressable>
      </View>

      {/* Center: life total display (not a tap target) */}
      <View style={styles.center} pointerEvents="none">
        <View style={styles.textBox}>
          <Text style={[styles.lifeTotal, { fontSize: lifeFontSize(life), lineHeight: lifeFontSize(life) }]}>
            {life}
          </Text>
        </View>
      </View>

      {/* Right column: +1 (top) / +5 (bottom) */}
      <View style={styles.column}>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(1)}
        >
          <View style={styles.textBox}>
            <Text style={[styles.delta, styles.plus]}>+1</Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.tapZone, pressed && styles.pressed]}
          onPress={() => onChangeLife(5)}
        >
          <View style={styles.textBox}>
            <Text style={[styles.delta, styles.plus]}>+5</Text>
          </View>
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
    overflow: 'hidden',
  },
  backgroundClip: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  textBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 16,
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
    includeFontPadding: false,
  },
  delta: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '500',
    includeFontPadding: false,
  },
  minus: {
    color: '#e57373',
  },
  plus: {
    color: '#81c784',
  },
});

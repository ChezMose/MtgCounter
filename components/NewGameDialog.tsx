import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  defaultLife: number;
  onConfirm: (startingLife: number) => void;
  onCancel: () => void;
}

export function NewGameDialog({ visible, defaultLife, onConfirm, onCancel }: Props) {
  const [life, setLife] = useState(defaultLife);

  useEffect(() => {
    if (visible) setLife(defaultLife);
  }, [visible, defaultLife]);

  function adjust(delta: number) {
    setLife((v) => Math.max(1, v + delta));
  }

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>New Game</Text>
          <Text style={styles.label}>Starting life total</Text>

          <View style={styles.picker}>
            <Pressable style={styles.adjBtn} onPress={() => adjust(-5)}>
              <Text style={styles.adjText}>−5</Text>
            </Pressable>
            <Pressable style={styles.adjBtn} onPress={() => adjust(-1)}>
              <Text style={styles.adjText}>−1</Text>
            </Pressable>
            <Text style={styles.value}>{life}</Text>
            <Pressable style={styles.adjBtn} onPress={() => adjust(1)}>
              <Text style={styles.adjText}>+1</Text>
            </Pressable>
            <Pressable style={styles.adjBtn} onPress={() => adjust(5)}>
              <Text style={styles.adjText}>+5</Text>
            </Pressable>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={() => onConfirm(life)}>
              <Text style={styles.confirmText}>Start</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 24,
    width: 300,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    color: '#e8e8e8',
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    color: '#888',
    fontSize: 14,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adjBtn: {
    backgroundColor: '#252540',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  adjText: {
    color: '#c8c8e0',
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    color: '#e8e8e8',
    fontSize: 36,
    fontWeight: '700',
    minWidth: 56,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  cancelText: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#c0392b',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

import React, { useMemo, useRef } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/theme";

export function AnimationScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const drag = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: drag.x, dy: drag.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: () => {
          Animated.spring(drag, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        },
      }),
    [drag]
  );

  const startProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();
  };

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 120, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Animation Lab</Text>
        <Text style={styles.subtitle}>Drag the card and replay the progress bar.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animated progress</Text>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
          <Pressable onPress={startProgress} style={styles.button}>
            <Ionicons name="play" size={16} color={colors.surface} />
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gesture card</Text>
          <Animated.View
            style={[
              styles.dragCard,
              {
                transform: [{ translateX: drag.x }, { translateY: drag.y }, { scale: scaleAnim }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.dragTitle}>Hold and drag</Text>
            <Text style={styles.dragBody}>Snap back on release.</Text>
          </Animated.View>
          <Pressable onPress={pulse} onLongPress={pulse} style={styles.hintPill}>
            <Ionicons name="hand-left" size={16} color={colors.primary} />
            <Text style={styles.hintText}>Tap or long-press to pulse</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    marginTop: spacing.sm,
    alignSelf: "flex-start",
  },
  buttonText: {
    ...typography.caption,
    color: colors.surface,
  },
  dragCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  dragTitle: {
    ...typography.body,
    color: colors.text,
  },
  dragBody: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  hintPill: {
    marginTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  hintText: {
    ...typography.caption,
    color: colors.text,
  },
});

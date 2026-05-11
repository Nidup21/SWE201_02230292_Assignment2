import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/theme";
import type { Habit } from "../data/mockData";

type HabitCardProps = {
  habit: Habit;
  onPress?: () => void;
};

export function HabitCard({ habit, onPress }: HabitCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="flash" size={18} color={colors.primary} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.meta}>{habit.category} · {habit.goal}</Text>
        </View>
        <View style={styles.streak}>
          <Text style={styles.streakValue}>{habit.streak}</Text>
          <Text style={styles.streakLabel}>days</Text>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.round(habit.progress * 100)}%` }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.text,
    marginBottom: 2,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  streak: {
    alignItems: "flex-end",
  },
  streakValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  streakLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    marginTop: spacing.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
});

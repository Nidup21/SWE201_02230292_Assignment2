import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../data/mockData";
import { colors, radius, spacing, typography } from "../theme/theme";

export function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
          <Text style={styles.subtitle}>Organize habits by your daily goals.</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((item) => (
            <Pressable key={item.id} style={styles.tile}>
              <View style={[styles.tileIcon, { backgroundColor: item.color }]}>
                <Ionicons name="pricetag" size={16} color={colors.surface} />
              </View>
              <Text style={styles.tileTitle}>{item.name}</Text>
              <Text style={styles.tileMeta}>{item.count} habits</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Quick actions</Text>
          <View style={styles.panelRow}>
            <View style={styles.actionPill}>
              <Ionicons name="add-circle" size={18} color={colors.primary} />
              <Text style={styles.actionText}>Create routine</Text>
            </View>
            <View style={styles.actionPill}>
              <Ionicons name="calendar" size={18} color={colors.primary} />
              <Text style={styles.actionText}>Weekly plan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tile: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  tileIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  tileTitle: {
    ...typography.body,
    color: colors.text,
  },
  tileMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  panel: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  panelRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
  },
  actionText: {
    ...typography.caption,
    color: colors.text,
  },
});

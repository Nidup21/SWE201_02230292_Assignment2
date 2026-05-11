import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/theme";

export function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.surface} />
          </View>
          <Text style={styles.title}>Maya Ahmed</Text>
          <Text style={styles.subtitle}>Computer Science · Year 2</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowHint}>Daily reminders at 8:30 AM</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.surfaceAlt, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Focus mode</Text>
              <Text style={styles.rowHint}>Hide distractions for study blocks</Text>
            </View>
            <Switch
              value={focusModeEnabled}
              onValueChange={setFocusModeEnabled}
              trackColor={{ false: colors.surfaceAlt, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly summary</Text>
            <Text style={styles.cardBody}>You completed 18 habits this week. Keep the momentum.</Text>
          </View>
          <View style={styles.cardAlt}>
            <Text style={styles.cardTitle}>Study goals</Text>
            <Text style={styles.cardBody}>Next milestone in 3 days.</Text>
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
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowTitle: {
    ...typography.body,
    color: colors.text,
  },
  rowHint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  cardAlt: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  cardTitle: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardBody: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

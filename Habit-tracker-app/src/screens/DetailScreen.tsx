import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { habits } from "../data/mockData";
import { colors, radius, spacing, typography } from "../theme/theme";
import type { RootStackParamList } from "../navigation/types";

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;

export function DetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const habit = habits.find((item) => item.id === route.params.habitId);
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [contentAnim]);

  if (!habit) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </Pressable>

        <Animated.View
          style={{
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.subtitle}>{habit.category} · {habit.goal}</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardLabel}>Current streak</Text>
              <Text style={styles.cardValue}>{habit.streak} days</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardLabel}>Completion</Text>
              <Text style={styles.cardValue}>{Math.round(habit.progress * 100)}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardLabel}>Reminder</Text>
              <Text style={styles.cardValue}>08:30 AM</Text>
            </View>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Focus plan</Text>
            <Text style={styles.panelText}>
              Keep this habit light but consistent. Focus on the first 10 minutes and stop when the timer ends.
            </Text>
          </View>
        </Animated.View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
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
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  cardLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  cardValue: {
    ...typography.body,
    color: colors.text,
  },
  panel: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  panelTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  panelText: {
    ...typography.body,
    color: colors.textMuted,
  },
});

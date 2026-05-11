import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HabitCard } from "../components/HabitCard";
import { habits } from "../data/mockData";
import { colors, radius, spacing, typography } from "../theme/theme";
import type { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const headerAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(habits.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.stagger(
      90,
      cardAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [cardAnims, headerAnim]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Good afternoon</Text>
          <Text style={styles.subtitle}>Track your focus rituals for today.</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>4</Text>
              <Text style={styles.summaryLabel}>Habits</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>78%</Text>
              <Text style={styles.summaryLabel}>Progress</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>Best streak</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <Text style={styles.sectionHint}>Tap a habit for details</Text>
        </View>

        {habits.map((habit, index) => (
          <Animated.View
            key={habit.id}
            style={{
              opacity: cardAnims[index],
              transform: [
                {
                  translateY: cardAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
                },
              ],
            }}
          >
            <HabitCard habit={habit} onPress={() => navigation.navigate("Detail", { habitId: habit.id })} />
          </Animated.View>
        ))}
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
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sectionHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

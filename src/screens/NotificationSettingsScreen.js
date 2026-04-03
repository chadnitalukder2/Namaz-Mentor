import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';

export default function NotificationSettingsScreen({ navigation, route }) {
  const prayerName = route?.params?.prayer || 'Fajr';

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [soundMode, setSoundMode] = useState('azaan'); // 'azaan' | 'silent'

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      {/* Bottom sheet style drag handle */}
      <View style={styles.dragHandle} />

      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Notification for {prayerName}</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Notification toggle */}
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={styles.iconBg}>
                <Text style={styles.rowIcon}>🔔</Text>
              </View>
              <View>
                <Text style={styles.rowLabel}>Notification</Text>
                <Text style={styles.rowSub}>Banner alert with default sound</Text>
              </View>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#333', true: Colors.gold }}
              thumbColor={Colors.textWhite}
            />
          </View>
        </View>

        {/* Sound Mode */}
        <Text style={styles.sectionTitle}>Sound Mode</Text>
        <View style={styles.card}>
          {/* Azaan option */}
          <TouchableOpacity
            style={styles.soundRow}
            onPress={() => setSoundMode('azaan')}
            activeOpacity={0.7}
          >
            <View style={styles.toggleLeft}>
              <View style={styles.iconBg}>
                <Text style={styles.rowIcon}>🕌</Text>
              </View>
              <View>
                <Text style={styles.rowLabel}>Azaan</Text>
                <Text style={styles.rowSub}>Play call to prayer</Text>
              </View>
            </View>
            <View style={[styles.radio, soundMode === 'azaan' && styles.radioActive]}>
              {soundMode === 'azaan' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Silent option */}
          <TouchableOpacity
            style={styles.soundRow}
            onPress={() => setSoundMode('silent')}
            activeOpacity={0.7}
          >
            <View style={styles.toggleLeft}>
              <View style={styles.iconBg}>
                <Text style={styles.rowIcon}>🔕</Text>
              </View>
              <View>
                <Text style={styles.rowLabel}>Silent Mode</Text>
                <Text style={styles.rowSub}>Notification without sound</Text>
              </View>
            </View>
            <View style={[styles.radio, soundMode === 'silent' && styles.radioActive]}>
              {soundMode === 'silent' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Note: Azaan and Silent Mode cannot be enabled at the same time. Selecting one will automatically disable the other.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: Colors.textWhite,
    lineHeight: 32,
    marginTop: -6,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -32,
    ...Fonts.bold,
    fontSize: 18,
    color: Colors.textWhite,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  soundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIcon: { fontSize: 22 },
  rowLabel: {
    ...Fonts.bold,
    fontSize: 15,
    color: Colors.textWhite,
  },
  rowSub: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },

  sectionTitle: {
    ...Fonts.medium,
    fontSize: 15,
    color: Colors.textGrey,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.gold,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gold,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginLeft: 78,
  },

  noteCard: {
    backgroundColor: 'rgba(217,170,85,0.08)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(217,170,85,0.2)',
    padding: 16,
  },
  noteText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textGrey,
    lineHeight: 20,
  },
});

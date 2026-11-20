import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const locations = {
  airport: ['후쿠오카공항 국제선', 'Fukuoka Airport International Terminal'],
  dazaifuParking: ['다자이후 텐만구 주차센터', 'Dazaifu Tenmangu Parking Center'],
  dazaifu: ['다자이후 텐만구', 'Dazaifu Tenmangu'],
  oishi: ['오이시차야', 'O-Ishi Chaya Dazaifu'],
  yufuinParking: ['NPC24H 유후인 유노츠보가도 주차장', 'NPC24H Yufuin Yunotsubo Street Parking'],
  floral: ['유후인 플로랄빌리지', 'Yufuin Floral Village'],
  yunotsubo: ['유노츠보 거리', 'Yunotsubo Street Yufuin'],
  kinrin: ['긴린코 호수', 'Lake Kinrin Yufuin'],
  ryokan: ['료칸 여명', 'Ryokan Reimei Yufuin']
};

const schedule = [
  ['09:30', '후쿠오카공항 도착', '입국·수하물 수령 후 렌터카 셔틀로 이동', 'airplane-outline', 'airport'],
  ['10:30–11:20', '렌터카 수령', 'ETC 카드·면책보상·내비게이션 확인', 'car-outline', 'airport'],
  ['11:20–12:00', '다자이후로 이동', '공항 → 다자이후 약 40분 예상', 'navigate-outline', 'dazaifuParking'],
  ['12:00–12:30', '주차·참배길 산책', '주차센터에서 텐만구까지 도보 약 7분', 'walk-outline', 'dazaifuParking'],
  ['12:30–13:00', '우메가에모치·참배길', '가사노야 또는 야스다케에서 갓 구운 떡', 'cafe-outline', 'dazaifu'],
  ['13:00–13:40', '다자이후 텐만구 참배', '본전과 경내를 천천히 둘러보기', 'home-outline', 'dazaifu'],
  ['13:40–14:20', '점심: 오이시차야', '우메노카오 우동·오카메 우동·말차 세트', 'restaurant-outline', 'oishi'],
  ['14:20–14:30', '기념품 쇼핑 후 출발', '다자이후 쇼핑은 30분 이내로 제한', 'bag-handle-outline', 'dazaifu'],
  ['14:30–16:20', '유후인으로 이동', '교통·휴게 포함 약 1시간 40분~2시간', 'navigate-outline', 'yufuinParking'],
  ['16:20–16:50', '플로랄빌리지', '17:30 마감 전 먼저 방문', 'flower-outline', 'floral'],
  ['16:50–17:10', '유노츠보 거리', '미르히 푸딩·금상고로케·기념품', 'storefront-outline', 'yunotsubo'],
  ['17:10–17:20', '긴린코 짧은 산책', '시간이 부족하면 다음 날 아침으로 변경', 'water-outline', 'kinrin'],
  ['17:20–17:40', '료칸 여명으로 이동', '18:00 석식 전 20분 여유 확보', 'navigate-outline', 'ryokan'],
  ['18:00', '료칸 석식·온천', '가이세키 식사 후 가족탕·노천온천', 'restaurant-outline', 'ryokan']
];

function openMap(key) {
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[key][1])}`);
}

export default function App() {
  const [tab, setTab] = useState('schedule');
  const [expanded, setExpanded] = useState(null);
  const keys = Object.keys(locations);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>DAY 1 · 2026.12.27 SUN</Text>
        <Text style={styles.heading}>다자이후 · 유후인</Text>
        <Text style={styles.subtitle}>공항에서 료칸 석식까지, 여유 있게 걷고 먹는 첫날</Text>

        <View style={styles.summary}>
          <View><Text style={styles.label}>핵심 목표</Text><Text style={styles.goal}>17:40 료칸 여명 도착</Text></View>
          <Text style={styles.badge}>🚗 렌터카 DAY 1</Text>
        </View>

        <View style={styles.tabs}>
          <Pressable onPress={() => setTab('schedule')}><Text style={[styles.tab, tab === 'schedule' && styles.activeTab]}>시간순 일정</Text></Pressable>
          <Pressable onPress={() => setTab('places')}><Text style={[styles.tab, tab === 'places' && styles.activeTab]}>지도·위치</Text></Pressable>
        </View>

        {tab === 'schedule' ? (
          <View style={styles.timeline}>
            {schedule.map((item, index) => (
              <Pressable key={item[0] + item[1]} onPress={() => setExpanded(expanded === index ? null : index)} style={styles.row}>
                <Text style={styles.time}>{item[0]}</Text>
                <View style={styles.dot}><Ionicons name={item[3]} size={15} color="#fff" /></View>
                <View style={styles.card}>
                  <View style={styles.cardHeader}><Text style={styles.cardTitle}>{item[1]}</Text><Ionicons name={expanded === index ? 'chevron-up' : 'chevron-down'} size={17} color="#9A9187" /></View>
                  <Text style={styles.note}>{item[2]}</Text>
                  {expanded === index && <Pressable onPress={() => openMap(item[4])} style={styles.mapButton}><Text style={styles.mapButtonText}>📍 {locations[item[4]][0]} · Google Maps 열기</Text></Pressable>}
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.placeList}>
            {keys.map((key) => <Pressable key={key} onPress={() => openMap(key)} style={styles.placeRow}><Text style={styles.placeName}>{locations[key][0]}</Text><Text style={styles.open}>↗</Text></Pressable>)}
          </View>
        )}

        <View style={styles.tip}><Text style={styles.tipText}>ⓘ 12월에는 해가 빨리 지므로 유후인에서는 플로랄빌리지를 먼저 방문하세요. 긴린코는 시간이 부족하면 다음 날 아침으로 미룹니다.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F3EE' },
  container: { padding: 20, paddingBottom: 40 },
  kicker: { marginTop: 20, color: '#CE6A5B', fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  heading: { marginTop: 7, color: '#2F2B27', fontSize: 32, fontWeight: '900' },
  subtitle: { marginTop: 8, color: '#786F66', fontSize: 15, lineHeight: 22 },
  summary: { marginTop: 18, padding: 16, borderRadius: 18, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#9A9187', fontSize: 11, fontWeight: '700' },
  goal: { marginTop: 4, color: '#2F2B27', fontSize: 16, fontWeight: '800' },
  badge: { padding: 9, borderRadius: 20, backgroundColor: '#E7F1EF', color: '#397D7A', fontSize: 11, fontWeight: '800' },
  tabs: { marginTop: 22, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E4DCD3', flexDirection: 'row', gap: 24 },
  tab: { color: '#9A9187', fontSize: 15, fontWeight: '700' },
  activeTab: { color: '#CE6A5B', borderBottomWidth: 2, borderBottomColor: '#CE6A5B', paddingBottom: 10 },
  timeline: { marginTop: 16 },
  row: { minHeight: 74, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  time: { width: 74, paddingTop: 16, color: '#786F66', fontSize: 12, fontWeight: '800' },
  dot: { width: 28, height: 28, marginTop: 12, borderRadius: 14, backgroundColor: '#397D7A', alignItems: 'center', justifyContent: 'center' },
  card: { flex: 1, marginTop: 8, marginBottom: 4, padding: 13, borderRadius: 15, backgroundColor: '#fff' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { flex: 1, color: '#2F2B27', fontSize: 15, fontWeight: '800' },
  note: { marginTop: 5, color: '#887F75', fontSize: 12, lineHeight: 18 },
  mapButton: { marginTop: 10, padding: 9, borderRadius: 9, backgroundColor: '#397D7A' },
  mapButtonText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  placeList: { marginTop: 16, borderRadius: 16, backgroundColor: '#fff' },
  placeRow: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0EAE4', flexDirection: 'row', justifyContent: 'space-between' },
  placeName: { color: '#2F2B27', fontSize: 14, fontWeight: '700' },
  open: { color: '#397D7A', fontSize: 18 },
  tip: { marginTop: 20, padding: 14, borderRadius: 14, backgroundColor: '#E7F1EF' },
  tipText: { color: '#4C6967', fontSize: 12, lineHeight: 18 }
});

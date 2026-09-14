# React Navigation Notes

Bu dosya, `meals-app` projesinde React Navigation 7 kullanırken başvurulacak kısa ama kapsamlı bir nottur.

Proje şu anda:

- Expo SDK `~57.0.22`
- React Navigation `^7.3.18`
- `@react-navigation/native-stack` `^7.18.10`
- JavaScript kullanıyor
- Kategoriler ekranını başlangıç ekranı olarak kullanıyor

> Kaynak: [React Navigation - Getting started](https://reactnavigation.org/docs/getting-started/) ve ilgili React Navigation 7 dokümanları.

## 1. React Navigation Nedir?

React Native'in kendi içinde ekranlar arasında geçiş sağlayan yerleşik bir routing sistemi yoktur. React Navigation bu eksikliği giderir ve şunları sağlar:

- Ekranlar arasında geçiş
- Geri butonu ve Android geri hareketi
- Header, tab bar ve drawer gibi arayüzler
- Parametrelerle ekranlara veri gönderme
- Deep linking ve web URL desteği
- Navigation state yönetimi

Temel kavramlar:

- **Screen:** Kullanıcının gördüğü ekran.
- **Route:** Bir ekranın navigation içindeki adı ve state kaydı.
- **Navigator:** Ekranların nasıl gösterileceğini ve geçişlerin nasıl yapılacağını belirler.
- **Navigation container:** Navigation ağacını ve navigation state'i tutan root bileşen.

## 2. Kurulum

React Navigation çekirdeği:

```bash
npm install @react-navigation/native
```

Expo projelerinde ortak native bağımlılıklar:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

Native stack için:

```bash
npm install @react-navigation/native-stack
```

Bu projede bu paketler zaten `package.json` içinde bulunuyor. Yeni bir navigator eklerken yalnızca o navigator'ın paketini ayrıca kurmak gerekir.

Örnek:

```bash
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
npm install @react-navigation/material-top-tabs
```

> Expo projelerinde Expo ile ilişkili native paketleri `npx expo install` ile kurmak, SDK ile uyumlu sürüm seçilmesini sağlar.

## 3. Static ve Dynamic Configuration

React Navigation 7 iki yapılandırma biçimi sunar.

| Konu | Static | Dynamic |
|---|---|---|
| Tanımlama | Obje tabanlı | JSX bileşenleriyle |
| Dokümandaki durum | Önerilen | Daha fazla boilerplate |
| TypeScript | Otomatik tip çıkarımı daha iyi | Tipleri daha çok elle tanımlamak gerekir |
| Deep linking | Daha kolay yapılandırma | Daha fazla ayar gerekir |
| Ekran listesi | Genellikle sabit | Koşullu/dinamik ekran listelerinde esnek |
| Kurs uyumluluğu | Yeni dokümanlarla uyumlu | Klasik kurs örnekleriyle daha uyumlu |

### Static örneği

```jsx
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Categories: CategoriesScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

### Dynamic örneği

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
```

### Bu proje için seçim

Kurs takip ediliyorsa **dynamic** yapı daha anlaşılır ve kurs örnekleriyle uyumludur. Yeni bir projede sabit ekran listesi ve güçlü TypeScript/deep-linking desteği isteniyorsa **static** tercih edilebilir.

Static ve dynamic aynı uygulamada karıştırılmamalıdır. Root seviyesinde yalnızca bir navigation ağacı ve dynamic kullanımda yalnızca bir `NavigationContainer` olmalıdır.

## 4. App.js İçinde Önerilen Başlangıç Yapısı

Bu proje için dynamic native stack başlangıcı:

```jsx
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: 'Categories' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

`NavigationContainer` ekranların içine değil, uygulamanın root seviyesine konur. Uygulamada çoğunlukla yalnızca bir tane bulunur.

## 5. Hangi Navigator Ne Zaman Kullanılır?

### Native Stack Navigator

Ekranların ileri-geri bir yığın şeklinde açıldığı akışlarda kullanılır.

```text
Categories -> Meals Overview -> Meal Detail
```

Bu proje için temel seçim budur.

```jsx
<Stack.Navigator>
  <Stack.Screen name="Categories" component={CategoriesScreen} />
  <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
  <Stack.Screen name="MealDetail" component={MealDetailScreen} />
</Stack.Navigator>
```

`@react-navigation/native-stack`, platformun native geçişlerini kullanır. Mobil uygulamalarda genellikle `@react-navigation/stack` yerine tercih edilir.

### Bottom Tab Navigator

Uygulamanın ana bölümleri arasında alt menüyle geçiş gerekiyorsa kullanılır.

```text
Home | Favorites | Settings
```

```jsx
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

Kurulum:

```bash
npm install @react-navigation/bottom-tabs
```

### Drawer Navigator

Yan menüden birçok bölüme erişim gerekiyorsa kullanılır.

```text
Menu
- Home
- Favorites
- Settings
- About
```

```jsx
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

Kurulum:

```bash
npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

### Material Top Tab Navigator

Aynı bölüm içindeki kategoriler veya filtreler için üstte sekmeler gerekiyorsa kullanılır.

```text
Popular | Recent | Vegetarian
```

```jsx
const Tab = createMaterialTopTabNavigator();

function MealsTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Popular" component={PopularScreen} />
      <Tab.Screen name="Recent" component={RecentScreen} />
    </Tab.Navigator>
  );
}
```

Kurulum:

```bash
npm install @react-navigation/material-top-tabs react-native-pager-view
```

### Navigator seçimi özeti

| İhtiyaç | Navigator |
|---|---|
| Kategori ekranından yemek detayına gitmek | Native Stack |
| Ana bölümler arasında kalıcı alt menü | Bottom Tabs |
| Yan menü | Drawer |
| Aynı sayfadaki filtre/sekme grupları | Material Top Tabs |
| Detay ekranları ve geri dönüş akışı | Native Stack |

Navigator'lar iç içe kullanılabilir. Örneğin Bottom Tabs içinde her tab için ayrı Native Stack kurulabilir.

## 6. Meals App İçin Önerilen Mimari

Uygulama büyüdüğünde şu yapı uygundur:

```text
NavigationContainer
└── RootStack
    ├── MainTabs
    │   ├── HomeStack
    │   │   ├── Categories
    │   │   ├── MealsOverview
    │   │   └── MealDetail
    │   └── FavoritesStack
    │       └── Favorites
    └── Settings
```

Daha küçük sürüm için yalnızca tek stack yeterlidir:

```text
RootStack
├── Categories
├── MealsOverview
└── MealDetail
```

Gereksiz nesting yapılmamalıdır. Fazla iç içe navigator:

- Navigation kodunu zorlaştırır.
- Header'ların üst üste görünmesine neden olabilir.
- State ve deep linking yönetimini karmaşıklaştırır.
- Düşük seviye cihazlarda ek view/memory maliyeti oluşturabilir.

## 7. Ekranlar Arasında Geçiş

### `navigation.navigate`

Bir route'a gitmek için kullanılır. Aynı route zaten aktifse gereksiz yeni ekran eklemez.

```jsx
function CategoriesScreen({ navigation }) {
  return (
    <Button
      title="Italian meals"
      onPress={() => navigation.navigate('MealsOverview')}
    />
  );
}
```

### `navigation.push`

Stack'e her zaman yeni bir route ekler. Aynı ekranı farklı verilerle tekrar açmak için kullanılabilir.

```jsx
navigation.push('MealDetail', { mealId: 'm1' });
```

### `navigation.goBack`

Bir önceki ekrana döner.

```jsx
<Button title="Back" onPress={() => navigation.goBack()} />
```

Android'in fiziksel geri butonu ve geri gesture'ı native stack ile normalde otomatik çalışır.

### `navigation.popTo`

Belirli bir route'a geri döner ve aradaki ekranları stack'ten çıkarır.

```jsx
navigation.popTo('Categories');
```

### `navigation.popToTop`

Stack'in ilk ekranına döner.

```jsx
navigation.popToTop();
```

## 8. Parametre Gönderme

Parametreler navigation metodunun ikinci argümanı olarak gönderilir:

```jsx
navigation.navigate('MealDetail', {
  mealId: 'm1',
});
```

Hedef ekranda `route.params` üzerinden okunur:

```jsx
function MealDetailScreen({ route }) {
  const { mealId } = route.params;

  return <Text>Meal ID: {mealId}</Text>;
}
```

Güvenli kullanım:

```jsx
const mealId = route.params?.mealId;
```

### Parametrelerde ne tutulmalı?

Parametreler küçük, JSON-serializable ve ekranı tanımlamak için gerekli bilgiler olmalıdır:

```jsx
navigation.navigate('MealDetail', { mealId: 'm1' });
```

Tüm meal nesnesini göndermek yerine ID gönderilmelidir:

```jsx
// Tercih edilmez
navigation.navigate('MealDetail', { meal: completeMealObject });

// Tercih edilir
navigation.navigate('MealDetail', { mealId: 'm1' });
```

Büyük nesneler:

- Veriyi çoğaltabilir.
- Eski/stale veri oluşturabilir.
- Deep linking ve state persistence'ı zorlaştırabilir.
- Navigation state içinde serializable warning oluşturabilir.

### Initial params

```jsx
<Stack.Screen
  name="MealDetail"
  component={MealDetailScreen}
  initialParams={{ mealId: 'm1' }}
/>
```

### Parametreleri değiştirme

```jsx
navigation.setParams({ mealId: 'm2' });
```

Ekran başlığını değiştirmek için `setParams` yerine `navigation.setOptions` kullanılmalıdır:

```jsx
navigation.setOptions({ title: 'Spaghetti' });
```

`screen`, `params`, `initial` ve `state` isimleri nested navigation tarafından kullanıldığı için kendi parametre isimleri olarak tercih edilmemelidir.

## 9. Nested Navigator'a Gitmek

Bir navigator başka bir navigator'ın ekranıysa, child route'a şu şekilde gidilebilir:

```jsx
navigation.navigate('Meals', {
  screen: 'MealDetail',
  params: { mealId: 'm1' },
});
```

Her navigator kendi history'sini ve options'larını tutar. Child navigator'ın `title` ayarı parent header'ını otomatik olarak değiştirmez.

İç içe stack'in iki header göstermesini önlemek için parent screen'de:

```jsx
<Stack.Screen
  name="MainTabs"
  component={MainTabs}
  options={{ headerShown: false }}
/>
```

Nesting kuralı: Önce istediğin kullanıcı arayüzünü belirle, sonra yalnızca gerekli navigator'ları iç içe koy.

## 10. Header ve Screen Options

Tek bir ekran için:

```jsx
<Stack.Screen
  name="Categories"
  component={CategoriesScreen}
  options={{
    title: 'Meal Categories',
  }}
/>
```

Tüm ekranlar için:

```jsx
<Stack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: '#f5428d' },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold' },
  }}
>
  {/* screens */}
</Stack.Navigator>
```

Ekran içinden dinamik title:

```jsx
function MealDetailScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: route.params?.mealId });
  }, [navigation, route.params?.mealId]);

  return <View />;
}
```

## 11. Authentication Flow

Kullanıcı giriş yapmışsa uygulama ekranları, yapmamışsa giriş ekranları gösterilmelidir.

Dynamic yaklaşım:

```jsx
<NavigationContainer>
  <Stack.Navigator>
    {isLoading ? (
      <Stack.Screen name="Splash" component={SplashScreen} />
    ) : userToken == null ? (
      <Stack.Screen name="SignIn" component={SignInScreen} />
    ) : (
      <Stack.Screen name="Home" component={HomeScreen} />
    )}
  </Stack.Navigator>
</NavigationContainer>
```

`isSignedIn` değiştiğinde elle `navigate('Home')` çağırmak gerekmez. Ekran listesinin koşula göre değişmesi navigation state'i günceller.

Tipik akış:

1. Splash/loading ekranı gösterilir.
2. Token güvenli storage'dan okunur.
3. Token yoksa SignIn gösterilir.
4. Token varsa uygulama ekranları gösterilir.
5. Sign out sırasında token temizlenir ve auth ekranları gösterilir.

Expo'da token gibi hassas bilgiler için `expo-secure-store` kullanılabilir:

```bash
npx expo install expo-secure-store
```

Navigation params içine token veya hassas veri koyulmamalıdır.

## 12. Deep Linking

Deep link, uygulamanın belirli bir ekranının URL ile açılmasıdır:

```text
mealsapp://meal/m1
```

Expo kurulumu:

```bash
npx expo install expo-linking
```

`app.json`:

```json
{
  "expo": {
    "scheme": "mealsapp"
  }
}
```

Expo'da URL prefix'i `Linking.createURL('/')` ile oluşturmak daha güvenlidir:

```jsx
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Categories: 'categories',
      MealDetail: 'meal/:mealId',
    },
  },
};
```

Dynamic kullanım:

```jsx
<NavigationContainer linking={linking}>
  <RootStack />
</NavigationContainer>
```

Deep linking için navigation state'i elle `ref` üzerinden yönetmek yerine `linking` prop'u tercih edilmelidir.

Test örneği:

```bash
npx uri-scheme open "mealsapp://meal/m1" --ios
npx uri-scheme open "mealsapp://meal/m1" --android
```

Custom scheme değişikliklerinden sonra standalone/dev build yeniden oluşturulmalıdır. Expo Go'da kullanılan URL genellikle `exp://.../--/...` biçimindedir.

## 13. Navigation State Persistence

Kullanıcı uygulamayı kapattığında aynı ekrana dönmek isteniyorsa navigation state kaydedilebilir.

Gerekli paket:

```bash
npx expo install @react-native-async-storage/async-storage
```

Temel fikir:

```jsx
const [isReady, setIsReady] = React.useState(false);
const [initialState, setInitialState] = React.useState();

React.useEffect(() => {
  const restoreState = async () => {
    const savedState = await AsyncStorage.getItem('NAVIGATION_STATE');

    if (savedState) {
      setInitialState(JSON.parse(savedState));
    }

    setIsReady(true);
  };

  restoreState();
}, []);

if (!isReady) {
  return null;
}

return (
  <NavigationContainer
    initialState={initialState}
    onStateChange={(state) =>
      AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
    }
  >
    <RootStack />
  </NavigationContainer>
);
```

Deep link varsa kayıtlı state'i kullanmadan deep link'i önceliklendirmek gerekir.

Production'da persistence dikkatli kullanılmalıdır. Hatalı bir ekranda kayıtlı state kalırsa uygulama her açılışta aynı hatalı ekrana dönebilir. Navigation state ve params serializable olmalıdır.

## 14. Themes

React Navigation'ın header ve tab bar gibi bileşenlerini theme üzerinden özelleştirebilirsin.

```jsx
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

const MealsTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f5428d',
    background: '#ffffff',
    card: '#ffffff',
    text: '#222222',
  },
};

<NavigationContainer theme={MealsTheme}>
  <RootStack />
</NavigationContainer>
```

İşletim sisteminin dark/light tercihi:

```jsx
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootStack />
    </NavigationContainer>
  );
}
```

Ekranların aynı theme renklerine erişmesi için `useTheme` kullanılabilir:

```jsx
import { useTheme } from '@react-navigation/native';

function CustomTitle() {
  const { colors } = useTheme();

  return <Text style={{ color: colors.text }}>Categories</Text>;
}
```

Navigation theme'i ekranın kendi `View` backgroundColor ayarını otomatik olarak değiştirmeyebilir. Ekranlarda açıkça `flex: 1` ve uygun background rengi verilmelidir.

## 15. Web Desteği

React Navigation web üzerinde de çalışır. İyi URL ve browser history davranışı için:

- Linking yapılandırılmalıdır.
- Web'de mümkün olduğunda `Link` veya `Button` kullanılmalıdır.
- Deploy sırasında SPA fallback/redirect ayarlanmalıdır.
- Responsive tasarım düşünülmelidir.

Web'de `navigation.navigate` çalışsa da `Link` ve `Button`, browser için gerçek link davranışına daha yakındır.

Native Stack web'de native gesture ve animasyonları desteklemeyebilir. Web davranışı native'den farklı olabilir.

## 16. Test Yazımı

React Navigation testlerinde gerçek navigator kullanmak ve kullanıcı davranışını test etmek önerilir.

Şunu test etmek zayıftır:

```jsx
expect(navigation.navigate).toHaveBeenCalledWith('Details');
```

Şunu test etmek daha doğrudur:

```jsx
await user.press(screen.getByRole('button', { name: 'Details' }));

expect(screen.getByText('Details screen')).toBeVisible();
```

Temel ilkeler:

- Navigation'ı gereksiz yere mock etme.
- Navigation action'ın çağrılmasını değil, kullanıcıya görünen sonucu test et.
- Animasyonlarda fake timers kullan.
- Önceki ekranın component tree'de bulunabileceğini, fakat görünür olmayabileceğini unutma.
- `toBeVisible()` ile görünürlük kontrol et.

Önerilen kütüphaneler:

```bash
npm install --save-dev jest @testing-library/react-native
```

## 17. Sık Yapılan Hatalar

### Birden fazla NavigationContainer kullanmak

```jsx
// Yanlış yaklaşım
function CategoriesScreen() {
  return (
    <NavigationContainer>
      {/* screen */}
    </NavigationContainer>
  );
}
```

`NavigationContainer` root seviyesinde olmalıdır.

### Screen component yerine inline component vermek

```jsx
// Kaçınılmalı
<Stack.Screen
  name="Home"
  component={() => <HomeScreen />}
/>
```

Bu yaklaşım yeniden render olduğunda ekranın unmount/remount olmasına ve state kaybına yol açabilir. Bunun yerine:

```jsx
<Stack.Screen name="Home" component={HomeScreen} />
```

### Yanlış route adı kullanmak

```jsx
navigation.navigate('MealDetails');
```

Navigator'da route gerçekten `MealDetail` ise isimler birebir aynı olmalıdır.

### Büyük nesneleri params olarak göndermek

Sadece ID veya küçük ekran state'i gönder. Veriyi ortak store, cache veya veri katmanından oku.

### Gereksiz navigator nesting

Her ekranı ayrı navigator içine koymak yerine gerçekten farklı bir navigation davranışı gerektiğinde nesting kullan.

### Çift header

Nested navigator kullanırken parent screen'de gerekirse:

```jsx
options={{ headerShown: false }}
```

### Navigation'ı elle yönlendirmeye çalışmak

Auth ekranları koşullu render ediliyorsa auth state değiştiğinde elle `navigate` çağırma. React Navigation uygun ekranı kendisi seçer.

### iOS/Android safe area sorunları

Header veya ekran içeriği status bar'a çok yakınsa `react-native-safe-area-context` kullan. Navigator'ın kendi header'ı çoğu durumda safe area'yı yönetir; özel header ve full-screen içerikte ayrıca kontrol gerekir.

## 18. Bu Proje İçin Uygulama Sırası

1. `App.js` içinde root `NativeStack` oluştur.
2. `CategoriesScreen` ekranını `Categories` route'una bağla.
3. `MealsOverviewScreen` oluştur ve `Categories` içinden navigate et.
4. Seçilen category ID'sini params ile gönder.
5. `MealDetailScreen` oluştur ve meal ID'sini params ile gönder.
6. Header title ve ortak screen options'ları düzenle.
7. Gerekirse Favorites için Bottom Tabs ekle.
8. Giriş sistemi eklenirse auth flow'u navigation state ile koşullu tanımla.
9. Dış URL veya notification ile ekran açılacaksa deep linking ekle.
10. Uygulama son ekranda açılsın isteniyorsa state persistence ekle.

Başlangıç route yapısı:

```jsx
<Stack.Navigator>
  <Stack.Screen
    name="Categories"
    component={CategoriesScreen}
  />
  <Stack.Screen
    name="MealsOverview"
    component={MealsOverviewScreen}
  />
  <Stack.Screen
    name="MealDetail"
    component={MealDetailScreen}
  />
</Stack.Navigator>
```

Kategori tile'ından geçiş örneği:

```jsx
<Pressable
  onPress={() =>
    navigation.navigate('MealsOverview', {
      categoryId: category.id,
    })
  }
>
  <Text>{category.name}</Text>
</Pressable>
```

## 19. Kısa Karar Rehberi

- Ekranlar ileri/geri açılıyorsa: **Native Stack**
- Ana bölümler alt menüyle ayrılıyorsa: **Bottom Tabs**
- Yan menü gerekiyorsa: **Drawer**
- Aynı bölümde yatay sekmeler varsa: **Material Top Tabs**
- Sabit route listesi ve güçlü tip/deep linking isteniyorsa: **Static configuration**
- Kurs örneği JSX ile ilerliyorsa veya route listesi koşulluysa: **Dynamic configuration**
- Navigation root'u: **Tek bir `NavigationContainer`**
- Ekrana veri: **Minimal, serializable params**
- Test: **Action çağrısını değil görünür sonucu test et**

## Resmi Dokümanlar

- [Getting started](https://reactnavigation.org/docs/getting-started/)
- [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation)
- [Navigating](https://reactnavigation.org/docs/navigating)
- [Params](https://reactnavigation.org/docs/params)
- [Nesting navigators](https://reactnavigation.org/docs/nesting-navigators)
- [Authentication flows](https://reactnavigation.org/docs/auth-flow)
- [Deep linking](https://reactnavigation.org/docs/deep-linking)
- [State persistence](https://reactnavigation.org/docs/state-persistence)
- [Themes](https://reactnavigation.org/docs/themes)
- [TypeScript](https://reactnavigation.org/docs/typescript)
- [Testing](https://reactnavigation.org/docs/testing)
- [Web support](https://reactnavigation.org/docs/web-support)

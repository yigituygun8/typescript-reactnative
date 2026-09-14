# Meals App Architecture

Bu dosya, Meals App demo projesinin nasıl organize edildiğini ve bu kararların nedenlerini açıklar. Amaç yalnızca dosyaları listelemek değil, projeyi büyütürken hangi sorumluluğun nereye ait olduğunu hatırlamaktır.

## 1. Uygulamanın Ana Fikri

Uygulama şu kullanıcı akışını gösterir:

```text
Meal Categories
    -> Meals Overview
        -> Meal Detail modal
```

Ayrıca uygulamanın ana bölümleri bottom tab ile ayrılır:

```text
Meals tab
    -> Categories
    -> Meals Overview

Favorites tab
    -> Favorites
```

Bu proje bir backend veya authentication sistemi içermeyen, React Native ve React Navigation temellerini öğreten bir demo uygulamasıdır. Veriler şimdilik `data/dummy-data.js` içindeki sabit mock verilerden gelir.

## 2. Klasör Yapısı

```text
meals-app/
├── App.js
├── index.js
├── app.json
├── package.json
├── navigation/
│   ├── RootNavigator.js
│   ├── MainTabs.js
│   └── MealsStack.js
├── screens/
│   ├── CategoriesScreen.js
│   ├── MealsOverviewScreen.js
│   ├── MealDetailScreen.js
│   └── FavoritesScreen.js
├── components/
│   ├── CategoryGridTile.js
│   └── MealItem.js
├── data/
│   └── dummy-data.js
├── models/
│   ├── category.js
│   └── meal.js
├── assets/
└── NAVIGATION.md
```

### `App.js`

Uygulamanın composition root'udur. Burada sadece uygulama seviyesindeki provider'lar ve root navigation bulunur:

```jsx
<SafeAreaProvider>
  <StatusBar style="auto" />
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
</SafeAreaProvider>
```

`App.js` içine bütün `Stack.Screen`, `Tab.Screen` ve drawer ekranlarını koymuyoruz. Uygulama büyüdükçe `App.js` karmaşıklaşmasın diye navigator'lar `navigation/` klasörüne ayrıldı.

### `index.js`

Expo'nun root component'i çalıştırmasını sağlar. Normalde navigation mantığı burada bulunmaz.

### `navigation/`

Navigation ağacını ve ekranlar arasındaki ilişkileri içerir. Bir navigator, ekranların nasıl gruplanacağını ve geçiş davranışlarını belirler.

### `screens/`

Kullanıcının bağımsız bir ekran olarak gördüğü sayfalardır. Örneğin `CategoriesScreen` ve `MealDetailScreen` birer screen'dir.

### `components/`

Bir screen'in içinde tekrar kullanılabilen UI parçalarıdır. `MealItem` ve `CategoryGridTile` kendi başlarına route değildir; `Stack.Screen` olarak register edilmezler.

### `data/`

Demo verilerinin bulunduğu katmandır. Gerçek uygulamada bu katman API, repository veya store ile değiştirilebilir.

### `models/`

Meal ve category nesnelerinin alanlarını tanımlar. Bu demo JavaScript constructor sınıfları kullanıyor.

## 3. Navigation Mimarisi

Navigation ağacı şu şekildedir:

```text
NavigationContainer
└── RootNavigator (Native Stack)
    ├── MainTabs (Bottom Tabs)
    │   ├── Meals (MealsStack)
    │   │   ├── MealsCategories
    │   │   └── MealsOverview
    │   └── Favorites
    └── MealDetail (modal)
```

### Neden Root Stack var?

`RootNavigator`, uygulamanın en dışındaki navigation akışını yönetir. `MealDetail` ekranının root stack'te olmasının sebebi modalın tab bar'ın üstünde açılmasıdır.

Eğer `MealDetail` sadece `MealsStack` içinde olsaydı, detay ekranı Meals tabının içine ait olurdu. Root stack'te bulununca modal, hangi tabdan açıldığına bakmadan uygulama seviyesinde gösterilebilir.

```jsx
<Stack.Screen
  name="MealDetail"
  component={MealDetailScreen}
  options={{ presentation: "modal" }}
/>
```

### Neden Bottom Tabs var?

`Meals` ve `Favorites` uygulamanın ana bölümleridir. Kullanıcı bu bölümler arasında sıkça geçiş yapacağı için bottom tab uygun bir UI'dır.

```jsx
<Tab.Navigator>
  <Tab.Screen name="Meals" component={MealsStack} />
  <Tab.Screen name="Favorites" component={FavoritesScreen} />
</Tab.Navigator>
```

Tab bar ana bölümleri değiştirir; detay ekranları açmak için kullanılmaz.

### Neden MealsStack var?

Meals tabının kendi içinde sıralı bir navigation akışı vardır:

```text
Categories -> Meals Overview -> Meal Detail
```

Bu nedenle Meals tabı doğrudan tek bir screen yerine kendi Native Stack navigator'ını içerir.

`MealsStack` içindeki ilk screen otomatik olarak başlangıç screen'idir:

```jsx
<Stack.Screen
  name="MealsCategories"
  component={CategoriesScreen}
/>
```

Bu yüzden uygulama açıldığında içerik olarak `Meal Categories` görünür, fakat alt tab bar da `Meals` ve `Favorites` olarak görünmelidir.

## 4. Navigator Sorumlulukları

| Navigator | Sorumluluğu | Bu projedeki örneği |
|---|---|---|
| `NavigationContainer` | Navigation state'i ve context'i sağlar | `App.js` |
| Root Native Stack | Uygulama seviyesindeki ekranlar ve modallar | `RootNavigator` |
| Bottom Tabs | Ana bölümler arasında geçiş | `Meals`, `Favorites` |
| Meals Native Stack | Meals bölümündeki ileri/geri akışı | `Categories`, `MealsOverview` |

### `NavigationContainer` neden bir tane?

Normal bir uygulamada tek bir root `NavigationContainer` olmalıdır. Birden fazla container kullanmak navigation context'lerini böler ve route'ların birbirini bulamamasına yol açabilir.

### Ekranları register etmek

Navigation ile bağımsız açılacak her ekran register edilir:

```jsx
<Stack.Screen
  name="MealsOverview"
  component={MealsOverviewScreen}
/>
```

Fakat UI component'leri register edilmez:

```jsx
<MealItem item={item} />
<CategoryGridTile title={title} color={color} />
```

Kural:

> Kullanıcının navigation history'sinde bağımsız bir durak olacaksa screen; başka bir screen'in içinde render edilecekse component.

## 5. Navigation Data Flow

### Kategori seçimi

`CategoriesScreen`, kategori kartına basıldığında `MealsOverview` route'una iki küçük parametre gönderir:

```jsx
navigation.navigate("MealsOverview", {
  categoryId: itemData.item.id,
  categoryName: itemData.item.title,
});
```

`MealsOverviewScreen` bu parametreleri alır:

```jsx
const catId = route.params.categoryId;
const categoryName = route.params.categoryName;
```

Sonra `MEALS` listesini kategori ID'sine göre filtreler:

```jsx
const displayedMeals = MEALS.filter(
  (meal) => meal.categoryIds.indexOf(catId) >= 0
);
```

### Meal seçimi

`MealsOverviewScreen`, `MealItem` component'ine navigation kararını prop olarak verir:

```jsx
<MealItem
  item={itemData.item}
  onPress={() => navigation.navigate("MealDetail", { mealProps })}
/>
```

`MealItem` navigation kütüphanesini bilmez. Sadece kendisine verilen `onPress` callback'ini `Pressable`'a aktarır. Bu ayrım önemlidir:

- `MealItem` reusable kalır.
- UI component'i React Navigation'a bağımlı olmaz.
- Navigation kararı screen seviyesinde kalır.
- Component'i test etmek kolaylaşır.

### Meal detail verisi

Demo kodunda seçilen meal, `mealProps` adıyla plain object'e çevrilip route params içine gönderilir:

```jsx
const mealProps = { ...itemData.item };
navigation.navigate("MealDetail", { mealProps });
```

`MealDetailScreen` içinde tek seferde destructure edilir:

```jsx
const { mealProps } = route.params;
const {
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
  ingredients,
  steps,
} = mealProps;
```

Bu, çok sayıda ayrı parametre göndermekten daha okunabilirdir.

### Demo ile production arasındaki fark

Küçük demo için meal object'ini params içinde taşımak kabul edilebilir. Büyük veya production uygulamasında genellikle yalnızca ID gönderilir:

```jsx
navigation.navigate("MealDetail", { mealId: item.id });
```

Detail screen daha sonra meal'i store, cache veya API'den bulur. Bunun avantajları:

- Navigation state daha küçük olur.
- Aynı data tekrar tekrar kopyalanmaz.
- Stale object riski azalır.
- Deep linking ve state persistence daha kolay olur.

## 6. `useLayoutEffect` Neden Kullanılıyor?

`MealsOverviewScreen`, header title'ını seçilen kategoriye göre değiştirir:

```jsx
useLayoutEffect(() => {
  navigation.setOptions({
    title: categoryName,
    headerBackTitle: "Back to Categories",
  });
}, [navigation, categoryName]);
```

`navigation.setOptions` bir navigation state güncellemesidir. Bu çağrı component render gövdesinde doğrudan yapılmamalıdır; aksi halde şu tür hata oluşur:

```text
Cannot update a component while rendering a different component
```

`useLayoutEffect`, screen render edildikten sonra ama browser/native paint öncesi çalıştığı için header ayarı geçişte daha düzgün görünür.

Alternatif olarak route parametresine bağlı sabit options, `Stack.Screen` üzerinde tanımlanabilir. Ekran açılmadan önce bilinen ayarlar için bu yaklaşım daha da temizdir.

## 7. Modal Detail Screen

`MealDetailScreen` root stack'te `presentation: "modal"` ile tanımlıdır. Bu şu anlama gelir:

- Detay ekranı normal stack push yerine modal gibi açılır.
- Kullanıcı mevcut bağlamın üzerine yeni bir ekran görür.
- `navigation.goBack()` modalı kapatır.
- Header'da varsayılan back yerine özel `X` butonu kullanılabilir.

```jsx
headerBackVisible: false,
headerRight: () => (
  <Pressable onPress={() => navigation.goBack()}>
    <Text>X</Text>
  </Pressable>
)
```

`headerRight` içindeki `navigation`, `RootNavigator` tarafından options callback'ine verilir. `Pressable` event nesnesi navigation değildir.

## 8. Screen ve Component Ayrımı

### Screen'ler

Screen'ler navigation props alabilir:

```jsx
const MealsOverviewScreen = ({ route, navigation }) => {
  // route params oku
  // navigation action çağır
};
```

Screen'ler genellikle şunlardan sorumludur:

- Route parametrelerini okumak
- Veriyi filtrelemek veya yüklemek
- Navigation kararını vermek
- Birden fazla component'i bir araya getirmek

### Component'ler

Component'ler mümkün olduğunca navigation-agnostic olmalıdır:

```jsx
const MealItem = ({ item, onPress }) => {
  return <Pressable onPress={onPress}>{/* UI */}</Pressable>;
};
```

Component'ler genellikle şunlardan sorumludur:

- Görsel sunum
- Kullanıcı etkileşimini callback olarak bildirmek
- Kendi küçük UI state'ini yönetmek

Bu projede `MealItem`, image load error durumunda placeholder'a geçmek için kendi local state'ini kullanır. Bu, navigation state'i değildir.

## 9. Veri Modeli

`Meal` modeli şu bilgileri taşır:

```text
id
categoryIds
title
affordability
complexity
imageUrl
duration
ingredients
steps
isGlutenFree
isVegan
isVegetarian
isLactoseFree
```

`categoryIds` ilişkisi meals ile categories arasında basit bir many-to-many bağlantı kurar:

```text
Category c1 -> Meal m1, Meal m5
Meal m1 -> Category c1, Category c2
```

Bu demo için yeterli olan filtreleme işlemi:

```jsx
meal.categoryIds.indexOf(categoryId) >= 0
```

Gerçek bir uygulamada bu ilişki API sorgusu, database query veya normalized global store ile yönetilebilir.

## 10. Görsel ve Fallback Yaklaşımı

Meal görselleri şu anda remote URL'lerden yükleniyor. Remote image her zaman başarılı olmayabilir. Bu yüzden `MealItem` ve `MealDetailScreen` image error durumunda placeholder kullanır:

```jsx
const [imageUri, setImageUri] = useState(item.imageUrl);

<Image
  source={{ uri: imageUri }}
  onError={() => setImageUri(PLACEHOLDER_IMAGE)}
/>
```

Bu, kullanıcıya boş veya kırık bir image alanı göstermekten daha iyi bir davranıştır.

Production uygulamasında placeholder'ı remote URL yerine local asset yapmak daha güvenilir olabilir:

```jsx
const PLACEHOLDER_IMAGE = require("../assets/placeholder.png");
```

## 11. Stil ve Layout Kararları

### Root screen'lerde `flex: 1`

Screen container'larında `flex: 1` kullanılır:

```jsx
container: {
  flex: 1,
}
```

Bu, screen'in mevcut alanı tamamen doldurmasını sağlar. Özellikle iOS'ta root view alanı doldurmazsa altta beklenmeyen boş veya siyah alanlar görülebilir.

### Safe area

`SafeAreaProvider`, uygulama seviyesinde safe area context sağlar. Native stack header safe area'yı kendi yönettiği için header'lı screen'lerin içine gereksiz bir `SafeAreaView` eklemek içeriği iki kez aşağı itebilir.

Safe area gerektiğinde:

- Root'ta `SafeAreaProvider` bırakılır.
- Header'sız full-screen özel içeriklerde `SafeAreaView` veya `useSafeAreaInsets` kullanılır.
- Aynı inset iki farklı seviyede tekrar uygulanmaz.

### Kart gölgeleri

`MealItem` ve `CategoryGridTile` yapısında dış `View` gölgeyi, iç `Pressable` etkileşimi yönetir:

```text
Outer View
├── shadow/elevation
└── Pressable
    ├── borderRadius/overflow
    └── pressed/ripple feedback
```

Bu ayrım önemlidir çünkü iOS gölgesi component sınırlarının dışına taşabilir; ripple ve içerik clipping ise iç Pressable üzerinde kontrol edilmelidir.

## 12. Uygulama Açılış Akışı

Uygulama başlarken:

1. `index.js`, `App` component'ini register eder.
2. `App.js`, provider'ları oluşturur.
3. `NavigationContainer`, navigation context ve state'i sağlar.
4. `RootNavigator`, `MainTabs` route'unu ilk route olarak gösterir.
5. `MainTabs`, başlangıçta `Meals` tabını gösterir.
6. `MealsStack`, başlangıçta `MealsCategories` screen'ini gösterir.
7. Kullanıcı kategori seçince `MealsOverview` açılır.
8. Kullanıcı meal seçince root seviyedeki `MealDetail` modalı açılır.

## 13. Yeni Bir Ekran Eklerken Karar Ağacı

Önce ekranın kullanıcı akışındaki yerini belirle:

### Meals akışının parçasıysa

`navigation/MealsStack.js` içine ekle:

```jsx
<Stack.Screen
  name="NewMealsScreen"
  component={NewMealsScreen}
/>
```

### Ana bölümse

`navigation/MainTabs.js` içine yeni `Tab.Screen` ekle:

```jsx
<Tab.Screen
  name="Profile"
  component={ProfileScreen}
/>
```

### Uygulama seviyesinde modal veya ortak ekran ise

`navigation/RootNavigator.js` içine ekle:

```jsx
<Stack.Screen
  name="Help"
  component={HelpScreen}
  options={{ presentation: "modal" }}
/>
```

### Sadece tekrar kullanılabilir UI parçasıysa

`components/` altında oluştur; navigator'a register etme.

## 14. Uygulama Büyürse

Bu demo büyüdüğünde aşağıdaki yapıya geçilebilir:

```text
navigation/
├── RootNavigator.js
├── MainTabs.js
├── MealsStack.js
└── navigationTypes.ts

features/
├── meals/
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   └── mealsApi.js
├── favorites/
│   ├── screens/
│   └── components/
└── auth/
    ├── screens/
    └── authContext.js
```

Muhtemel sonraki adımlar:

- Favorites state'i eklemek
- `mealId` ile detail ekranında veri bulmak
- API veya local database bağlamak
- Auth flow eklemek
- Navigation params için TypeScript tipleri eklemek
- Deep linking eklemek
- Navigation state persistence eklemek
- Reusable components için test yazmak

## 15. Akılda Kalması Gereken Kurallar

1. `App.js` root provider'lar ve `NavigationContainer` için sade kalır.
2. Her bağımsız navigation destination bir navigator içinde `Screen` olarak register edilir.
3. `MealItem` ve `CategoryGridTile` gibi UI component'leri screen olarak register edilmez.
4. Ana uygulama bölümleri için tabs, ileri/geri akışlar için stack kullanılır.
5. Modal veya uygulama geneli ekranlar root stack'te tutulabilir.
6. Tek bir `NavigationContainer` kullanılır.
7. Navigation state güncellemesi render gövdesinde yapılmaz.
8. Reusable component'lere `useNavigation` bağlamak yerine callback prop geçirmek genellikle daha temizdir.
9. Route params küçük ve serializable tutulmalıdır; production'da çoğunlukla ID gönderilir.
10. Nested navigator kullanırken her navigator'ın kendi history'si ve options'ı olduğunu unutma.
11. Header'lı screen'lerde safe area'yı gereksiz yere iki kez uygulama.
12. Yeni özellik eklerken önce bunun screen mi, tab mı, stack route'u mu, yoksa yalnızca component mi olduğuna karar ver.

## Kısa Özet

Bu projenin mimari fikri şudur:

```text
App = uygulamayı başlatır
RootNavigator = uygulama seviyesini yönetir
MainTabs = ana bölümleri yönetir
MealsStack = meals akışını yönetir
Screens = sayfa davranışını yönetir
Components = tekrar kullanılabilir UI'ı yönetir
Data/Models = uygulama verisinin şeklini yönetir
```

Bu ayrım sayesinde yeni özellik eklerken her şeyi `App.js` içine yığmak yerine, özelliğin sorumluluğuna uygun yere yerleştirebilirsin.

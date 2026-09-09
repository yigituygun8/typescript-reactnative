/**
 * TYPESCRIPT ADVANCED TYPES — DERS NOTLARI
 * Konular: typeof, keyof, Indexed Access Types, Mapped Types,
 *          Template Literal Types, Conditional Types, infer, Utility Types
 *
 * Bunu videoları izlemeden hızlıca göz atman için hazırladım.
 * Her bölümde: (1) kavramın tanımı, (2) neden işine yarar, (3) çalışan örnek var.
 * VS Code'da açıp hover yaparsan inferred type'ları görebilirsin, en iyi öğrenme yolu bu.
 */

// ============================================================
// 119-120-121. "typeof" OPERATÖRÜ (TYPE QUERY OLARAK)
// ============================================================
// JS'teki typeof (runtime'da "string", "number" döner) ile KARIŞTIRMA.
// TS'te typeof, bir DEĞİŞKENİN tipini, TİP SEVİYESİNDE çıkarıp
// başka bir yerde kullanmana yarar. Yani "bu değişken neyse, o tip"

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

// config'in tipini elle yazmak yerine typeof ile "çal"
type Config = typeof config;
// Config artık şuna eşit: { apiUrl: string; timeout: number; retries: number }

function logConfig(c: Config) {
  console.log(c.apiUrl);
}

// Daha kullanışlı örnek: bir fonksiyonun dönüş tipini yakalamak
function createUser(name: string, age: number) {
  return { id: crypto.randomUUID(), name, age, createdAt: new Date() };
}

// ReturnType + typeof kombinasyonu çok yaygın bir pattern
type User = ReturnType<typeof createUser>;
// User = { id: string; name: string; age: number; createdAt: Date }

// ============================================================
// 122-123. "keyof" — BİR TİPİN ANAHTARLARINI ÇIKARMAK
// ============================================================
// keyof, bir object type'ın tüm PROPERTY İSİMLERİNİ union (birleşim)
// tipi olarak döndürür. Runtime'da hiçbir karşılığı yok, tamamen
// derleme zamanı (compile-time) bir işlem.

interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductKey = keyof Product; // "id" | "name" | "price"

// Gerçek kullanım alanı: generic, tip-güvenli bir "getProp" fonksiyonu.
// K extends keyof T diyerek, sadece T'nin gerçekten sahip olduğu
// key'lerin geçmesine izin veriyoruz. Yanlış key yazarsan derleme hatası alırsın.
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: Product = { id: 1, name: "Klavye", price: 1200 };
const price = getProp(product, "price"); // number olarak inference edilir
// getProp(product, "weight"); // ❌ Hata: "weight" Product'ta yok

// ============================================================
// 124-125. INDEXED ACCESS TYPES — T[K]
// ============================================================
// T[K] sözdizimi, bir tipin İÇİNDEKİ bir property'nin tipine
// doğrudan erişmeni sağlar. Array'lerde de aynı mantık işler.

type ProductPrice = Product["price"]; // number
type ProductNameOrId = Product["name" | "id"]; // string | number

// Array'in eleman tipini çekmek çok kullanılan bir trick:
const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "editor" },
];

type ArrayElement = (typeof users)[number];
// ArrayElement = { id: number; role: string }
// [number] diyoruz çünkü array'e herhangi bir index (number) ile erişilir

// ============================================================
// 126-127. MAPPED TYPES — MEVCUT TİPTEN YENİ TİP ÜRETMEK
// ============================================================
// Mapped type, keyof ile döngüye benzer bir şey yapıp (in operatörü)
// var olan bir tipin her key'i için yeni bir tip üretir.
// [K in keyof T] JS'teki "for...in" gibi düşünülebilir ama tip seviyesinde.

type Optional<T> = {
  [K in keyof T]?: T[K]; // her property'i optional yap
};

type ReadonlyVersion<T> = {
  readonly [K in keyof T]: T[K]; // her property'i readonly yap
};

// "-?" ve "-readonly" ile modifier'ları KALDIRABİLİRSİN de
type RequiredVersion<T> = {
  [K in keyof T]-?: T[K]; // optional işaretini sil
};

type PartialProduct = Optional<Product>;
// { id?: number; name?: string; price?: number }

const draft: PartialProduct = { name: "Taslak Ürün" }; // diğerleri opsiyonel, sorun yok

// Not: TS'in built-in Partial<T> ve Readonly<T> tipleri de tam olarak
// bunları yapıyor, kendin yazmana gerek yok ama nasıl çalıştığını bilmek önemli.

// ============================================================
// 128. TEMPLATE LITERAL TYPES
// ============================================================
// JS'teki template string'lerin (`Merhaba ${isim}`) tip seviyesindeki
// karşılığı. String literal tiplerini birleştirip yeni string
// pattern'leri (kalıpları) tanımlamana yarar.

type Direction = "left" | "right" | "top" | "bottom";
type Margin = `margin-${Direction}`;
// Margin = "margin-left" | "margin-right" | "margin-top" | "margin-bottom"

function setMargin(prop: Margin, value: string) {
  document.body.style.setProperty(prop, value);
}

setMargin("margin-left", "10px"); // ✅
// setMargin("margin-diagonal", "10px"); // ❌ Hata: geçerli bir Margin değil

// Event isimleri türetmek gibi pratik bir kullanım:
type EventName = "click" | "hover" | "focus";
type HandlerName = `on${Capitalize<EventName>}`;
// HandlerName = "onClick" | "onHover" | "onFocus"
// Capitalize<> de built-in bir string manipulation utility'si

// ============================================================
// 129-130. CONDITIONAL TYPES — T extends U ? X : Y
// ============================================================
// Tip seviyesinde if/else gibi düşün. "T, U'ya uyar mı, uymaz mı"
// sorusuna göre iki farklı tip arasında seçim yapar.

type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>; // false

// Daha gerçekçi bir örnek: null/undefined'ı tipten temizlemek
type NonNullableCustom<T> = T extends null | undefined ? never : T;

type CleanType = NonNullableCustom<string | null | undefined>; // string

// Conditional type'lar UNION'lara uygulandığında otomatik olarak
// her üyeye tek tek dağılır (buna "distributive conditional type" denir)
type ToArray<T> = T extends unknown ? T[] : never;
type StrOrNumArray = ToArray<string | number>; // string[] | number[]

// ============================================================
// 131. "infer" KEYWORD — CONDITIONAL TYPE İÇİNDEN TİP ÇEKMEK
// ============================================================
// infer, bir conditional type'ın extends kısmında kullanılır ve
// TS'e "burada bir tip var, onu bir değişkene ata, sonra kullanayım" der.
// Genelde built-in utility type'ların (ReturnType, Parameters vb.) içi
// tam olarak böyle yazılmıştır.

// Basitleştirilmiş ReturnType implementasyonu, aslında lib.es5.d.ts'de böyle:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: "Yiğit" };
}

type FetchedUser = MyReturnType<typeof fetchUser>;
// FetchedUser = { id: number; name: string }

// Bir Promise'in içindeki tipi çekmek de çok yaygın bir infer örneği:
type MyAwaited<T> = T extends Promise<infer U> ? U : T;

type Resolved = MyAwaited<Promise<string>>; // string

// ============================================================
// 132. BUILT-IN UTILITY TYPES — TS'İN HAZIR SİLAHLARI
// ============================================================
// Yukarıda kendimiz mini versiyonlarını yazdık ama gerçek projede
// TS'in kendi utility type'larını kullanacaksın:

interface Task {
  id: number;
  title: string;
  done: boolean;
}

type PartialTask = Partial<Task>; // her şey optional
type RequiredTask = Required<PartialTask>; // her şey zorunlu
type ReadonlyTask = Readonly<Task>; // her şey readonly
type TaskPreview = Pick<Task, "id" | "title">; // sadece belirli key'ler
type TaskWithoutId = Omit<Task, "id">; // belirli key'ler hariç hepsi
type TaskRecord = Record<string, Task>; // { [key: string]: Task }

// Kısa özet tablosu (yorum olarak):
// Partial<T>    -> tüm property'leri optional yapar
// Required<T>   -> tüm property'leri zorunlu yapar
// Readonly<T>   -> tüm property'leri readonly yapar
// Pick<T, K>    -> sadece K'daki key'leri tutar
// Omit<T, K>    -> K'daki key'ler hariç hepsini tutar
// Record<K, V>  -> K tipindeki key'lerden V tipindeki değerlere map
// ReturnType<T> -> fonksiyonun dönüş tipini verir
// Parameters<T> -> fonksiyonun parametrelerini tuple olarak verir

/**
 * ÖZET — hangi konu ne zaman işine yarar:
 * - typeof     : elle yazmak yerine mevcut bir değerden tip türetmek
 * - keyof      : bir tipin key'lerini union olarak almak, generic fonksiyonlarda güvenlik
 * - T[K]       : bir tipin içindeki belirli bir alanın tipine erişmek
 * - Mapped     : bir tipi baz alıp hepsini optional/readonly/vs yapan yeni tip üretmek
 * - Template   : string literal'lardan yeni string pattern'leri türetmek
 * - Conditional: tip seviyesinde if/else, genelde generic library kodunda görürsün
 * - infer      : conditional type içinden bir alt-tipi "yakalamak"
 * - Utility    : yukarıdakilerin hazır, günlük kullanıma uygun versiyonları
 */
# Inyandiko isobanura code z’umushinga wa Marketly

Iyi nyandiko isobanura uko porogaramu iteye, uko ibice byayo bikorana, n’icyo code z’ingenzi zikora. Amagambo amwe ya programming asigaye mu Cyongereza kugira ngo ahure n’uko asanzwe yitwa muri React/JavaScript.

## 1. Uko porogaramu itangizwa

### `src/main.jsx`

- `StrictMode` ni uburyo bwa React bwo gufasha gutahura amakosa amwe igihe uri gukora development. Ishobora gutuma React igenzura component zimwe inshuro zirenze imwe muri development; ntibivuze ko user azabona ibirenze kuri screen.
- `createRoot(document.getElementById('root'))` ibona element ifite `id="root"` muri `index.html`, hanyuma React ikayikoresha nk’aho yubakira UI.
- `import './index.css'` yinjiza global styles: font, amabara rusange, reset ya CSS, n’accessibility focus styles.
- `<App />` ni component nyamukuru ifungura application.

Uru ni rwo ruhererekane: `index.html` → `src/main.jsx` → `src/App.jsx` → `Layout` na page iriho.

### `src/App.jsx`

- `useState("Dashboard")` ibika izina rya page iri kwerekanwa. Page ya mbere itangira ari `Dashboard`.
- `setPage` ni function ya React ihindura page iriho. Iyo ihindutse, React yongera gukora render kugira ngo yerekane page nshya.
- `pages` ni object ihuza izina rya page na component yayo: `Orders` → `<Orders />`, n’ibindi.
- `<Layout page={page} setPage={setPage}>` iha layout page iriho na function ikoreshwa mu kuyihindura. Page nyirizina ijya imbere ya `Layout` nk’icyo React yita `children`.
- `pages[page] || <Dashboard />` yerekana page ihuye n’izina; iyo izina ritabonetse, isubira kuri Dashboard.
- `import "./App.css"` izana styles za sidebar, header, page layout, cards, tables, forms, mobile layout n’ibindi.

**Icy’ingenzi:** iyi navigation ihindura page muri React state gusa. Ntabwo ari URL routing, bityo URL ya browser ntiyandikwa nka `/orders` kandi refresh isubira kuri Dashboard. Nubwo `react-router-dom` iri muri dependencies, `App.jsx` ubu ntayikoresha.

## 2. Layout n’uruhande rwo kugenderamo

### `src/components/layout.jsx`

Iyi component ni framework isangiwe na pages zose: sidebar, topbar, aherekanirwa page, na footer.

- `useState` ibika niba menu yo kuri telefoni ifunguye (`mobileMenuOpen`). Iyo ari `true`, sidebar iragaragara kandi scrim yijimye ishobora kuyifunga.
- `navigation` ni urutonde rw’amazina ya main pages n’ama-icons. `map()` iruzenguruka urwo rutonde igakora button imwe kuri buri page. `key={label}` ifasha React gukurikirana buri button.
- `icon: Icon` ni destructuring ihindura agaciro ka `icon` kakaba component ishobora kwandikwa nka `<Icon />`.
- `useEffect` yandikisha event listener yitwa `marketly:navigate`. Dashboard ishobora kohereza event ifite izina rya page; layout iyakira, igahamagara `setPage(event.detail)`. Cleanup ikuraho listener igihe layout ivuye kuri screen kugira ngo listener zitiyongera buri gihe.
- `navigate(nextPage)` ihindura page, ikanazimya mobile menu.
- `page === label` igenzura page iriho. Iyo ihuye, class `nav-link-active` na `aria-current="page"` byerekana active item.
- `badge` ni umubare muto ugaragazwa iruhande rwa Orders. Ni umubare wanditse muri code, si umubare ubazwe uvuye kuri orders nyazo.
- Search iri hejuru ni interface igaragara gusa muri iki gihe; nta logic yo kuyishakisha yashyizwemo.
- Bimwe muri buttons za profile, workspace, preferences bihindura page bijya kuri Settings cyangwa Analytics.
- `<main key={page}>` yongera gukora page content iyo page ihindutse.
- `<footer>` irimo footer links zijya kuri Help na Settings.
- `lucide-react` itanga icons nka `Search`, `Menu`, `Users`; ni React components z’amashusho (SVG).

## 3. Ibyo components zisangiwe zikora

### `src/components/ui.jsx`

- `PageHeading` ifata props (`eyebrow`, `title`, `description`, `actions`) igakora umutwe usanzwe wa page. `actions` ishobora kuba buttons zoherejwe na page.
- `{eyebrow && ...}` na `{description && ...}` ni conditional rendering: igice kigaragara gusa iyo prop ihari.
- `MetricCard` yerekana label, value, change n’icon. `tone` ihitamo ibara rikoreshwa muri CSS, `negative` igahitamo umwambi wo hasi. `icon: Icon` ituma icon ya lucide ishobora guhinduka bitewe na prop.
- `StatusPill` yerekana agapill ka status. Iyo `tone` itatanzwe, ikura tone mu nyandiko iri muri children, urugero `Processing` iba `processing`.
- `Panel` ni ikarita rusange ifite umutwe, ibisobanuro, action, n’ibiyirimo (`children`). `className` na `id` bituma page ishobora kuyongerera CSS cyangwa anchor id.

## 4. Pages

### `src/pages/dashboard.jsx` — Product Dashboard

Iyi ni dashboard igarura isura y’umwimerere yibanda ku bicuruzwa.

- `Product Dashboard` ni umutwe w’uru rupapuro.
- Input ya `Search products...` igaragara nka search field, ariko nta `useState` cyangwa filter iyihuza n’urutonde rw’ibicuruzwa. Ni UI gusa ubu.
- `<select>` itanga categories: All Categories, Electronics, Wearables, Accessories. Nayo ubu ntiyunganishijwe na product data.
- `Add Product` ni button igaragara, ariko ntifungura form cyangwa ngo yongere product muri iyi dashboard. Gucunga no kongeramo products bikorerwa kuri Products page.
- `DashboardCard` ni component ntoya yongeye gukoreshwa inshuro eshatu. Props zayo ni `title`, `number`, `bottom`, na `arrow`.
- Imibare `24`, `18`, `3` ni demo/static values zanditswe muri JSX, ntizibarwa mu rutonde rwa Products. `75%` na changes nazo ni amagambo y’icyitegererezo.
- Tailwind classes ziri muri JSX (urugero `grid grid-cols-3`, `bg-[#1b1b20]`) zisobanura grid, amabara, padding, n’imyitwarire ya cards.

### `src/pages/products.jsx` — Gucunga ibicuruzwa

- `startProducts` ni data y’icyitegererezo ibanza kwerekanwa. Buri product igira `id`, `name`, `category`, `price`, `stock`, `sold`, `mark`, `tone`, na rimwe na rimwe `image`.
- Amafoto ya `headphones.jpg`, `smartwatch.jpeg`, na `wallets.jpeg` yinjizwa muri module binyuze muri imports. Andi mafoto amwe ashobora gukoresha URL yo kuri internet.
- `useState(startProducts)` itangira state y’ibicuruzwa. Ibikorwa byo kongeraho cyangwa gusiba bikora kuri state; data ntabwo ibikwa kuri server cyangwa `localStorage`, bityo refresh isubiza data y’intangiriro.
- `search`, `category`, `dialogOpen`, `imageError`, na `form` ni states zitandukanye: search term, category yatoranyijwe, modal, ubutumwa bw’ikosa, n’agaciro kari muri form.
- `categories` ikura categories zitandukanye muri products ikongeraho `All categories`.
- `useMemo` ibara `filteredProducts` bundi bushya gusa iyo products, search, cyangwa category bihindutse. Igenzura izina/category n’uko category ihuye.
- `chooseImage(event)` ifata file user yahisemo. Igenzura ko ari image kandi itarengeje 5 MB. `FileReader` iyisoma ikayihindura Data URL, hanyuma preview ikagaragara.
- `addProduct(event)` ihagarika page refresh ya form, ikongeramo product nshya kuri list, ikabika image muri state, hanyuma igafunga/modal igahanagura form.
- `clearForm()` isubiza fields ku ntangiriro kandi igafunga modal.
- `removeProduct(id)` ikuramo product ifite iyo id muri array.
- `inventoryValue` ibara igiteranyo cya `price × stock` kuri buri product.
- Catalog cards zikorwa na `filteredProducts.map(...)`. Iyo `product.image` ihari, `<img>` irerekanwa; bitaba ibyo herekanwa initials (`mark`).
- Inventory bar igaragaza stock ugereranyije, ariko ni visual approximation: `stock × 2%` ifite ceiling ya 100%.
- `StatusPill` ihindura status bitewe n’uko stock ari zero, munsi ya 10, cyangwa ihagije.
- CSV/image additions no gukuraho products biri muri React state gusa; nta backend persistence irimo.

### `src/pages/orders.jsx` — Orders

- `initialOrders` ni orders za demo zigaragazwa mu mbonerahamwe.
- `activeTab`, `search`, `orders`, `showNewOrder`, `customer`, `amount` zibika filter, input, urutonde, modal, n’amakuru ya form.
- `useMemo` ihitamo orders zihuye na tab na search term (id, izina, email cyangwa product).
- `exportOrders()` yubaka CSV, ikayihindura Blob, ikarema download link, igatangiza download yitwa `marketly-orders.csv`.
- `addOrder()` yongeramo order nshya kuri React state iyo izina n’amafaranga byemewe. Order nshya itangira kuri status ya `Processing`.
- `tabs.map()` ikora buttons zo guhitamo status. `aria-selected` ivuga tab ikora ku bikoresho bifasha gusoma page.
- Empty-state igaragara iyo nta order ihuye na filter.
- Imibare ya cards zo hejuru ni values za demo, ntabwo zivugururwa hamwe na orders nshya.

### `src/pages/customers.jsx` — Customers

- `initialCustomers` ni urutonde rwa demo rufite email, orders, amafaranga yakoresheje, itariki yinjiye n’urwego rwa loyalty.
- `useMemo` ishakisha izina cyangwa email.
- `addCustomer()` yongeramo customer mushya muri state; `exportList()` ikuramo urutonde rugaragara ikarubika nka CSV.
- Imbonerahamwe ikoresha initials z’izina mu avatar, amafaranga format akoresheje `toLocaleString`, na `StatusPill` kuri loyalty tier.
- Customer count/value cards ni demo values; ntibihuzwa n’urutonde rw’icyitegererezo.

### `src/pages/analytics.jsx` — Analytics

- `monthlySales` na `categories` ni imibare yo kwerekana charts; ni static demonstration data.
- `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`, `Cell`, `Tooltip`, `ResponsiveContainer` biva muri Recharts. Byubaka bar chart ihinduka bitewe n’ubugari bw’aho iri.
- `Cell` ihindura ibara rya bar ya May itandukanye n’andi mezi.
- Category progress bars zifata uruhare rw’amount kuri total ya `$48,294` zikabihindura percentages.
- Acquisition bars na insight cards ni static examples, ntabwo zibarwa ziturutse ku database.
- `lucide-react` icons zikoreshwa mu metrics n’insights.

### `src/pages/settings.jsx` — Settings

- `profile` ibika fields z’izina, email, store n’itelefone muri state.
- `onChange` ya input ivugurura field imwe igasiga izindi uko zari zimeze (`...profile`).
- `updateProfile()` ihagarika submit isanzwe, igashyira `saved` kuri true, nyuma y’igihe igasubira false. Nta server cyangwa storage yandikwamo, bityo ni confirmation y’icyitegererezo gusa.
- `preferences` ni urutonde rwa notification toggles. `togglePreference(id)` ihindura `enabled` kuri item ifite iyo id, isigaye ikagumana agaciro.
- Buttons za password, two-factor, change photo n’ibindi ni interface gusa muri iki gihe.

### `src/pages/help.jsx` — Help center

- `topics` ni urutonde rwa help topics hamwe na icon, title, ibisobanuro, category na guides count.
- `search` ibika ijambo ryanditswe muri help search.
- `useMemo` iyungurura topics hakurikijwe title, text na category.
- `topics.map()` ikora card ya buri topic. Popular search buttons zishyira ijambo ryatoranyijwe muri search input.
- Contact support ifungura email app binyuze kuri `mailto:`. Email iri muri code ni sample, igomba guhindurwa ikaba email nyayo y’ubucuruzi mbere yo gushyira app kuri production.

## 5. Imiterere n’amabara

### `src/index.css`

- Import ya Google Fonts izana DM Sans na Manrope. Iyo internet idahari, system fonts ziba fallback.
- `@import "tailwindcss"` itangiza Tailwind utilities.
- `:root` ishyiraho fonts, amabara rusange, n’CSS variables nka `--color-gold`.
- `* { box-sizing: border-box }` ituma padding na border bibarwa mu bugari/uburebure bwa element.
- `html`, `body`, `#root` bigena minimum sizes, background, text color n’uko React root ifata umwanya.
- Focus outline igaragara ku buttons, links, inputs na selects kugira ngo keyboard users babone aho bari.
- `prefers-reduced-motion` igabanya transitions kuri users bahisemo kugabanya animation.

### `src/App.css`

Iyi ni stylesheet nini y’interface yose. Amatsinda y’ingenzi:

- Sidebar: `.sidebar`, `.nav-link`, `.workspace-switcher`, `.profile-row`.
- Main page/header/footer: `.main-shell`, `.topbar`, `.page-content`, `.app-footer`.
- Buttons, page headings, metric cards na panels.
- Tables, search fields, pills za status na pagination.
- Product catalog cards, thumbnails, image upload modal.
- Analytics, settings na help sections.
- `@media` rules: zigabanya sidebar/main layout kuri tablet, zigahindura sidebar ikaba mobile drawer, zigashyira grids mu columns nke kuri telefoni.

CSS class ziri mu JSX nka `panel`, `sidebar`, `catalog-card` zishyirwa kuri element kugira ngo `App.css` izihe style. Tailwind classes zo muri Dashboard zikorwa na Tailwind plugin.

## 6. Uko bishyirwa hamwe n’ibikoresho

### `package.json`

- `npm run dev` itangiza Vite development server.
- `npm run build` ikora production bundle mu `dist/`.
- `npm run lint` ikoresha Oxlint kugenzura code.
- React/React DOM ni UI framework/runtime.
- Vite na React plugin ni dev server/build tools.
- Tailwind Vite plugin itanga Tailwind CSS.
- `lucide-react` itanga icons.
- `recharts` itanga charts.
- `react-router-dom` iri installed ariko navigation iriho ubu ntirabikoresha.

### `vite.config.js`

Iboneza Vite plugins: React plugin isoma JSX, Tailwind plugin ikubaka utility CSS.

## 7. Ingingo z’ingenzi mbere yo gukoresha nka production

1. Data nyinshi ni mock/static data; ntabwo iva muri API cyangwa database.
2. Product, order, customer n’ama-settings byahinduwe muri page state birasibangana kuri refresh.
3. Dashboard product search, category select na Add Product ni controls zigaragara gusa; gucunga nyakuri products bikorwa muri Products page.
4. Amwe mu mafoto akoresha remote URLs; kugira ngo yizewe offline, yinjize mu `src/images` ukoreshe import nk’amafoto y’imbere.
5. Shyiraho backend/API, authentication n’authorization mbere yo kubika amakuru y’abakiriya cyangwa orders nyazo.
6. Hindura email ya support n’amazina/imibare y’icyitegererezo ibe iy’ubucuruzi bwawe.

## 8. Uko wakurikirana flow ya React

Urugero rwo gufungura Products page:

1. User akanda `Products` muri `layout.jsx`.
2. `navigate("Products")` ihamagara `setPage("Products")`.
3. `App.jsx` ibona `page` yahindutse, igahitamo `<Products />` muri `pages` object.
4. `<Products />` iba `children` ya `Layout`.
5. Layout ikomeza kugaragaza sidebar/header, ariko `main` ikerekana page nshya.

Urugero rwo kongeramo product:

1. User akanda Add product, `dialogOpen` ihinduka `true` modal ikagaragara.
2. Inputs na image picker bihindura `form` state.
3. `FileReader` isoma image ikayishyira muri `form.image` nka Data URL.
4. Form submit ihamagara `addProduct()`.
5. `setProducts()` yongeramo record nshya kuri products array.
6. React yongera render; product nshya igaragara muri catalog.
7. Ibyo biri muri memory ya browser gusa kugeza hiyongereye persistence.

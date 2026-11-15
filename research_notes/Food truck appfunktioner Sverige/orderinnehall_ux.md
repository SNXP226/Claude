# Order content and "whose order is whose": UX for small food service (KDS, order-ready boards, fast phone entry)

Method note: WebFetch could not reach any site from this session (squareup.com, doc.toasttab.com and xenial.com failed DNS resolution, so the network allowlist is blocking them). All findings below come from search-result snippets of vendor help centers and articles. They were not read in full, so check exact menu paths and settings against the live pages. Most evidence on speed and accuracy is vendor-sourced. I found no peer-reviewed HCI study on restaurant order-entry speed.

## 1. How KDS systems display items, modifiers, notes, timers, colors and bump actions

### Takeaway
The major KDS products agree on a common pattern. Each ticket is a card headed by the order number or name, with items and modifiers listed below. Modifiers get a distinct color (red by default in Toast, configurable per modifier in Square). An age timer turns the card yellow, then red, at thresholds the operator sets. "Bump" (complete) works per item or per ticket, with a short undo window and a "recall" of recently completed tickets. There is also an "All Day" count of each item across open tickets. A small app can copy this pattern in simplified form.

### Cited Findings
- Square KDS: under Settings > Timers & Alerts the operator sets how many minutes pass before a ticket's timer turns yellow and then red. — [Square Help: Get started with Square KDS Android](https://squareup.com/help/us/en/article/7944-get-started-with-square-kds-android)
- Square KDS: each modifier option can be given a color in the Dashboard (Brown, Burgundy, Forest, Pink, Purple, Sky, Taupe, Teal). The color shows on both Prep and Expo devices, which makes modifiers stand out visually. — [Square Help 7944](https://squareup.com/help/article/7944)
- Square KDS: staff tap an item to mark it complete, at prep or expo level. There is only a 3-second undo window, and after that a completed item must be recalled. Completing on an Expo device completes the item on all devices. — [Square Help: Complete orders with Square KDS](https://squareup.com/help/us/en/article/8171-complete-orders-with-square-kds)
- Square KDS supports "All Day" counts, the total of each item across all open tickets, shown on Prep and Expo devices. Users had asked for this in the community forum. — [Square Seller Community: All Day Counts](https://www.sellercommunity.com/t5/Product-Updates/New-KDS-Basic-Expeditor-Station-and-Launchpad-amp-All-Day-Counts/ba-p/272563); [Community request](https://community.squareup.com/t5/Questions-How-To/KDS-Recommendations-With-A-Total-Item-Count-All-Day-View/td-p/242018)
- Square: tickets carry the items, customizations and special instructions, plus the customer's name or ticket number. Sellers often enter a first name at the counter as the ticket name. — [Square Community: KDS and kitchen printer](https://community.squareup.com/t5/Square-for-Restaurants/Help-me-understand-using-the-KDS-and-kitchen-printer-please/td-p/689791)
- Toast KDS: "warning colors" change a ticket's color as it ages unfulfilled. The timer runs until the ticket is fully fulfilled, and on expo the ticket turns green once all its items are done. Ticket borders can also be colored by dining type (takeout, dine-in and so on). — [Toast: Interpreting ticket times](https://doc.toasttab.com/doc/platformguide/adminInterpretingTicketTimes.html); [Toast: KDS config quick reference](https://doc.toasttab.com/doc/platformguide/adminKdsConfigQuickRef.html)
- Toast: modifiers show in red text by default when no background color is set. — [Toast: Customize the Appearance of KDS Tickets](https://support.toasttab.com/en/article/Customize-the-Appearance-of-KDS-Tickets)
- Toast: "Recall" reopens the most recently fulfilled ticket and labels it "RECALLED" in red. Tapping again goes further back, but only within the "Recently Fulfilled Timeframe". — [Toast: Redisplaying tickets with recall and unfulfill](https://doc.toasttab.com/doc/platformguide/adminRedisplayingTickets.html)
- Toast supports physical bump bars, and items sent to several stations can be fulfilled independently. — [Toast: Using bump bars](https://doc.toasttab.com/doc/platformguide/platformKitchenUsingBumpBars.html); [Toast: Independent prep station fulfillment](https://support.toasttab.com/en/article/Independent-Prep-Station-Fulfillment?lang=en_US)
- Oracle Simphony KDS: "highlight schemes" assign colors by menu item class, production item, order type and order device. Item status colors control how items look on expo when their status changes. — [Oracle Simphony KDS Highlight Schemes](https://docs.oracle.com/en/industries/food-beverage/simphony/kdscu/c_kds_highlight_schemes.htm)
- GoTab KDS has a "Bump Fully Prepped Items on Expo" option, which moves a fully prepped ticket to the top of the expo screen regardless of when it was ordered. — [GoTab: KDS settings](https://success.gotab.io/knowledge/kds-settings); [GoTab: KDS ticket timer](https://success.gotab.io/knowledge/kds-ticket-timer)
- Fresh KDS is used by over 3,500 locations according to the vendor. I found no Fresh-specific documentation on its display layout. — [Arryved: FreshKDS](https://arryved.com/solutions/freshkds-kitchen-display/); [Fresh KDS API docs](https://fresh-technology.github.io/fresh.kds.docs.mobile-local-network-integration/docs/api/api_kds_orders)
- Praise and criticism (vendor-framed): paper tickets have little room for modifiers, so orders become hard to read, handwriting gets illegible during rushes, and tickets get lost. These are the main arguments vendors make for a KDS. — [Lightspeed blog: reasons for a KDS](https://www.lightspeedhq.com/blog/three-reasons-youre-missing-without-kitchen-display-system/)

### Inferences
- Minimum viable "order card" for the app: a large order number (plus an optional name or description), then item rows with quantities, then modifiers in a contrasting color or style, indented under their item. Free-text notes and allergies go last, highlighted (for example red, or with a warning icon). An elapsed-time badge goes in the corner.
- Use two configurable thresholds (for example yellow at 5 min, red at 10 min) rather than a fixed rule, matching Square and Toast.
- Bump should be one large tap per order, with an undo toast of about 3–5 seconds (Square uses 3 s, which may be too short for messy hands) and a "Recently collected" list for recall.
- An "All Day" summary ("6× burger, 4× fries in queue") is cheap to compute and lets the cook batch work.
- Allergies should look different from ordinary modifiers. This is my own recommendation: vendors color modifiers, but I found no source that treats allergies specifically.

### Gaps
- I could not confirm Lightspeed KDS or Fresh KDS display specifics (modifier colors, timers). Searches returned no documentation.
- I found no aggregated user reviews (G2, Capterra, app stores) with concrete praise or criticism of specific KDS products. The Capterra category pages had no reviews.

## 2. Fast input methods: preset buttons, modifiers, notes, voice, name/description fields

### Takeaway
Industry practice and vendor claims favor preset item buttons with tap-to-increment quantity, default or common modifiers as one-tap chips, and free text only as an optional fallback. I found no independent study measuring input speed or error rates. Voice input is risky in noisy kitchens because a missed "no onion" matters far more than word error rate suggests.

### Cited Findings
- One POS optimization vendor claims tap counts fell from 12–15 to 5–7 per order and entry time from 90 s to 45 s, with up to 30% faster transactions and 40% fewer errors. No study is cited, so treat these as marketing figures. — [YCR: Optimize Hospitality POS](https://www.ycr.co.uk/optimize-hospitality-pos-cut-transaction-times-boost-satisfaction/)
- Practitioner benchmark: entering a full combo with modifiers should take 20–30 seconds at most. — [IW: QSR POS speed](https://weareiw.com/resources/blog/qsr-pos-speed)
- A pizzeria POS comparison says regular orders can be rung up in 2 taps with presets, and claims error rates jumped 34% when transactions took longer than 30 s. The method is not published. — [Pizzeria POS speed comparison](https://pizzeriapointsale.com/blog/pizzeria-pos-speed-comparison.html)
- Default modifiers reduce taps. — [Clotouch: POS features to speed up orders](https://clotouch.com/blog/how-to-use-restaurant-pos-features-speed-up-orders-payments-bbb/)
- General data-entry research (Barchard et al. 2020, via a secondary source): single-pass manual data entry has errors on 0.55%–3.6% of entries. This is not specific to POS. — [OrderSync: manual order entry statistics](https://ordersync.io/blog/manual-order-entry-statistics)
- Voice: word error rate (WER) misleads for orders, because a model can score well and still get the combo wrong. Errors on key words like "no onions" matter most. — [Deepgram: The trouble with WER](https://blog.deepgram.com/the-trouble-with-wer/)
- Voice: kitchen noise (fans plus music) differs from call-center babble, and models tuned for one do not necessarily work in the other. — [Picovoice: noise-robust voice AI](https://picovoice.ai/blog/noise-robust-voice-ai/)
- A voice-AI vendor reports 99.3% order accuracy in its own tests (an order-level metric, self-reported), and cites kitchen noise of about 65 dB. — [Kea: voice AI accuracy testing for restaurants](https://kea.ai/resources/best-voice-ai-accuracy-testing-restaurants-2026)
- Square sellers use the ticket name field for a first name collected at the counter. — [Square Community thread](https://community.squareup.com/t5/Square-for-Restaurants/Help-me-understand-using-the-KDS-and-kitchen-printer-please/td-p/689791)
- Pager vendors recommend writing the pager number into the POS "notes" or "pager" field. — [LRS: Food truck order accuracy](https://www.lrsus.com/blogs/food-truck-order-accuracy/)

### Inferences (design guidance for the app)
- Primary input is a grid of menu-item buttons, limited to the 6–12 items a food truck actually sells. Tap adds 1, a second tap makes it 2. Show a small "−" or long-press to decrement. This is the fastest path, and every common order should be possible with buttons only.
- Modifiers are chips shown under the selected item, for example "utan lök", "extra sås", "glutenfri", "laktosfri", "stark". Let the owner define them per item. Keep allergies as a separate red chip group so they cannot be confused with preferences.
- Free text is an optional "note" field. Never require it. On a phone it is the slowest and most error-prone input, especially with wet or greasy fingers.
- Name or description field: one optional short text field ("Namn / kännetecken", for example "Anna" or "röd jacka"). Offer quick chips for common descriptors to avoid typing. Keep "new order → number" as a 1-tap path, so content can be added after the number is issued, while the customer pays or after they step aside.
- Voice input: offer at most the browser's built-in dictation on the notes field (the phone keyboard's mic). Do not build voice parsing of orders, because accuracy is unproven in food-truck noise and errors on modifiers are costly.
- Repeat or duplicate the last order, and keep a short "favorites/combos" row. Both are low-cost speedups (my inference, consistent with vendor advice on presets).

### Gaps
- There is no independent, peer-reviewed evidence comparing presets, free text and voice for order entry speed or error rates. The available figures are vendor marketing.
- I found no evidence on how often staff actually use a "customer description" field in practice.

## 3. Order identification methods: numbers vs names vs pagers vs description

### Takeaway
Order numbers dominate in QSR, and order-ready screens fall back to the number when no name is attached. Names are personal and help when called out (Starbucks), but they get misheard and misspelled and raise privacy concerns, and some cultures avoid saying names in public (Starbucks Japan). Pagers or SMS remove the need to call out or watch a screen. The most robust low-tech pattern is a number as the primary key, plus an optional name or description for staff, plus a check of the items at handover.

### Cited Findings
- Starbucks brought back handwritten names (and notes) on cups in 2025. Names are called out when drinks are ready so the right person gets the right drink. — [Fortune, Jan 2025](https://fortune.com/2025/01/28/starbucks-free-refills-hand-written-names-on-cups/); [NRN: baristas writing more than names](https://www.nrn.com/top-500-restaurants/starbucks-baristas-are-writing-more-than-just-names-on-cups-and-not-everyone-is-happy-about-it)
- Starbucks (Sept 2025) says customers can use any name they wish, and that it blocks some explicit words in its POS. Free-text names are a moderation risk if shown publicly. — [Starbucks: An update from Starbucks](https://about.starbucks.com/press/2025/an-update-from-starbucks/); [KIRO7](https://www.kiro7.com/news/local/starbucks-says-customers-may-use-any-name-including-charlie-kirk/WQ2JBRYWVJHOJCRQUSR37KO6BE)
- In Japan most people would not want to reveal their name in public, so Starbucks Japan calls customers by their order instead. — [Nippon.com: Coffee and Identity at Starbucks Japan](https://www.nippon.com/en/column/g00292/coffee-and-identity-at-starbucks-japan-a-matter-of-culture.html)
- Xenial (Genius POS) Order Ready display can show customer names or order numbers. If no name is attached, the order number is shown. — [Xenial: Order ready display](https://www.xenial.com/product-documentation/en/genius-point-of-sale/enterprise-pos/data-management/kitchen-settings/order-ready-display.html)
- McDonald's: order numbers on receipts are shown on an overhead screen when ready, to de-clutter the counter. — [QSR Web: McDonald's new ordering setup](https://www.qsrweb.com/news/mcdonalds-new-ordering-setup-aims-to-de-clutter-dine-in-lines/); a Square forum user describes a McDonald's-style "preparing → ready" number board — [Square Community feature request](https://community.squareup.com/t5/Feature-Requests/Customer-order-screen-like-McDonald-and-other-fast-food-outlets/idi-p/708091)
- Pager vendor: shouting names or numbers leads to misheard orders, cold food and constant "is it ready?" questions. A number on a screen still requires guests to watch the truck, and a pager ties the notification to a device number. — [LRS: Food truck paging vs calling](https://www.lrsus.com/blogs/food-truck-paging-vs-calling/) (vendor, biased)
- SMS "order ready" texts avoid yelling names and chasing customers who wandered off. — [LRS food trucks](https://www.lrsus.com/industries/food-trucks/); [TablesReady QSR](https://tablesready.com/quick-service-restaurants)

### Inferences
- Use the number as the unique key. Names collide (two "Erik"s) and get misheard, while numbers are unambiguous and fit both screen and voice.
- Use name or description as a staff-side aid. "Erik, blå mössa" helps staff spot the customer in a crowd and is useful when calling out.
- At handover, staff read back the contents ("Nummer 23, två burgare, en utan lök?"). The customer confirms the content, not just the number. The order content feature makes this possible. This is my inference; I found no study on read-back error reduction at handover.
- If the app ever adds SMS or pager support, store the pager or phone reference in the same order record.

### Gaps
- There are no independent studies comparing the accuracy or speed of names, numbers and pagers. Evidence is anecdotal or from vendors.

## 4. Public customer display vs staff-only screen: what to show

### Takeaway
Public order-ready boards typically show only numbers (or names when attached) in "Preparing" and "Ready" columns, never order contents. Contents belong on the staff screen. Under GDPR data minimization, showing names publicly needs care: default to numbers, and if names are used publicly, show only first name or initial.

### Cited Findings
- Epson TrueOrder customer-facing display has "Preparing" and "Ready" columns. The order number sits in Preparing and moves to Ready when bumped from prep stations. — [Epson TrueOrder CFD manual (PDF)](https://files.support.epson.com/pdf/pos/kds/111-56-qum-001_r3.36_trueorder_kds_customer_facing_display-quick_user_manual.pdf)
- Abacus "Order Status Screen" has "Preparing..." and "Ready!". The order number appears under Ready! when ticked off on the KDS. — [Abacus help](https://help.abacus.co/en/articles/9414114-customise-your-order-status-screen-via-kds)
- QSR Automations: order-ready boards should feed directly from the KDS so they update the moment food is marked ready. A vendor-reported Mellow Mushroom pilot with text updates cut perceived wait by 32% and walkaways by 22%. — [QSR Automations: Order-Ready Screens in 2025](https://qsrautomations.com/?p=15957)
- Toast community users discuss how names appear on the Order Ready Display, especially for third-party delivery orders. — [Toast community: order ready display](https://community.toasttab.com/t5/guest-experience/order-ready-display/m-p/5232)
- Patchey KDS fetches the customer name on demand for the kitchen display and does not store it, a data-minimization approach. — [Patchey KDS privacy](https://patchey-kds.onrender.com/privacy)
- Other display tools replace missing or hidden first names with neutral placeholders ("Someone"). — [Proof docs](https://plogins.pages.dev/proof/docs/usage/); [Orders Proofy](https://leexar.freshdesk.com/support/solutions/articles/44001048821-how-to-hide-a-customer-s-name-on-orders-proofy-notification-)

### Inferences
- Public screen: number only (default), in "Tillagas" and "Klar att hämta" columns, with the newest ready numbers large, plus a sound or animation when a number moves to ready. A setting can optionally show first name or initial ("23 – A.").
- Never show order contents or customer descriptions ("röd jacka") publicly. Descriptions can embarrass customers and are personal data in context. My inference, based on GDPR Art. 5(1)(c) data minimization; I found no regulator guidance specific to restaurant order screens.
- Auto-delete names and descriptions at end of day, or after the order is collected plus a recall window. Keep only anonymous item counts for statistics.
- Since Starbucks has to filter explicit names, filter or let staff hide names on a public screen.

### Gaps
- There is no Swedish IMY or EDPB guidance specifically on showing customer names on order-ready screens. I could not verify any via search.
- I found no official McDonald's or Max documentation on their boards. McDonald's evidence is a short trade news item and a forum post.

## 5. Useful related features

### Takeaway
High-value, low-cost additions are a sold-out ("86") toggle, recall of collected orders, an "All Day" item count, prep timers with average wait time, and daily summary stats. Showing estimated wait to customers reduces perceived wait according to vendor data.

### Cited Findings
- Square lets staff mark items as "sold out" from the POS, with an optional time when the item automatically becomes available again. Square's POS does not block selling sold-out items. — [Square: Mark items and modifiers as sold out](https://app.squareup.com/help/au/en/article/8430-mark-items-and-modifiers-as-sold-out); [Square Seller Community announcement](https://www.sellercommunity.com/t5/Product-Updates/Mark-an-Item-as-Sold-Out-with-Square-and-86-Items-with-Square/ba-p/299271)
- Toast: staff can "86" items mid-rush in Quick Edit on the device, and the item stays out until manually restocked. — [Toast: 86 an item](https://support.toasttab.com/en/article/86-an-Item)
- A KDS (via GRUBBRR on Clover) can mark items sold out with a long press. — [GRUBBRR help](https://grubbrrhelp.zendesk.com/hc/en-us/articles/19512705523611-Clover-SMB-86-ing-Items-with-your-GRUBBRR-KDS)
- SambaPOS users ask for a single-action availability toggle that does not touch inventory counts. — [SambaPOS forum](https://forum.sambapos.com/t/item-86-not-available-on-pos/32106)
- Recall within a set timeframe (Toast) and recall after the 3 s undo window (Square) are standard. — [Toast recall](https://doc.toasttab.com/doc/platformguide/adminRedisplayingTickets.html); [Square complete orders](https://squareup.com/help/us/en/article/8171-complete-orders-with-square-kds)
- ConnectSmart surfaces historical ticket-time data to find bottlenecks. Vendors argue that showing order status reduces perceived wait. — [QSR Automations](https://qsrautomations.com/?p=15957)
- Perceived wait matters more than actual wait for guest satisfaction, and uninformed waits feel longer. This is a general claim from a glossary, without a cited study. — [hi.auto: wait time communication](https://hi.auto/resources/glossary/wait-time-communication/)
- Pager vendor suggests setting order limits at peak hours to avoid chaos at the window. — [LRS](https://www.lrsus.com/blogs/food-truck-order-accuracy/)

### Inferences
- Priority for a small app, by value per effort:
  1. Sold-out toggle on menu buttons (greyed out with a "Slut" badge), reset at end of day.
  2. Recall of collected orders ("Senast hämtade", last 10–20).
  3. Elapsed timer per order with yellow and red thresholds.
  4. "All Day" item totals for the open queue.
  5. Daily summary: number of orders, items sold per menu item, average and max wait (order created → ready, ready → collected), busiest hour.
  6. Estimated wait on the public screen, computed as a rolling average of recent prep times. Show it as a range ("ca 8–10 min"), not an exact promise.
- Per-item ready status only pays off with several cooks or stations. For a 1–2 person truck, order-level bump is enough. Make it optional.

### Gaps
- There are no independent studies on showing estimated wait on public QSR boards. The evidence is vendor case studies.

## 6. Accessibility and usability: touch targets, messy hands, sunlight, alerts

### Takeaway
Standard minimums are 44pt (Apple), 48dp (~9 mm, Material) and WCAG 2.2 AA 24px, with AAA at 44px. There is no authoritative figure for gloves or wet hands, but sources say to go larger. For sunlight, very high contrast (7:1 or more) matters more than dark mode. Dark mode can be worse in bright light.

### Cited Findings
- Material Design minimum touch target is 48×48dp, about 9 mm physical. — [Google Android Accessibility Help: Touch target size](https://support.google.com/accessibility/android/answer/7101858?hl=en)
- WCAG 2.2 SC 2.5.8 (AA) requires at least 24×24 CSS px, and the AAA enhanced level is 44×44. Larger targets reduce unintentional activation. — [web.dev: Accessible tap targets](https://web.dev/accessible-tap-targets/); [W3C proposed SC Target Size](https://www.w3.org/WAI/GL/mobile-a11y-tf/wiki/Proposed_SC_Target_Size)
- Glove wearers and people tapping on the move benefit from larger targets, though no size is given. — [Siteimprove: motor impairments and touch targets](https://www.siteimprove.com/blog/motor-impairments-and-mobile-ui-the-touch-target-problem)
- The hit area can be enlarged with padding without enlarging the visual element. — [Deque: touch target size](https://dequeuniversity.com/rules/attest-android/1.0/touch-target-size)
- Sunlight washes out light grey text, subtle color differences, low-opacity overlays and pastels. Guides suggest 7:1 contrast for primary content outdoors and warn that dark mode can be harder to read in bright light. These are practitioner sources of moderate quality. — [Glance: light vs dark](https://thisisglance.com/blog/light-vs-dark-designing-apps-that-look-great-in-any-mode); [Mobile app color design guide](https://color-site.pages.dev/guides/mobile-app-color-design); [Accessibility Checker: dark mode](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- Capacitive multi-touch is the minimum for responsive kitchen interfaces with modifier taps (vendor claim). — [Programming Insider: Kitchen printer vs KDS](https://programminginsider.com/kitchen-printer-vs-kds-which-setup-reduces-ticket-times-best-for-your-oracle-micros-restaurant/)
- Square KDS has a "Timers & Alerts" settings area, so audible or visual alerts are a standard KDS setting. — [Square Help 7944](https://squareup.com/help/us/en/article/7944-get-started-with-square-kds-android)

### Inferences (concrete specs)
- Menu buttons should be at least 64–72 px tall (well above 48dp), with at least 8 px gaps, a 2–3 column grid on phone, and a minimum label of 18 px bold. The primary actions ("Ny order", "Klar", "Hämtad") should be full-width bottom buttons about 72 px tall, within thumb reach.
- Avoid swipe-only and long-press-only actions for critical steps. Greasy fingers make gestures unreliable, so use tap plus undo instead. Destructive actions (delete order) get confirmation or undo.
- Offer a high-contrast light theme for outdoor use, plus dark for evening. Do not rely on color alone for timers: add text ("12 min") or an icon.
- On new orders (for example from a second device or online), play a sound plus vibration via `navigator.vibrate` where supported, and give "Klar" a distinct sound on the public screen. Keep the screen awake with the Screen Wake Lock API. These are implementation inferences; browser support should be verified, since iOS Safari does not support vibrate.

### Gaps
- There is no authoritative touch-target size for gloves or wet hands. User testing is needed.
- There is no peer-reviewed sunlight-readability threshold for phone apps. The sources are practice guides.

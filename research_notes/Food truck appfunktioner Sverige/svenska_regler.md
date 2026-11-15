# Svenska (och EU-) regler som påverkar ReadyBoard – food trucks/takeaway-diskar

> Not legal advice. Status as of Nov 2026. IMPORTANT METHOD CAVEAT: in this research session, direct page fetches were blocked for skatteverket.se, lagen.nu, kassaguiden.se and dagensps.se (network restriction), so findings come from search-engine result snippets (many pointing to official pages) rather than full-page reads. Several points are sourced from vendor/consultancy blogs; these are flagged. Points marked "[primary law, not fetched]" rely on the researcher's knowledge of the legal text and should be verified before use.

## 1. Kassaregisterlagen (Skatteverket) – does the truck need a certified register, and does ReadyBoard become one?

### Takeaway
A food truck selling for cash/card above four prisbasbelopp per year (236 800 kr in 2026) must use a manufacturer-declared (tillverkardeklarerat) kassaregister connected to a certified kontrollenhet/kontrollsystem, and must offer receipts. ReadyBoard is safest if it is positioned and built as an order-number/queue tool that sits *next to* the truck's certified register and never takes payment for on-site sales, never prints/issues receipts, and does not present itself as the place where sales are "registered". Taking payment on-site (e.g. a self-order screen with payment) is the line that would expose customers to kassaregister non-compliance. Rules tightened: transition under SKVFS 2021:17 ends 31 Dec 2026; from 1 Jan 2027 the new technical requirements (incl. XML journal export) apply to all registers.

### Cited Findings
- Legal basis: skatteförfarandelagen (SFL) ch. 39 and skatteförfarandeförordningen; anyone selling goods/services in business for cash or card payment must use a kassaregister; technical requirements in Skatteverket's föreskrifter (SKVFS 2014:9, later amended) — [Skatteverket FAQ kassaregister (search snippet)](https://www.skatteverket.se/foretag/etjansterochblanketter/svarpavanligafragor/kassaregister); [SKVFS 2014:9 PDF](https://www.skatteverket.se/download/18.3aa8c78a1466c5845874ba/1708608280801/SKVFS2014-09.pdf)
- The register must be tillverkardeklarerat and connected to a kontrollenhet or kontrollsystem; it must be notified (anmälas) to Skatteverket before use — [Skatteverket: Så här anmäler du kassaregister](https://skatteverket.se/foretag/drivaforetag/kassaregister/saharanmalerdukassaregister); [Skatteverket list of tillverkardeklarerade kassaregister (PDF)](https://www.skatteverket.se/download/18.4f45da1418092e4b1927f/1774016947175/tillverkardeklarerade-kassaregister.pdf)
- Threshold exemption: selling for cash/card for at most four prisbasbelopp incl. VAT per 12-month fiscal year means no kassaregister needed; 236 800 kr for 2026 — [Skatteverket: Undantag från krav på kassaregister](https://skatteverket.se/foretag/drivaforetag/kassaregister/undantagfrankravpakassaregister). Bokio states 238 400 kr for 2027 (not verified against Skatteverket) — [Bokio](https://www.bokio.se/blogg/nya-krav-for-kassaregister/)
- Threshold is counted for the whole company's business across all sales places (e.g. truck + market stall) — [Skatteverket SKV 609](https://www.skatteverket.se/download/18.15532c7b1442f256baef298/1529046512314/60901.pdf)
- Below the threshold: cash invoices (kontantfakturor) need serial numbers, copies kept in bookkeeping, cash payments booked by next working day — [Skatteverket undantag page (snippet)](https://skatteverket.se/foretag/drivaforetag/kassaregister/undantagfrankravpakassaregister)
- Applying for exemption (blankett SKV 1510): outdoor selling, bad weather or lack of electricity are NOT sufficient reasons — [Skatteverket undantag page](https://skatteverket.se/foretag/drivaforetag/kassaregister/undantagfrankravpakassaregister); see also [Torg- och marknadshandel](https://www.skatteverket.se/foretag/drivaforetag/kassaregister/torgochmarknadshandel.4.5c1163881590be297b51bf03.html)
- Restaurants must register all sales in the kassaregister and offer the customer a receipt (kvitto) — [Skatteverket FAQ (snippet)](https://www.skatteverket.se/foretag/etjansterochblanketter/svarpavanligafragor/kassaregister)
- Distance sales (distansavtal, parties don't meet physically) are directly exempt from the kassaregister requirement; per FAR, an online/distance sale picked up in a physical shop need not be registered, but if the deal is changed at pickup (e.g. customer swaps item) a new contract arises that must be registered — [Skatteverket: vissa verksamheter undantagna](https://www.skatteverket.se/foretag/drivaforetag/kassaregister/vissaverksamheterarundantagnafrankravetpakassaregister.4.6efe6285127ab4f1d2580005105.html); [FAR Online 2022](https://www.faronline.se/nyheter/2022/juni/forsaljning-vid-distansavtal-behover-inte-registreras-i-ett-kassaregister/)
- Skatteverket: ordering and paying via the customer's own smartphone while seated in the restaurant is NOT a distance sale (so must be registered) — [Skatteverket FAQ: restaurangbeställning online](https://skatteverket.se/foretag/etjansterochblanketter/svarpavanligafragor/kassaregister/tillampningsomrade/kanforsaljningavrestaurangochserveringstjanstforkundersittandeirestaurangendarbestallningochbetalninggorsonlineviakundenssmarttelefonutgoraforsaljninggenomdistansavtal.5.339cd9fe17d1714c077175.html)
- Precedent risk: press (Dagens PS citing Breakit) reported that OrderHero's digital order/payment screens are not certified kassasystem, implying restaurants would need two parallel systems — [Dagens PS](https://www.dagensps.se/foretag/orderhero-digital-bestallningsskarm-kan-vara-olaglig/) (newspaper report; no Skatteverket decision found)
- New rules: SKVFS 2021:17; transition ends; from 1 Jan 2027 SKVFS 2021:17 applies fully — [Ordine (vendor)](https://www.ordine.se/nya-regler-for-kassaregister-2027/); [Björn Lundén](https://bjornlunden.com/se/bjornkoll/blogg/nasta-ar-infors-nya-regler-for-kassaregister/); [SKVFS 2021:17 on lagen.nu](https://lagen.nu/skvfs/2021:17). Old-rule registers may be used through 31 Dec 2026 — [GeniusPay (vendor)](https://geniuspay.se/kassaregisterlagen-2026-krav-kontrollenhet/)
- Registers with journal memory must be able to export records in XML; sources conflict on whether old registers must be replaced (some say not automatically; vendors warn many can't be upgraded) — [Ekonomico](https://ekonomico.se/nya-krav-kassaregister-2027/); [Studac](https://studac.se/nya-regler-for-kassaregister-2027/)
- Cloud-based kontrollsystem (instead of a physical box) are allowed if certified (SKVFS 2020:9 on kontrollsystem) — [Loomis Pay](https://se.loomispay.com/se-blogg/kassaregister/); [SKVFS 2020:9 (lagen.nu)](https://lagen.nu/skvfs/2020:9)
- Changes of register/kontrollenhet must be reported within two weeks (secondary sources) — [Spiris](https://www.spiris.se/blogg/skatter/skattenyheter)
- Kontrollavgift: sources conflict — 10 000 kr (doubling to 20 000 kr on repeat within a year) per older Skatteverket material/search summaries vs 12 500 kr per newer vendor blogs — [Skatteverket FAQ snippet](https://www.skatteverket.se/foretag/etjansterochblanketter/svarpavanligafragor/kassaregister); contradicted by [Ekonomico](https://ekonomico.se/nya-krav-kassaregister-2027/), [GeniusPay](https://geniuspay.se/kassaregisterlagen-2026-krav-kontrollenhet/)
- Real-time reporting to Skatteverket is discussed but not decided (single vendor source) — [GeniusPay](https://geniuspay.se/kassaregisterlagen-2026-krav-kontrollenhet/)

### Inferences
- Recording order numbers and items (even with prices) for kitchen/queue purposes is functionally similar to a kitchen display/order system; nothing found says such a system is itself a kassaregister, but if it displays totals and the truck takes cash/card against it without ringing it up in the certified register, the truck is non-compliant. ReadyBoard should (a) state in UI/terms that sales must be registered in the truck's certified kassaregister, (b) avoid "receipt" wording and avoid printing anything resembling a kvitto, (c) consider making prices optional/hidden, or only show prices as menu info.
- Safest product line: order numbers + item lists = OK as companion tool; on-site payment (kiosk/QR at the truck) = high risk, would require ReadyBoard either to become/integrate a certified kassaregister (tillverkardeklaration + kontrollsystem) or to hand off payment to the truck's register. Pre-paid online orders placed remotely (customer not physically present) likely fall under the distansavtal exemption, but QR ordering by a customer standing at the truck is probably not distance sales by analogy to the Skatteverket restaurant FAQ.
- Integration with a cert. POS (e.g. sending orders into the register) is the cleanest route if payments are added.

### Gaps
- No official Skatteverket statement found on whether a pure order/queue system is a "kassaregister". Recommend asking kassaregister@skatteverket.se (address mentioned in search summary, unverified) or requesting a ställningstagande.
- Could not read full SKVFS 2021:17 text; exact XML/receipt changes unverified.
- Correct current kontrollavgift amount unresolved (10 000 vs 12 500 kr).
- Whether QR-ordering at a food truck queue counts as distansavtal is untested.

## 2. GDPR – phone numbers/names for "ready" SMS, public screen, DPA, hosting

### Takeaway
ReadyBoard is a personuppgiftsbiträde (processor) for the trucks' customer data and personuppgiftsansvarig (controller) for its own account/user data. It needs a standard DPA (art. 28) with every truck, a sub-processor list (hosting, SMS provider), minimal data (phone number only, delete shortly after pickup), and a privacy notice the truck can show customers. Showing first names publicly is legal-ish but avoidable risk; order numbers are better.

### Cited Findings
- When a cloud provider acts as processor, art. 28 GDPR applies to the contract — [IMY frågeformulär molntjänster](https://www.imy.se/globalassets/dokument/ovrigt/frageformular-molntjanster.pdf)
- A SaaS company is processor for customer data (customer decides purposes) and controller for its own users/leads/employees — [Legiscope](https://www.legiscope.com/blog/gdpr-saas-techbolag.html)
- DPA must bind processor to art. 28.3 obligations: subject matter, duration, purpose, type of data, instructions, art. 32 security measures; control over whole sub-processor chain (art. 28.4) — [Legiscope art. 28](https://www.legiscope.com/blog/personuppgiftsbitradesavtal-art-28.html); [EDPB opinion 22/2024 on processors/sub-processors (SV)](https://www.edpb.europa.eu/system/files/2025-05/edpb_opinion_202422_relianceonprocessors-sub-processors_sv_0.pdf)
- Transfer risk example: IMY fined Tele2 and CDON over Google Analytics transfers to the US — [Legiscope](https://www.legiscope.com/blog/personuppgiftsbitradesavtal-art-28.html)
- Missing/incorrect DPA claimed as one of the most common IMY findings (unverified secondary claim) — [Legiscope](https://www.legiscope.com/blog/gdpr-saas-techbolag.html)
- [primary law, not fetched] Legal basis for "your order is ready" SMS is most naturally art. 6(1)(b) (necessary to perform the customer's request) or 6(1)(f) legitimate interest; principles of data minimisation and storage limitation (art. 5(1)(c),(e)); information duty art. 13 — [GDPR, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

### Inferences
- Recommended defaults: phone number optional; auto-delete phone/name within e.g. 24 h after order closed (or end of day); no reuse for marketing; EU/EEA hosting and EU SMS provider (46elks is Swedish; Sinch is Swedish-headquartered; Twilio is US-based → needs SCCs/EU-US DPF check); short privacy text on the order-entry/QR page; publish a sub-processor list.
- First names on a public screen: a first name alone in a crowd is low-identifiability but is still personal data; use only with customer awareness, allow nickname/alias, default to order numbers.
- Truck staff typing the phone number in on behalf of the customer: the truck (controller) must inform the customer; ReadyBoard can supply a template notice/QR link.

### Gaps
- Could not fetch IMY's own guidance pages on retention or SMS; no IMY decision specific to queue displays found.

## 3. SMS rules in Sweden and providers/prices

### Takeaway
Pure service/transactional SMS ("order 42 is ready") is not marketing and is not covered by the marknadsföringslagen consent rule, provided it contains no advertising. Any promotional content (offers, "come back tomorrow for 10 % off") makes it marketing requiring prior consent (or the existing-customer exception with opt-out). Price is roughly 0.5–1 SEK per SMS segment.

### Cited Findings
- Marknadsföringslag (2008:486) 19 §: advertising via e-mail/SMS etc. to natural persons requires prior consent, with exceptions in 19 § second paragraph for existing customer relationships — [Riksdagen SFS 2008:486](https://www.riksdagen.se/sv/dokument-lagar/dokument/_sfs-2008-486); [Lawline](https://lawline.se/answers/har-ett-foretag-ratt-att-skicka-ut-reklam-automatiskt-nar-jag-handlat-dar); background [Prop. 2003/04:43](https://data.riksdagen.se/dokument/GR0343.html)
- 46elks: pay-as-you-go per message; 153 chars/segment in GSM charset, 67 with emoji/special characters; default 100 SMS/min — [46elks guide](https://46elks.com/guides/sending-sms); typical cost ~0.50–1.00 SEK/SMS (third-party estimate) — [46elks MCP server (Glama)](https://glama.ai/mcp/servers/@palhamel/46elks-mcp-server)
- Twilio Sweden: ~USD 0.0609 per outbound SMS (Jan 2025, third-party) — [sent.dm](https://www.sent.dm/resources/sweden-sms-pricing); official page [Twilio SE pricing](https://www.twilio.com/en-us/sms/pricing/se)
- Bird claims Sinch and Twilio both ~0.60 SEK per SMS in Sweden (competitor promo) — [Bird](https://bird.com/zh-sg/blog/bird-crm-lowers-price-in-sweden); Sinch does not publish flat rates — [Apidog](https://apidog.com/blog/sinch-sms-api-cost/)
- Nordic SMS price adjustment notice (prices trending up) — [SMS Teknik](https://www3.smsteknik.se/en/adjustment-of-the-sms-standard-price-for-the-nordic-countries)

### Inferences
- Keep notification texts plain (no "å/ä/ö" is not required — GSM-7 includes ÅÄÖ; emojis double segment cost). Budget ≈ 0.5–0.8 SEK per notification; pass costs through or cap per plan.
- Alphanumeric sender ID (truck name) is commonly supported; verify with provider.

### Gaps
- No Konsumentverket statement found explicitly excluding transactional SMS from 19 § (inference based on the provision applying to "reklam"/marketing). Official 46elks/Sinch SEK price lists not retrieved.
- PTS rules on sender IDs / numbering not researched.

## 4. Swish / payments

### Takeaway
Online Swish requires the truck to have a Swish Handel agreement with its bank (plus a business payment account) and an API connection with certificates — or, more simply, go through a PSP (Stripe, Nets, Adyen, Swedbank Pay, etc.) that handles Swish and cards. Payments taken on-site at the truck must still be registered in a certified kassaregister; remote pre-paid orders likely qualify as distansavtal.

### Cited Findings
- Swish Handel requires a payment account at the bank; connection to Swish API with certificates; company must monitor certificate expiry — [Handelsbanken villkor](https://handelsbanken.se/tron/public/info/contents/v1/document/32-112209); [Nordea Swish Handel](https://www.nordea.se/foretag/produkter/betala/swish-handel.html)
- E-commerce Swish often needs a technical provider agreement in addition to the bank agreement (Klarna, Nets, Adyen etc.) — [forms-legal](https://forms-legal.com/sv/sverige/financial/agreements/swish-foretagsavtal); [Nets](https://shop.nets.eu/web/partners/swish)
- Prices: Nordea 1.50 kr + 0.3 % per payment (max 10 kr) plus 720 kr/year; Northmill 1.75 kr/transaction + 59 kr/month; typical ~2.5 kr/tx + ~40 kr/month — [Nordea](https://www.nordea.se/foretag/produkter/betala/swish-handel.html); [Northmill onboarding](https://www.northmill.com/media/xt3bp3tl/swish_onboarding.pdf); [driva-eget](https://driva-eget.se/artiklar/sa-funkar-swish-for-foretag)
- Partner-led onboarding exists (technical providers can onboard merchants) — [Northmill manual](https://www.northmill.com/media/it1htqmz/manual-fo-r-partnerledd-onboarding-av-swishdocx.pdf); Stripe supports Swish — [Stripe guide](https://stripe.com/en-fr/resources/more/swish-an-in-depth-guide)
- Kassaregister interplay: see section 1 (distansavtal exemption; in-restaurant phone ordering not distance sale).

### Inferences
- ReadyBoard should not hold funds itself (would risk requiring a payment institution licence from Finansinspektionen under PSD2); use a PSP with each truck as merchant of record (Stripe Connect-type model). SCA under PSD2 is handled by the PSP/bank (Swish uses BankID, inherently SCA). [Not separately sourced this session — verify.]

### Gaps
- Official swish.nu requirements and PSD2/FI licensing text not retrieved (fetch blocked). Upcoming PSD3/PSR not researched.

## 5. Food information / allergens

### Takeaway
If ReadyBoard shows menus for online ordering, the truck must make mandatory food information — above all the 14 allergens (EU 1169/2011 art. 9, 14, 44, Annex II) — available before the purchase is concluded and at delivery. For non-prepacked food sold at distance, the info must still be given; a reference to a website/phone is an accepted way. ReadyBoard should provide an allergen field per menu item and/or a clear "ask staff about allergens" link; the truck is responsible for content.

### Cited Findings
- Information on non-prepacked food must be given also when offered by distance communication — [Livsmedelsverket Kontrollwiki](https://kontrollwiki.livsmedelsverket.se/artikel/print/pdf/735)
- For non-prepacked food, info should be given before the purchase is concluded and at delivery; it must be clear how the customer gets allergen info — [Malmö stad, e-handel med livsmedel](https://malmo.se/For-verksamhetsutovare/Forsaljning-av-livsmedel/Starta-och-driva-livsmedelsverksamhet/Starta-livsmedelsverksamhet/E-handel-med-livsmedel.html); [Malmö stad märkning](https://malmo.se/For-verksamhetsutovare/Forsaljning-av-livsmedel/Starta-och-driva-livsmedelsverksamhet/Markning-och-information-om-livsmedel.html)
- At distance the consumer is entitled to all mandatory info (except durability date) before the purchase is concluded — [Kontrollwiki](https://kontrollwiki.livsmedelsverket.se/artikel/print/pdf/735)
- Livsmedelsverket brochure on non-prepacked food — [Livsmedelsverket PDF](https://www.livsmedelsverket.se/globalassets/publikationsdatabas/broschyrer/livsmedel-som-inte-ar-fardigforpackade.pdf); 2026 municipal guidance — [Helsingborg 2026](https://media.helsingborg.se/uploads/networks/1/sites/2/2026/03/mf-informerar-markning-av-oforpackade-livsmedel-2026.pdf)

### Inferences
- Merely showing order numbers on a screen triggers nothing. A view-only menu (no ordering) should still not misstate allergens. Online ordering → allergen info must be on the order page or one click away before checkout.

### Gaps
- Kontrollwiki guidance is non-binding; full article text not read.

## 6. Accessibility (EAA / lag 2023:254)

### Takeaway
Lag (2023:254) has applied since 28 June 2025 and covers e-handelstjänster to consumers, supervised by PTS. A B2B SaaS admin tool sold to trucks is not a consumer service and falls outside. The public queue display is not an e-commerce service. A consumer-facing online ordering page would be an e-handelstjänst, but the obligation lies on the service provider (the truck, typically a microenterprise, which for services is exempt). Still, building to WCAG 2.1 AA is cheap insurance and helps larger chain customers who are not exempt.

### Cited Findings
- Law in force 28 June 2025; e-handelstjänster = services provided at distance via websites/mobile services at the consumer's individual request to conclude a consumer contract; PTS supervises e-handelstjänster — [Lag 2023:254, Riksdagen](https://data.riksdagen.se/dokument/sfs-2023-254.html); [SFS 2023:254 PDF](https://svenskforfattningssamling.se/sites/default/files/sfs/2023-05/SFS2023-254.pdf); [EY](https://www.ey.com/sv_se/insights/law/tillganglighetslagen-trader-i-kraft-den-28-juni-2025)
- Microenterprise = fewer than 10 employees and turnover or balance sheet ≤ EUR 2 million — [Prop. 2022/23:42](https://lagen.nu/prop/2022/23:42); [SFS 2023:254](https://data.riksdagen.se/dokument/sfs-2023-254.html)
- Microenterprises providing services exempt (vendor summary) — [Voyado help](https://help.engage.voyado.com/hc/en-gb/articles/20451970101148-Understanding-the-Accessibility-Act-Tillg%C3%A4nglighetsdirektivet-and-what-it-means-for-you-as-a-Voyado-customer); [primary law, not fetched] Directive (EU) 2019/882 art. 4(5): "Microenterprises providing services shall be exempt" — [EUR-Lex 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj)
- Disproportionate-burden exemption exists; must be reassessed within five years; PTS criteria regulations — [PTS föreskrifter oproportionerlig börda](https://pts.se/contentassets/24f75f48fd834b95ac63afb7ccdfad46/pts-foreskrifter-om-kriterier-for-bedomning-av-oproportionerligt-stor-borda.pdf); [SFS 2023:676](https://data.riksdagen.se/dokument/sfs-2023-676.text)
- PTS's first e-commerce supervision targets larger actors selling products online — [M3](https://www.m3.se/article/2942445/pts-granskar-tillgangligheten-for-e-handelstjanster.html)

### Inferences
- If ReadyBoard itself sells to consumers (e.g. a central marketplace where consumers order from many trucks under ReadyBoard's contract), ReadyBoard could become the e-handelstjänst provider; exemption then depends on ReadyBoard's own size.

### Gaps
- Could not read the Swedish provision implementing the microenterprise exemption verbatim (lagen.nu blocked).

## 7. B2B terms (consumer law) and bookkeeping for subscriptions

### Takeaway
Selling to businesses, Swedish consumer protection (konsumentköplagen, distansavtalslagen ångerrätt) does not apply; terms are governed by freedom of contract (avtalslagen, incl. §36 unfair terms). Clear SaaS terms + DPA + liability cap are enough. ReadyBoard's own subscription revenue needs bookkeeping under bokföringslagen (BFL); since 1 July 2024 originals need not be kept on paper if digitised; archive 7 years.

### Cited Findings
- BFL change (prop. 2023/24:78) in force 1 July 2024 abolished requirement to keep accounting info in original form if transferred securely (7 kap. 6 § BFL) — [Prop. 2023/24:78](https://lagen.nu/prop/2023/24:78); [SFS 2024:342](https://svenskforfattningssamling.se/sites/default/files/sfs/2024-05/SFS2024-342.pdf); [KPMG](https://kpmg.com/se/en/insights/regulations/nu-moderniseras-bokforingslagen.html)
- Archive accounting information 7 years after end of the calendar year in which the fiscal year ended — [Spiris](https://www.spiris.se/blogg/foretagsredovisning/arkivering-bokforing); [BFL text Riksdagen](https://data.riksdagen.se/dokument/sfs-1999-1078.text)
- BFNAR 2013:2 revised accordingly (chapters 7–8) — [BFN remissbrev](https://bfn.se/wp-content/uploads/remissbrev-bokforing-2024.pdf)

### Inferences
- If ReadyBoard keeps order data with prices, trucks may view it as accounting material; make clear it is NOT the truck's räkenskapsinformation (the certified register's journal is), so ReadyBoard need not keep orders 7 years — this supports short retention.
- Consider requiring that customers are businesses (org.nr) at signup to keep out of consumer law.

### Gaps
- Momslagen invoice content requirements (new ML 2023:200 since July 2023) and consumer-law details for B2B not researched due to tool budget. Distansavtalslagen applies only to consumers — [primary law, not fetched].

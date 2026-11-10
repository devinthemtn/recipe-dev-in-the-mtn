# TODO: Coffee Guides

Ideas for new guide series in the coffee section. The existing series is
**Understanding Coffee Beans** (overview, origins, varieties, processing, roast).

## How to add a guide

1. Copy `src/lib/content/COFFEE_GUIDE_TEMPLATE.svx` into `src/lib/content/coffee/guides/`
   and rename it to a lowercase-hyphenated slug (the filename becomes the URL).
2. Set `series` to the series name and `part` to its order. Part 0 is the overview.
3. Keep `draft: true` until it's ready.
4. Charts go in `src/lib/components/Coffee*Chart.svelte` (see `CoffeeRoastChart.svelte`
   for a simple example) and get imported in the guide's `<script>` block.

## 1. Brewing Basics

- [ ] **Overview (part 0):** the few variables that matter most when brewing
- [ ] **Coffee-to-water ratios:** starting ratios by method, and weighing vs. scooping
  - 17:1 or 15:1 are good places to start for pour over
  - weighing is my preferred way of measurement
- [ ] **Grind size:** coarse to fine by method (chart idea); link to the hand grinder review
- [ ] **Water and temperature:** water quality, ideal brew temperature, kettles
  - its worth some experimenting maybe for using less tempature then tradionally with the lighter roasts that are often common now a days.
  - I would suggest using filtered water for starters although some people go as far as using distilled water and then adding it minerals. (you dont want to use straight distilled)
- [ ] **Dialing in by taste:** sour means under-extracted, bitter means over-extracted, and what to adjust

## 2. Brew Methods

- [ ] **Overview (part 0):** comparing methods by body, effort and gear (chart idea)
- [ ] **Pour-over:** V60, Kalita, Chemex basics and technique
  - inexpensive
  - small effort to get good
  - great for light roasts especially
- [ ] **French press:** full-bodied, forgiving, and how to avoid sludge
  - simple and quick
  - good for darker roasts
- [ ] **AeroPress:** standard and inverted methods
  - simple
  - good quality 
  - uniqe method that isn't quite like anything else since its a bit of immersion, pour over, and pressure
- [ ] **Cold brew:** ratios, steep times, and storing concentrate
  - simple
  - cheap
  - takes time
- [ ] **standard coffee machines**
  - simple
  - wild variety of quality
- [ ] **capsule machines:** when they make sense; link to the Line1 and
      automatic pour-over machine reviews
  - quick
  - easy
  - dependable for consistency 
- [ ] **espresso**
  - whole different game 
  - effort 
  - time
  - expense

## 3. Buying & Storing Beans

- [ ] **Overview (part 0):** getting good coffee home and keeping it good
- [ ] **Reading a specialty coffee bag:** tasting notes, and how they tie back to the
      Understanding Coffee Beans series
- [ ] **Freshness and roast date:** resting beans, and when they peak and fade
- [ ] **Storing and freezing beans:** containers, light/air/heat, and freezing in portions
- [ ] **Choosing a roaster or subscription:** what to look for, and buying local vs. online

## 4. Low-Carb Coffee & Milk

- [ ] **Overview (part 0):** good coffee without sugar
- [ ] **Learning to drink coffee black:** picking beans and roasts that taste sweet on their own
- [ ] **Unsweetened milks and creamers:** dairy, cream, oat, soy, coconut and their carb
      counts. **No almond-based options.**
- [ ] **Frothing milk at home:** frothers and techniques; link to the milk foamer video in
      `src/lib/content/coffee/videos.js`
`
## Open questions

- write in my own voice

- Build format: full guides with charts.

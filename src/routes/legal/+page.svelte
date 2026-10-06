<script>
	const updated = 'October 4, 2026';
	const email = 'devinthemtn@gmail.com';
</script>

<svelte:head>
	<title>Privacy, Disclosures & Disclaimer | Mountain Kitchen</title>
	<meta
		name="description"
		content="Mountain Kitchen's privacy policy, affiliate disclosure and medical disclaimer."
	/>
</svelte:head>

<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Privacy, Disclosures &amp; Disclaimer
</h1>
<p class="mt-2 text-sm text-stone-500">Last updated {updated}</p>

<nav
	class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600 dark:text-stone-400"
>
	<a href="#medical" class="hover:text-stone-900 dark:hover:text-stone-100">Medical disclaimer</a>
	<a href="#privacy" class="hover:text-stone-900 dark:hover:text-stone-100">Privacy policy</a>
	<a href="#affiliates" class="hover:text-stone-900 dark:hover:text-stone-100"
		>Affiliate disclosure</a
	>
</nav>

<article class="prose mt-8 max-w-none prose-stone dark:prose-invert">
	<h2 id="medical">Medical disclaimer</h2>
	<p>
		I'm a home cook living with diabetes, not a doctor, dietitian or certified diabetes educator.
		Everything on this site, including recipes labeled "diabetic-friendly" or "low-carb," is shared
		for general information and is not medical advice. It isn't a substitute for advice from your
		own doctor or care team.
	</p>
	<ul>
		<li>
			Diabetes affects everyone differently. Talk to your doctor or dietitian before changing your
			diet, especially if you take insulin or other medication that lowers blood sugar.
		</li>
		<li>
			Nutrition information is an estimate, calculated from typical values for the ingredients. It
			will vary with the brands you use, exact amounts and portion sizes. Don't rely on it alone to
			count carbs or dose insulin.
		</li>
		<li>
			Check your own blood sugar to learn how a dish affects you. Labels like "diabetic-friendly"
			describe how a recipe was put together, not a promise of how your body will respond.
		</li>
		<li>Always check ingredient labels for allergens, and follow safe food-handling practices.</li>
	</ul>

	<h2 id="privacy">Privacy policy</h2>
	<p>
		This site doesn't have accounts, comments or sign-up forms, so I don't collect your name, email
		or any other personal details directly.
	</p>
	<h3>Analytics</h3>
	<p>
		I use Google Analytics to see which recipes and pages people read, so I know what to make more
		of. Google Analytics sets cookies and collects information such as the pages you visit, how long
		you stay, how you found the site, your general location (city or region), and your browser and
		device type. I only see this as combined statistics, not as information about you personally.
		Google processes this data under its own
		<a href="https://policies.google.com/privacy">privacy policy</a>.
	</p>
	<p>You can opt out of analytics by:</p>
	<ul>
		<li>blocking or clearing cookies in your browser settings,</li>
		<li>
			using a content blocker, or installing the
			<a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</a>.
		</li>
	</ul>
	<p>The site works the same either way.</p>
	<h3>Stored in your browser</h3>
	<p>
		If you switch between light and dark mode, that choice is saved in your browser's local storage
		so it's remembered on your next visit. It never leaves your device.
	</p>
	<h3>Hosting</h3>
	<p>
		Like most websites, the server that delivers these pages may keep standard logs, such as IP
		addresses and the pages requested, for security and troubleshooting.
	</p>
	<h3>Links to other sites</h3>
	<p>
		Recipes and posts link to other websites. Once you leave this site, their privacy policies
		apply, not this one.
	</p>
	<h3>Children</h3>
	<p>This site isn't aimed at children under 13, and I don't knowingly collect data from them.</p>
	<h3>Changes and contact</h3>
	<p>
		If this policy changes, for example when ads or an email newsletter are added, I'll update this
		page and the date at the top. For questions or requests about your data, email
		<a href="mailto:{email}">{email}</a>.
	</p>

	<h2 id="affiliates">Affiliate disclosure</h2>
	<p>
		Some links on this site may be affiliate links. If you buy something through one, I may earn a
		small commission at no extra cost to you. It helps cover the cost of running the site.
	</p>
	<p>
		I only recommend ingredients, tools and products I use in my own kitchen or would buy myself,
		and getting a commission doesn't change what I recommend. Pages with affiliate links say so.
	</p>
</article>

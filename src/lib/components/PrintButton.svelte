<script>
	// Opens the browser's print dialog. The print styles in layout.css (and the
	// print: classes on the layout) strip the page down to a clean recipe card.
</script>

<button
	type="button"
	onclick={() => window.print()}
	class="rounded-full border border-stone-300 px-3 py-1 text-sm font-medium text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-stone-100 print:hidden"
>
	🖨️ Print
</button>

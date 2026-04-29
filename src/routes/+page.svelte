<script lang="ts">
  import { generateContracts } from "$lib/generator/generateContracts";

  let scale = $state(1);
  let companyName = $state("Unknown Company");
  let maxContracts = $state(6);

  let contracts = $state(generateContracts());

  function regenerate() {
    contracts = generateContracts(scale, companyName, maxContracts);
  }

</script>

<main>
  <header>
    <h1>BattleTech Contract Generator</h1>

    <label>
      Hiring Hall
      <select bind:value={maxContracts}>
        <option value={0}>Questionable Hall</option>
        <option value={1}>Minor Hall</option>
        <option value={2}>Standard Hall</option>
        <option value={3}>Great Hall</option>
      </select>
    </label>

    <label>
        Scale
        <input
            type="number"
            min="0"
            max="3"
            step="1"
            bind:value={scale}
        />
    </label>

    <label>
        Company Name
        <input type="text" bind:value={companyName} />
    </label>

    <button onclick={regenerate}>
      Generate Contracts
    </button>
  </header>

  {#if contracts.length === 0}
    <section class="empty-state">
      <h2>No Contracts Available</h2>
      <p>No suitable contracts are currently available. Check again later.</p>
    </section>
  {:else}
            <section class="contract-list">
            {#each contracts as contract}
        <article class="contract-card">
            <h2>{contract.title}</h2>

            <table>
            <tbody>
                <tr>

                    <th style="background-color: #e8e8e8;">Company</th>
                    <td>{contract.company}</td>

                    <td style="background-color: #e8e8e8;">Scale</td>
                    <td>{contract.scale}</td>

                    
                </tr>

                <tr>
                <th style="background-color: #e8e8e8;">Base Pay</th>
                <td><strong>{contract.terms.basePay.label}</strong><br /></td>
                <td>Base: {500* contract.terms.basePay.value / 100} SP<br /></td>
                <td>Scaled: {(500 * scale) * contract.terms.basePay.scaledValue / 100} SP</td>
                </tr>

                <tr>
                <th style="background-color: #e8e8e8;">Command Rights</th>
                <td>
                    <strong>{contract.terms.commandRights.label}</strong><br />
                </td>

                <td style="background-color: #e8e8e8;">Salvage Rights</td>
                <td>
                    <strong>{contract.terms.salvageRights.label}</strong><br />
                    {contract.terms.salvageRights.description}
                </td>
                </tr>

                <tr>
                <th style="background-color: #e8e8e8;">Support Rights</th>
                <td>
                    <strong>{contract.terms.supportRights.label}</strong><br />
                </td>

                <td style="background-color: #e8e8e8;">Transportation Rights</td>
                <td><strong>{contract.terms.transportationRights.label}</strong><br />
                Final Cost: {(300 *scale) - ((300 * scale) * contract.terms.transportationRights.scaledValue/100)} SP</td>
                </tr>
            </tbody>
            </table>
        </article>
        {/each}
    </section>
  {/if}
</main>

<style>
  .contract-card {
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    padding: 1rem;
    background: #f8f8f8;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.75rem;
    vertical-align: top;
    text-align: left;
  }

  th {
    width: 220px;
    background: #ffffff;
  }

  td {
    background: #ffffff;
  }
</style>
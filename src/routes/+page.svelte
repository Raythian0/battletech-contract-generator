<script lang="ts">
  import { generateContracts } from "$lib/generator/generateContracts";

  let scale = $state(1);
  let companyName = $state("Unknown Company");
  let maxContracts = $state(6);
  let hiringHall = $state("Standard Hall");
  let employerType = $state("Major Power");

  let contracts = $state(generateContracts());

  let activeContractId = $state<string | null>(null);

  function regenerate() {
    contracts = generateContracts(scale, companyName, employerType, maxContracts, hiringHall);
    activeContractId = contracts.length > 0 ? contracts[0].id : null;
  }

</script>

<main>
  <header>
    <h1>BattleTech Contract Generator</h1>

    <label>
      Hiring Hall
      <select bind:value={hiringHall}>
        <option value={"questionable_Hall"}>Questionable Hall</option>
        <option value={"minor_Hall"}>Minor Hall</option>
        <option value={"standard_Hall"}>Standard Hall</option>
        <option value={"great_Hall"}>Great Hall</option>
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
    <p>No suitable contracts are currently available.</p>
  </section>
{:else}
  <section class="tabs">
    <div class="tab-buttons">
      {#each contracts as contract, index}
        <button
          class:active={activeContractId === contract.id}
          onclick={() => (activeContractId = contract.id)}
        >
          Contract {index + 1}
        </button>
      {/each}
    </div>

    {#each contracts as contract}
      {#if activeContractId === contract.id}
        <article class="contract-card">
          <h2>{contract.title} - {contract.employer}</h2>

          <!-- Put your existing table here -->
          <table>
            <tbody>
                <tr>

                    <th style="background-color: #e8e8e8;">Company</th>
                    <td>{contract.company}</td>

                    <td style="background-color: #e8e8e8;">Scale</td>
                    <td>{contract.scale}</td>

                    
                </tr>

                <tr>
                <th style="background-color: #e8e8e8;">Contract Pay</th>
                <td><strong>{contract.terms.basePay.label}</strong><br /></td>
                <td>Base: {(500 * scale)* contract.terms.basePay.value / 100} SP<br /></td>
                <td>Mission: {(500 * scale) * contract.terms.basePay.scaledValue / 100} SP</td>
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
      {/if}
    {/each}
  </section>
{/if}

</main>

<style>
  .tabs {
    margin-top: 1rem;
  }

  .tab-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .tab-buttons button {
    padding: 0.5rem 0.9rem;
    border: 1px solid #ccc;
    background: #eee;
    cursor: pointer;
  }

  .tab-buttons button.active {
    background: #222;
    color: white;
    font-weight: bold;
  }

  .contract-card {
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    padding: 1rem;
    background: #f8f8f8;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
  }

  th {
    width: 220px;
    background: #e8e8e8;
  }

  td {
    background: white;
  }
</style>